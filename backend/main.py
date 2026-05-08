from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routes.predict import router as predict_router
from routes.patients import router as patients_router
from routes.dashboard import router as dashboard_router

app = FastAPI(title="RetinaGuard AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api")
app.include_router(patients_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "RetinaGuard AI Backend running ✅"}

@app.get("/health")
def health():
    return {"status": "ok"}
