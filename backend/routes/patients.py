from fastapi import APIRouter
from database.supabase import supabase

router = APIRouter()

@router.get("/patients")
def get_patients():
    res = supabase.table("patients").select("*").order("created_at", desc=True).execute()
    return res.data

@router.get("/patients/{patient_id}/scans")
def get_patient_scans(patient_id: str):
    res = supabase.table("scans").select("*").eq("patient_id", patient_id).order("created_at", desc=True).execute()
    return res.data

@router.get("/results/{scan_id}")
def get_result(scan_id: str):
    res = supabase.table("scans").select("*").eq("id", scan_id).single().execute()
    return res.data
