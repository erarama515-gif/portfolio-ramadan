from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.TickerMessage])
def list_ticker(db: Session = Depends(get_db)):
    return crud.get_ticker_messages(db)


@router.post("", response_model=schemas.TickerMessage)
def create_msg(msg: schemas.TickerMessageCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_ticker_message(db, msg)


@router.put("/{msg_id}", response_model=schemas.TickerMessage)
def update_msg(msg_id: int, msg: schemas.TickerMessageUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_ticker_message(db, msg_id, msg)
    if not updated:
        raise HTTPException(status_code=404, detail="Message not found")
    return updated


@router.delete("/{msg_id}")
def delete_msg(msg_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_ticker_message(db, msg_id):
        return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Message not found")
