from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.SocialLink])
def list_links(db: Session = Depends(get_db)):
    return crud.get_social_links(db)


@router.post("", response_model=schemas.SocialLink)
def create_link(link: schemas.SocialLinkCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_social_link(db, link)


@router.put("/{link_id}", response_model=schemas.SocialLink)
def update_link(link_id: int, link: schemas.SocialLinkUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_social_link(db, link_id, link)
    if not updated:
        raise HTTPException(status_code=404, detail="Link not found")
    return updated


@router.delete("/{link_id}")
def delete_link(link_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_social_link(db, link_id):
        return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Link not found")
