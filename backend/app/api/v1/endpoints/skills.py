from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.Skill])
def list_skills(db: Session = Depends(get_db)):
    return crud.get_skills(db)


@router.post("", response_model=schemas.Skill)
def create_skill(skill: schemas.SkillCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_skill(db, skill)


@router.put("/{skill_id}", response_model=schemas.Skill)
def update_skill(skill_id: int, skill: schemas.SkillUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_skill(db, skill_id, skill)
    if not updated:
        raise HTTPException(status_code=404, detail="Skill not found")
    return updated


@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_skill(db, skill_id):
        return {"message": "Skill deleted"}
    raise HTTPException(status_code=404, detail="Skill not found")
