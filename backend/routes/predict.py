from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
import cv2, os, base64, uuid
from dotenv import load_dotenv
from database.supabase import supabase

load_dotenv()
router = APIRouter()

CLASS_NAMES = ["No_DR", "Mild", "Moderate", "Severe", "Proliferate_DR"]
PROGRESSION = {"No_DR":0.02,"Mild":0.10,"Moderate":0.28,"Severe":0.55,"Proliferate_DR":0.85}

print("Loading model...")
model = tf.keras.models.load_model(os.getenv("MODEL_PATH"), compile=False)
print("✅ Model loaded")

def preprocess(img_bytes):
    arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    mask = gray > 7
    if mask.sum() > 0:
        rows = np.any(mask, axis=1)
        cols = np.any(mask, axis=0)
        rmin,rmax = np.where(rows)[0][[0,-1]]
        cmin,cmax = np.where(cols)[0][[0,-1]]
        img = img[rmin:rmax+1, cmin:cmax+1]
    img = cv2.resize(img, (224, 224))
    lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
    l,a,b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    l = clahe.apply(l)
    img = cv2.cvtColor(cv2.merge((l,a,b)), cv2.COLOR_LAB2RGB)
    blur = cv2.GaussianBlur(img,(0,0),7)
    img = cv2.addWeighted(img,4,blur,-4,128)
    return np.clip(img,0,255).astype(np.uint8)

def make_gradcam(inp):
    last_conv = None
    for layer in reversed(model.layers):
        if isinstance(layer, tf.keras.layers.Conv2D):
            last_conv = layer.name; break
        if hasattr(layer,"layers"):
            for sub in reversed(layer.layers):
                if isinstance(sub, tf.keras.layers.Conv2D):
                    last_conv = sub.name; break
            if last_conv: break
    grad_model = tf.keras.Model(model.inputs,
        [model.get_layer(last_conv).output, model.output])
    with tf.GradientTape() as tape:
        conv_out, preds = grad_model(inp)
        idx = tf.argmax(preds[0])
        cls = preds[:, idx]
    grads = tape.gradient(cls, conv_out)
    pooled = tf.reduce_mean(grads, axis=(0,1,2))
    heatmap = conv_out[0] @ pooled[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap,0)/(tf.reduce_max(heatmap)+1e-8)
    heatmap = heatmap.numpy()
    heatmap = cv2.resize(heatmap,(224,224))
    heatmap = np.uint8(255*heatmap)
    color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    color = cv2.cvtColor(color, cv2.COLOR_BGR2RGB)
    proc = inp[0].astype(np.uint8)
    overlay = cv2.addWeighted(proc,0.6,color,0.4,0)
    _, buf = cv2.imencode(".jpg", cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR))
    return base64.b64encode(buf).decode()

def risk_band(probs_dict):
    score = sum(PROGRESSION[c]*p for c,p in probs_dict.items())
    if score < 0.10: return "Low","Routine annual screening.", score
    if score < 0.30: return "Moderate","Ophthalmology referral within 6 months.", score
    if score < 0.60: return "High","Urgent referral within 4 weeks.", score
    return "Critical","Immediate ophthalmology consultation.", score

@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    patient_id: str = Form(...),
    age: int = Form(...),
    eye: str = Form("OD"),
    hba1c: float = Form(None),
    bp: str = Form(None),
    diabetes_duration: int = Form(None),
):
    img_bytes = await file.read()
    proc = preprocess(img_bytes)
    inp = np.expand_dims(proc.astype(np.float32), 0)

    probs = model.predict(inp, verbose=0)[0]
    idx = int(np.argmax(probs))
    probs_dict = {CLASS_NAMES[i]: float(p) for i,p in enumerate(probs)}

    gradcam_b64 = make_gradcam(inp)
    risk, recommendation, score = risk_band(probs_dict)

    # Save patient
    try:
        supabase.table("patients").upsert({
            "patient_id": patient_id,
            "age": age,
            "hba1c": hba1c,
            "bp": bp,
            "diabetes_duration": diabetes_duration,
        }).execute()
    except: pass

    # Save scan
    scan_id = str(uuid.uuid4())
    try:
        supabase.table("scans").insert({
            "id": scan_id,
            "patient_id": patient_id,
            "eye": eye,
            "prediction": CLASS_NAMES[idx],
            "confidence": float(probs[idx]),
            "risk_level": risk,
            "risk_score": round(score, 4),
            "recommendation": recommendation,
            "class_probabilities": probs_dict,
            "gradcam_image": gradcam_b64,
        }).execute()
    except Exception as e:
        print("DB error:", e)

    return {
        "scan_id": scan_id,
        "prediction": CLASS_NAMES[idx],
        "confidence": round(float(probs[idx])*100, 1),
        "risk_level": risk,
        "risk_score": round(score, 4),
        "recommendation": recommendation,
        "class_probabilities": probs_dict,
        "gradcam_image": gradcam_b64,
    }
