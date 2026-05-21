from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from app.db.base import Base
from datetime import datetime, timezone


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    bio = Column(Text)
    location = Column(String)
    email = Column(String)
    experience = Column(String)
    focus = Column(String)
    avatar_url = Column(String, nullable=True)
    cv_url = Column(String, nullable=True)


class HeroSection(Base):
    __tablename__ = "hero_sections"

    id = Column(Integer, primary_key=True, index=True)
    headline = Column(String)
    subheadline = Column(Text)
    typing_words = Column(JSON, default=list)
    cta_primary = Column(String)
    cta_secondary = Column(String)
    show_cv_btn = Column(Boolean, default=True)
    show_status_badge = Column(Boolean, default=True)
    status_text = Column(String)
    bg_neural = Column(Boolean, default=True)
    bg_grid = Column(Boolean, default=True)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String)
    name = Column(String)
    description = Column(Text)
    long_description = Column(Text, nullable=True)
    tags = Column(JSON, default=list)
    demo_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    status = Column(String, default="draft")
    sort_order = Column(Integer, default=0)
    metrics = Column(JSON, default=list)


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    percentage = Column(Integer)
    category = Column(String)
    sort_order = Column(Integer, default=0)


class TechStack(Base):
    __tablename__ = "tech_stack"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    color = Column(String)
    sort_order = Column(Integer, default=0)


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String)
    title = Column(String)
    description = Column(Text)
    sort_order = Column(Integer, default=0)


class TimelineItem(Base):
    __tablename__ = "timeline_items"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String)
    title = Column(String)
    subtitle = Column(Text)
    sort_order = Column(Integer, default=0)


class TerminalLog(Base):
    __tablename__ = "terminal_logs"

    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String)
    tag_type = Column(String)
    message = Column(Text)
    sort_order = Column(Integer, default=0)
    active = Column(Boolean, default=True)


class TickerMessage(Base):
    __tablename__ = "ticker_messages"

    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String)
    tag_type = Column(String)
    message = Column(Text)
    active = Column(Boolean, default=True)


class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String)
    icon = Column(String)
    url = Column(String)


class SeoSettings(Base):
    __tablename__ = "seo_settings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    keywords = Column(String)
    og_image = Column(String, nullable=True)
    canonical_url = Column(String, nullable=True)
    twitter_handle = Column(String, nullable=True)


class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    show_hire_btn = Column(Boolean, default=True)
    show_terminal = Column(Boolean, default=True)
    show_ticker = Column(Boolean, default=True)
    show_architecture = Column(Boolean, default=True)
    show_contact_form = Column(Boolean, default=True)
    show_cv_btn = Column(Boolean, default=True)
    available_for_work = Column(Boolean, default=True)
    show_book = Column(Boolean, default=True)


# ── Book (The Age of Hyper-Connection) ─────────────
class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)                # "عصر الاتصال المفرط"
    subtitle = Column(String, nullable=True)
    tagline = Column(Text)                # one-line hook
    description = Column(Text)            # full description
    cover_url = Column(String, nullable=True)
    status = Column(String, default="coming_soon")  # coming_soon | available
    release_date = Column(String, nullable=True)
    preorder_url = Column(String, nullable=True)
    chapters = Column(JSON, default=list)  # [{title, summary}]
    quotes = Column(JSON, default=list)    # [{text, context}]


# ── Contact Messages (received from contact form) ──────
class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    subject = Column(String, nullable=True)
    message = Column(Text)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
