from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.v1.api import api_router
from app.db.base import Base, engine
from app.models import models  # noqa: F401 — ensures all tables register on Base

# Create tables (auto-create if missing — Alembic still handles migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Portfolio OS API — إنجاز",
    description="Backend API for Islam Ramadan's portfolio · Founder of Enjaz",
    version="1.0.0",
)

# CORS — allow local dev + production frontend
origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [o.strip() for o in origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static uploads
os.makedirs("uploads", exist_ok=True)
os.makedirs("uploads/avatars", exist_ok=True)
os.makedirs("uploads/cvs", exist_ok=True)
os.makedirs("uploads/projects", exist_ok=True)
os.makedirs("uploads/books", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Portfolio OS API · Islam Ramadan · Enjaz", "version": "1.0.0", "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
