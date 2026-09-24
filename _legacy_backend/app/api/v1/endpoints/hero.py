from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=schemas.HeroSection)
def get_hero(db: Session = Depends(get_db)):
    hero = crud.get_hero(db)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not initialized")
    return hero


@router.put("", response_model=schemas.HeroSection)
def update_hero(payload: schemas.HeroSectionUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    hero = crud.get_hero(db)
    if not hero:
        return crud.create_hero(db, schemas.HeroSectionCreate(**payload.model_dump()))
    return crud.update_hero(db, hero.id, payload)
