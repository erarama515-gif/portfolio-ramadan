from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os, shutil, uuid, json

from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas
from app.deps.deps import get_current_user

router = APIRouter()
UPLOAD_DIR = "uploads/books"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("", response_model=schemas.Book)
def get_book(db: Session = Depends(get_db)):
    book = crud.get_book(db)
    if not book:
        raise HTTPException(status_code=404, detail="Book not initialized")
    return book


@router.put("", response_model=schemas.Book)
def update_book(
    title: str = Form(...),
    subtitle: Optional[str] = Form(None),
    tagline: str = Form(...),
    description: str = Form(...),
    status: str = Form("coming_soon"),
    release_date: Optional[str] = Form(None),
    preorder_url: Optional[str] = Form(None),
    chapters: str = Form("[]"),
    quotes: str = Form("[]"),
    cover: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    book = crud.get_book(db)
    payload = {
        "title": title, "subtitle": subtitle, "tagline": tagline,
        "description": description, "status": status,
        "release_date": release_date, "preorder_url": preorder_url,
        "chapters": json.loads(chapters), "quotes": json.loads(quotes),
        "cover_url": book.cover_url if book else None,
    }
    if cover:
        ext = os.path.splitext(cover.filename)[1] or ".png"
        fname = f"{uuid.uuid4().hex}{ext}"
        path = f"{UPLOAD_DIR}/{fname}"
        with open(path, "wb") as f:
            shutil.copyfileobj(cover.file, f)
        payload["cover_url"] = f"/uploads/books/{fname}"

    if not book:
        return crud.create_book(db, schemas.BookCreate(**payload))
    return crud.update_book(db, book.id, schemas.BookUpdate(**payload))
