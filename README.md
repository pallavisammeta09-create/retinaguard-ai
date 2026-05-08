# 🩺 RetinaGuard AI

<div align="center">

![RetinaGuard AI](https://img.shields.io/badge/RetinaGuard-AI-blue?style=for-the-badge&logo=eye)
![Python](https://img.shields.io/badge/Python-3.12-green?style=for-the-badge&logo=python)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.18-orange?style=for-the-badge&logo=tensorflow)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-teal?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

**AI-Powered Diabetic Retinopathy Detection & Vision Risk Prediction**

*Detect. Grade. Explain. Protect.*

</div>

---

## 🎯 What is RetinaGuard AI?

RetinaGuard AI is a **full-stack medical AI application** that detects and grades **Diabetic Retinopathy (DR)** from retinal fundus photographs. DR is one of the leading causes of preventable blindness in adults — early detection through automated screening can drastically reduce vision loss.

Built with **EfficientNetB3** deep learning backbone, the system classifies retinal scans into 5 clinical severity stages and generates **Grad-CAM explainability heatmaps** so clinicians can verify where the model is looking.

> ⚠️ **Clinical Disclaimer:** This system is a research prototype intended to **assist** ophthalmologists, not replace clinical judgment.

---

## ✨ Features

- 🧠 **EfficientNetB3 CNN** — Transfer learning from ImageNet, fine-tuned on DR fundus images
- 🔬 **5-Class Severity Grading** — No DR · Mild · Moderate · Severe · Proliferative DR
- 🗺️ **Grad-CAM Explainability** — Visual heatmaps showing which retinal regions drove the prediction
- ⚖️ **Class Imbalance Handling** — Focal loss + class weights for imbalanced medical datasets
- 📊 **Medical-Grade Metrics** — Sensitivity, Specificity, Cohen's κ, Quadratic Weighted Kappa
- 🔮 **Vision Risk Prediction** — 5-year vision loss risk band based on DR severity
- 🏥 **Patient Management** — Store patient records and scan history in Supabase
- 📱 **Responsive Dashboard** — Real-time analytics for clinicians
- 🔒 **Secure API** — FastAPI backend with CORS protection

---

## 📊 Model Performance

| Metric | Score |
|--------|-------|
| 🎯 Sensitivity (Referable DR) | **97.49%** |
| 🎯 Specificity (Referable DR) | **96.31%** |
| 📈 No DR AUC | **0.994** |
| 📈 Mild AUC | **0.920** |
| 📈 Moderate AUC | **0.928** |
| 📊 Quadratic Weighted Kappa | **0.8725** |
| 📊 Cohen's Kappa | **0.6872** |

---

## 🏗️ Architecture

```
RetinaGuard AI
│
├── Frontend (React + Vite + TypeScript + TailwindCSS)
│   ├── / ──────────── Landing page
│   ├── /login ──────── Doctor login
│   ├── /signup ─────── Registration
│   ├── /upload ─────── Upload retinal scan + patient details
│   ├── /result ─────── AI diagnosis report + Grad-CAM
│   └── /dashboard ──── Analytics & patient management
│
└── Backend (FastAPI + TensorFlow + Supabase)
    ├── POST /api/predict ──── Upload image → AI prediction
    ├── GET  /api/patients ─── List all patients
    ├── GET  /api/results/{id} Get scan result by ID
    └── GET  /api/dashboard/stats  Analytics summary
```

### Model Pipeline

```
Fundus Image Input
      │
      ▼
Preprocessing (Circular Crop → CLAHE → Ben Graham)
      │
      ▼
EfficientNetB3 Backbone (ImageNet pretrained)
      │
      ▼
GlobalAveragePooling → Dense(256) → Dropout
      │
      ▼
Softmax Output (5 classes)
      │
      ├── Prediction + Confidence
      ├── Grad-CAM Heatmap
      └── Vision Risk Score
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- NVIDIA GPU (optional, CPU works too)
- Supabase account

### 1. Clone the repo

```bash
git clone https://github.com/pallavisammeta09-create/retinaguard-ai.git
cd retinaguard-ai
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install tensorflow==2.18.0 fastapi uvicorn python-multipart \
            supabase python-dotenv opencv-python albumentations \
            matplotlib seaborn scikit-learn

# Create .env file
cat > .env << EOF
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
MODEL_PATH=./models/best_model.keras
FRONTEND_URL=http://localhost:8080
EOF

# Start backend
CUDA_VISIBLE_DEVICES=-1 uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start frontend
npm run dev -- --port 8080
```

### 4. Open in browser

```
http://localhost:8080
```

---

## 🗄️ Database Schema (Supabase)

```sql
-- Patients table
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT UNIQUE NOT NULL,
  name TEXT,
  age INTEGER,
  hba1c FLOAT,
  bp TEXT,
  diabetes_duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scans table
CREATE TABLE scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT REFERENCES patients(patient_id),
  eye TEXT,
  prediction TEXT,
  confidence FLOAT,
  risk_level TEXT,
  risk_score FLOAT,
  recommendation TEXT,
  class_probabilities JSONB,
  gradcam_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📁 Project Structure

```
retinaguard-ai/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Upload.tsx       # Scan upload + patient form
│   │   │   ├── Result.tsx       # Diagnosis report + Grad-CAM
│   │   │   ├── Dashboard.tsx    # Analytics dashboard
│   │   │   ├── Login.tsx        # Authentication
│   │   │   └── Signup.tsx       # Registration
│   │   └── components/          # Reusable UI components
│   └── package.json
│
├── backend/                     # FastAPI backend
│   ├── main.py                  # FastAPI app + CORS
│   ├── routes/
│   │   ├── predict.py           # /predict endpoint + Grad-CAM
│   │   ├── patients.py          # Patient CRUD
│   │   └── dashboard.py         # Analytics
│   ├── database/
│   │   └── supabase.py          # Supabase client
│   ├── models/                  # Trained model (not in git)
│   └── artifacts/               # Label encoder, config
│
└── README.md
```

---

## 🔌 API Reference

### POST /api/predict
Upload a retinal image for DR analysis.

**Request:** `multipart/form-data`
```
file            Image file (JPEG/PNG)
patient_id      Patient identifier
age             Patient age
eye             OD (Right) or OS (Left)
hba1c           HbA1c percentage (optional)
bp              Blood pressure (optional)
diabetes_duration  Years with diabetes (optional)
```

**Response:**
```json
{
  "scan_id": "uuid",
  "prediction": "Moderate",
  "confidence": 87.3,
  "risk_level": "High",
  "risk_score": 0.2734,
  "recommendation": "Urgent referral within 4 weeks.",
  "class_probabilities": {
    "No_DR": 0.02,
    "Mild": 0.07,
    "Moderate": 0.87,
    "Severe": 0.03,
    "Proliferate_DR": 0.01
  },
  "gradcam_image": "base64_encoded_image"
}
```

### GET /api/patients
Returns list of all patients.

### GET /api/results/{scan_id}
Returns full scan result by ID.

### GET /api/dashboard/stats
Returns analytics summary.

---

## 🧠 Training

The model was trained on the **Kaggle Diabetic Retinopathy 224x224 (2019)** dataset with:

- **Phase 1:** Frozen EfficientNetB3 backbone, train classification head (10 epochs, LR=1e-3)
- **Phase 2:** Unfreeze top layers, fine-tune (20 epochs, LR=1e-5)
- **Augmentation:** Horizontal flip, rotation, brightness/contrast, Gaussian blur, coarse dropout
- **Loss:** Categorical Cross-Entropy with class weights
- **Optimizer:** Adam

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | TensorFlow 2.18, EfficientNetB3, Keras |
| Backend | FastAPI, Uvicorn, Python 3.12 |
| Frontend | React, Vite, TypeScript, TailwindCSS, shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Explainability | Grad-CAM |
| Preprocessing | OpenCV, Albumentations |
| Charts | Recharts |

---

## 👥 Contributors

- **Anuj** — ML Model, Backend API, Full Stack Integration

---

## 📜 License

This project is for research and educational purposes only.

---

<div align="center">
Built with ❤️ for safer, earlier, fairer DR screening.
</div>
