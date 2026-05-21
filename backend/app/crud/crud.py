from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas
from app.core.security import get_password_hash


# ── User ────────────────────────────────────────────────
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, username: str, email: str, password: str):
    hashed = get_password_hash(password)
    user = models.User(username=username, email=email, hashed_password=hashed)
    db.add(user); db.commit(); db.refresh(user)
    return user


# ── Profile ─────────────────────────────────────────────
def get_profile(db: Session):
    return db.query(models.Profile).first()


def create_profile(db: Session, profile: schemas.ProfileCreate):
    db_obj = models.Profile(**profile.model_dump())
    db.add(db_obj); db.commit(); db.refresh(db_obj)
    return db_obj


def update_profile(db: Session, profile_id: int, profile: schemas.ProfileUpdate):
    db_obj = db.query(models.Profile).filter(models.Profile.id == profile_id).first()
    if db_obj:
        for k, v in profile.model_dump().items():
            setattr(db_obj, k, v)
        db.commit(); db.refresh(db_obj)
    return db_obj


# ── Hero ────────────────────────────────────────────────
def get_hero(db: Session):
    return db.query(models.HeroSection).first()


def create_hero(db: Session, hero: schemas.HeroSectionCreate):
    db_obj = models.HeroSection(**hero.model_dump())
    db.add(db_obj); db.commit(); db.refresh(db_obj)
    return db_obj


def update_hero(db: Session, hero_id: int, hero: schemas.HeroSectionUpdate):
    db_obj = db.query(models.HeroSection).filter(models.HeroSection.id == hero_id).first()
    if db_obj:
        for k, v in hero.model_dump().items():
            setattr(db_obj, k, v)
        db.commit(); db.refresh(db_obj)
    return db_obj


# ── Generic CRUD helpers ────────────────────────────────
def _list(db, model, skip=0, limit=200, order_by=None):
    q = db.query(model)
    if order_by is not None:
        q = q.order_by(order_by)
    return q.offset(skip).limit(limit).all()


def _create(db, model, payload):
    db_obj = model(**payload.model_dump())
    db.add(db_obj); db.commit(); db.refresh(db_obj)
    return db_obj


def _update(db, model, obj_id, payload):
    db_obj = db.query(model).filter(model.id == obj_id).first()
    if db_obj:
        for k, v in payload.model_dump().items():
            setattr(db_obj, k, v)
        db.commit(); db.refresh(db_obj)
    return db_obj


def _delete(db, model, obj_id):
    db_obj = db.query(model).filter(model.id == obj_id).first()
    if db_obj:
        db.delete(db_obj); db.commit()
        return True
    return False


# ── Projects ─────────────────────────────────────────────
def get_projects(db, skip=0, limit=200):
    return _list(db, models.Project, skip, limit, models.Project.sort_order)


def get_project(db, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()


def create_project(db, project: schemas.ProjectCreate):
    return _create(db, models.Project, project)


def update_project(db, project_id, project: schemas.ProjectUpdate):
    return _update(db, models.Project, project_id, project)


def delete_project(db, project_id):
    return _delete(db, models.Project, project_id)


def reorder_projects(db, ids):
    for index, pid in enumerate(ids):
        p = db.query(models.Project).filter(models.Project.id == pid).first()
        if p:
            p.sort_order = index
    db.commit()
    return True


# ── Skills ───────────────────────────────────────────────
def get_skills(db, skip=0, limit=200):
    return _list(db, models.Skill, skip, limit, models.Skill.sort_order)


def create_skill(db, skill):
    return _create(db, models.Skill, skill)


def update_skill(db, sid, skill):
    return _update(db, models.Skill, sid, skill)


def delete_skill(db, sid):
    return _delete(db, models.Skill, sid)


# ── Tech Stack ───────────────────────────────────────────
def get_tech_stack(db, skip=0, limit=200):
    return _list(db, models.TechStack, skip, limit, models.TechStack.sort_order)


def create_tech(db, tech):
    return _create(db, models.TechStack, tech)


def update_tech(db, tid, tech):
    return _update(db, models.TechStack, tid, tech)


def delete_tech(db, tid):
    return _delete(db, models.TechStack, tid)


# ── Services ─────────────────────────────────────────────
def get_services(db, skip=0, limit=200):
    return _list(db, models.Service, skip, limit, models.Service.sort_order)


def create_service(db, svc):
    return _create(db, models.Service, svc)


def update_service(db, sid, svc):
    return _update(db, models.Service, sid, svc)


def delete_service(db, sid):
    return _delete(db, models.Service, sid)


# ── Timeline ─────────────────────────────────────────────
def get_timeline(db, skip=0, limit=200):
    return _list(db, models.TimelineItem, skip, limit, models.TimelineItem.sort_order)


def create_timeline_item(db, item):
    return _create(db, models.TimelineItem, item)


def update_timeline_item(db, iid, item):
    return _update(db, models.TimelineItem, iid, item)


def delete_timeline_item(db, iid):
    return _delete(db, models.TimelineItem, iid)


# ── Terminal Logs ────────────────────────────────────────
def get_terminal_logs(db, skip=0, limit=200):
    return _list(db, models.TerminalLog, skip, limit, models.TerminalLog.sort_order)


def create_terminal_log(db, log):
    return _create(db, models.TerminalLog, log)


def update_terminal_log(db, lid, log):
    return _update(db, models.TerminalLog, lid, log)


def delete_terminal_log(db, lid):
    return _delete(db, models.TerminalLog, lid)


# ── Ticker ───────────────────────────────────────────────
def get_ticker_messages(db, skip=0, limit=200):
    return _list(db, models.TickerMessage, skip, limit)


def create_ticker_message(db, msg):
    return _create(db, models.TickerMessage, msg)


def update_ticker_message(db, mid, msg):
    return _update(db, models.TickerMessage, mid, msg)


def delete_ticker_message(db, mid):
    return _delete(db, models.TickerMessage, mid)


# ── Social Links ─────────────────────────────────────────
def get_social_links(db, skip=0, limit=200):
    return _list(db, models.SocialLink, skip, limit)


def create_social_link(db, link):
    return _create(db, models.SocialLink, link)


def update_social_link(db, lid, link):
    return _update(db, models.SocialLink, lid, link)


def delete_social_link(db, lid):
    return _delete(db, models.SocialLink, lid)


# ── SEO ──────────────────────────────────────────────────
def get_seo(db):
    return db.query(models.SeoSettings).first()


def create_seo(db, seo):
    return _create(db, models.SeoSettings, seo)


def update_seo(db, seo_id, seo):
    return _update(db, models.SeoSettings, seo_id, seo)


# ── Site Settings ──────────────────────────────────────
def get_site_settings(db):
    return db.query(models.SiteSettings).first()


def create_site_settings(db, settings):
    return _create(db, models.SiteSettings, settings)


def update_site_settings(db, settings_id, settings):
    return _update(db, models.SiteSettings, settings_id, settings)


# ── Book ───────────────────────────────────────────────
def get_book(db):
    return db.query(models.Book).first()


def create_book(db, book):
    return _create(db, models.Book, book)


def update_book(db, book_id, book):
    return _update(db, models.Book, book_id, book)


# ── Contact ────────────────────────────────────────────
def create_contact_message(db, msg: schemas.ContactCreate):
    db_obj = models.ContactMessage(**msg.model_dump())
    db.add(db_obj); db.commit(); db.refresh(db_obj)
    return db_obj


def list_contact_messages(db, skip=0, limit=200):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).offset(skip).limit(limit).all()


def mark_message_read(db, msg_id):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if msg:
        msg.read = True
        db.commit()
    return msg
