from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=schemas.SiteSettings)
def get_settings(db: Session = Depends(get_db)):
    return crud.get_site_settings(db)


@router.put("", response_model=schemas.SiteSettings)
def update_settings(payload: schemas.SiteSettingsUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    s = crud.get_site_settings(db)
    if not s:
        return crud.create_site_settings(db, schemas.SiteSettingsCreate(**payload.model_dump()))
    return crud.update_site_settings(db, s.id, payload)
