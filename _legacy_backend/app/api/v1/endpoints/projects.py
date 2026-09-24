from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List
import json, os, shutil, uuid

from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()
UPLOAD_DIR = "uploads/projects"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def _save_image(image: UploadFile) -> str:
    ext = os.path.splitext(image.filename)[1] or ".png"
    fname = f"{uuid.uuid4().hex}{ext}"
    path = f"{UPLOAD_DIR}/{fname}"
    with open(path, "wb") as f:
        shutil.copyfileobj(image.file, f)
    return f"/uploads/projects/{fname}"


@router.get("", response_model=List[schemas.Project])
def list_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)


@router.post("", response_model=schemas.Project)
def create_project(
    icon: str = Form(...),
    name: str = Form(...),
    description: str = Form(...),
    long_description: Optional[str] = Form(None),
    tags: str = Form("[]"),
    demo_url: Optional[str] = Form(None),
    github_url: Optional[str] = Form(None),
    status: str = Form("draft"),
    sort_order: int = Form(0),
    metrics: str = Form("[]"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    payload = {
        "icon": icon, "name": name, "description": description,
        "long_description": long_description,
        "tags": json.loads(tags), "demo_url": demo_url, "github_url": github_url,
        "status": status, "sort_order": sort_order,
        "metrics": json.loads(metrics),
    }
    if image:
        payload["image_url"] = _save_image(image)
    return crud.create_project(db, schemas.ProjectCreate(**payload))


@router.put("/{project_id}", response_model=schemas.Project)
def update_project(
    project_id: int,
    icon: str = Form(...),
    name: str = Form(...),
    description: str = Form(...),
    long_description: Optional[str] = Form(None),
    tags: str = Form("[]"),
    demo_url: Optional[str] = Form(None),
    github_url: Optional[str] = Form(None),
    status: str = Form("draft"),
    sort_order: int = Form(0),
    metrics: str = Form("[]"),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    existing = crud.get_project(db, project_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")

    payload = {
        "icon": icon, "name": name, "description": description,
        "long_description": long_description,
        "tags": json.loads(tags), "demo_url": demo_url, "github_url": github_url,
        "status": status, "sort_order": sort_order,
        "metrics": json.loads(metrics),
        "image_url": existing.image_url,
    }
    if image:
        payload["image_url"] = _save_image(image)
    return crud.update_project(db, project_id, schemas.ProjectUpdate(**payload))


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_project(db, project_id):
        return {"message": "Project deleted"}
    raise HTTPException(status_code=404, detail="Project not found")


@router.post("/reorder")
def reorder_projects(payload: schemas.ProjectReorder, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    crud.reorder_projects(db, payload.ids)
    return {"message": "Reordered", "count": len(payload.ids)}
