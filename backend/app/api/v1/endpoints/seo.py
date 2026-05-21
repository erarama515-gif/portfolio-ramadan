from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=schemas.SeoSettings)
def get_seo(db: Session = Depends(get_db)):
    return crud.get_seo(db)


@router.put("", response_model=schemas.SeoSettings)
def update_seo(payload: schemas.SeoSettingsUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    seo = crud.get_seo(db)
    if not seo:
        return crud.create_seo(db, schemas.SeoSettingsCreate(**payload.model_dump()))
    return crud.update_seo(db, seo.id, payload)
