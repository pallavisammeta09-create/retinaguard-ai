from fastapi import APIRouter
from database.supabase import supabase

router = APIRouter()

@router.get("/dashboard/stats")
def get_stats():
    scans = supabase.table("scans").select("*").execute().data
    patients = supabase.table("patients").select("*").execute().data
    total = len(scans)
    if total == 0:
        return {"total_scans":0,"total_patients":0,"avg_confidence":0,"severity_mix":{}}
    avg_conf = round(sum(s["confidence"] for s in scans)/total*100, 1)
    severity_mix = {}
    for s in scans:
        p = s["prediction"]
        severity_mix[p] = severity_mix.get(p,0)+1
    return {
        "total_scans": total,
        "total_patients": len(patients),
        "avg_confidence": avg_conf,
        "severity_mix": severity_mix,
    }
