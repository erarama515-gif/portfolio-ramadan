from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.crud import crud
from app.schemas import schemas

router = APIRouter()


@router.get("/portfolio", response_model=schemas.PortfolioData)
def get_portfolio(db: Session = Depends(get_db)):
    return {
        "profile": crud.get_profile(db),
        "hero": crud.get_hero(db),
        "projects": crud.get_projects(db),
        "skills": crud.get_skills(db),
        "tech_stack": crud.get_tech_stack(db),
        "services": crud.get_services(db),
        "timeline": crud.get_timeline(db),
        "terminal_logs": crud.get_terminal_logs(db),
        "ticker_messages": crud.get_ticker_messages(db),
        "social_links": crud.get_social_links(db),
        "seo": crud.get_seo(db),
        "settings": crud.get_site_settings(db),
        "book": crud.get_book(db),
    }
