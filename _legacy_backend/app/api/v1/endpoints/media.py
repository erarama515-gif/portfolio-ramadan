from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import os, shutil, uuid

from app.db.base import get_db
from app.crud import crud
from app.deps.deps import get_current_user

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(f"{UPLOAD_DIR}/avatars", exist_ok=True)
os.makedirs(f"{UPLOAD_DIR}/cvs", exist_ok=True)


def _save(file: UploadFile, subdir: str) -> str:
    ext = os.path.splitext(file.filename)[1] or ""
    fname = f"{uuid.uuid4().hex}{ext}"
    path = f"{UPLOAD_DIR}/{subdir}/{fname}"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return f"/uploads/{subdir}/{fname}"


@router.post("/avatar")
def upload_avatar(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    url = _save(file, "avatars")
    profile = crud.get_profile(db)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not initialized")
    profile.avatar_url = url
    db.commit()
    return {"url": url}


@router.post("/cv")
def upload_cv(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    url = _save(file, "cvs")
    profile = crud.get_profile(db)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not initialized")
    profile.cv_url = url
    db.commit()
    return {"url": url}
