from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.TechStack])
def list_tech(db: Session = Depends(get_db)):
    return crud.get_tech_stack(db)


@router.post("", response_model=schemas.TechStack)
def create_tech(t: schemas.TechStackCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_tech(db, t)


@router.put("/{tech_id}", response_model=schemas.TechStack)
def update_tech(tech_id: int, t: schemas.TechStackUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_tech(db, tech_id, t)
    if not updated:
        raise HTTPException(status_code=404, detail="Tech not found")
    return updated


@router.delete("/{tech_id}")
def delete_tech(tech_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_tech(db, tech_id):
        return {"message": "Tech deleted"}
    raise HTTPException(status_code=404, detail="Tech not found")
