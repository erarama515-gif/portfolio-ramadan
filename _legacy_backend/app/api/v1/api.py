from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, portfolio, profile, hero, projects, skills, tech,
    services, timeline, terminal, ticker, social, seo, settings,
    book, contact, media,
)

api_router = APIRouter()

api_router.include_router(portfolio.router, tags=["portfolio"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(hero.router, prefix="/hero", tags=["hero"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(tech.router, prefix="/tech", tags=["tech"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(timeline.router, prefix="/timeline", tags=["timeline"])
api_router.include_router(terminal.router, prefix="/terminal", tags=["terminal"])
api_router.include_router(ticker.router, prefix="/ticker", tags=["ticker"])
api_router.include_router(social.router, prefix="/social", tags=["social"])
api_router.include_router(seo.router, prefix="/seo", tags=["seo"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(book.router, prefix="/book", tags=["book"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(media.router, prefix="/media", tags=["media"])
