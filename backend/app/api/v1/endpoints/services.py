from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()


@router.get("", response_model=List[schemas.Service])
def list_services(db: Session = Depends(get_db)):
    return crud.get_services(db)


@router.post("", response_model=schemas.Service)
def create_service(s: schemas.ServiceCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_service(db, s)


@router.put("/{service_id}", response_model=schemas.Service)
def update_service(service_id: int, s: schemas.ServiceUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated = crud.update_service(db, service_id, s)
    if not updated:
        raise HTTPException(status_code=404, detail="Service not found")
    return updated


@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    if crud.delete_service(db, service_id):
        return {"message": "Service deleted"}
    raise HTTPException(status_code=404, detail="Service not found")
