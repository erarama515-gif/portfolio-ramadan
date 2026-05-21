from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.TerminalLog])
def list_logs(db: Session = Depends(get_db)):
    return crud.get_terminal_logs(db)


@router.post("", response_model=schemas.TerminalLog)
def create_log(log: schemas.TerminalLogCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_terminal_log(db, log)


@router.put("/{log_id}", response_model=schemas.TerminalLog)
def update_log(log_id: int, log: schemas.TerminalLogUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_terminal_log(db, log_id, log)
    if not updated:
        raise HTTPException(status_code=404, detail="Log not found")
    return updated


@router.delete("/{log_id}")
def delete_log(log_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_terminal_log(db, log_id):
        return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Log not found")
