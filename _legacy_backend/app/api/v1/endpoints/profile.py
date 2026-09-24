from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os, shutil, uuid
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()
UPLOAD_DIR = "uploads/avatars"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("", response_model=schemas.Profile)
def get_profile(db: Session = Depends(get_db)):
    profile = crud.get_profile(db)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not initialized")
    return profile


@router.put("", response_model=schemas.Profile)
def update_profile(
    name: str = Form(...),
    role: str = Form(...),
    bio: str = Form(...),
    location: str = Form(...),
    email: str = Form(...),
    experience: str = Form(...),
    focus: str = Form(...),
    avatar: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    profile = crud.get_profile(db)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not initialized")

    update = schemas.ProfileUpdate(
        name=name, role=role, bio=bio, location=location,
        email=email, experience=experience, focus=focus,
    )
    profile = crud.update_profile(db, profile.id, update)

    if avatar:
        ext = os.path.splitext(avatar.filename)[1] or ".png"
        fname = f"{uuid.uuid4().hex}{ext}"
        path = f"{UPLOAD_DIR}/{fname}"
        with open(path, "wb") as f:
            shutil.copyfileobj(avatar.file, f)
        profile.avatar_url = f"/uploads/avatars/{fname}"
        db.commit(); db.refresh(profile)

    return profile
