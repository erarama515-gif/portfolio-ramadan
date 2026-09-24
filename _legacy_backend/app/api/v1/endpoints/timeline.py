from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.TimelineItem])
def list_timeline(db: Session = Depends(get_db)):
    return crud.get_timeline(db)


@router.post("", response_model=schemas.TimelineItem)
def create_item(t: schemas.TimelineItemCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_timeline_item(db, t)


@router.put("/{item_id}", response_model=schemas.TimelineItem)
def update_item(item_id: int, t: schemas.TimelineItemUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_timeline_item(db, item_id, t)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_timeline_item(db, item_id):
        return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Item not found")
