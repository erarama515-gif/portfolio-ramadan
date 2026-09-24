from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.post("", response_model=schemas.ContactMessage)
def submit_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    return crud.create_contact_message(db, payload)


@router.get("/messages", response_model=List[schemas.ContactMessage])
def list_messages(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.list_contact_messages(db)


@router.post("/messages/{msg_id}/read", response_model=schemas.ContactMessage)
def mark_read(msg_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    msg = crud.mark_message_read(db, msg_id)
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return msg
