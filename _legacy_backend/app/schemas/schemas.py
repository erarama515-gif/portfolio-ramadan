from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime


# ── Auth ──────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    model_config = ConfigDict(from_attributes=True)


# ── Profile ─────────────────────────────────────────────
class ProfileBase(BaseModel):
    name: str
    role: str
    bio: str
    location: str
    email: str
    experience: str
    focus: str


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: int
    avatar_url: Optional[str] = None
    cv_url: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


# ── Hero ────────────────────────────────────────────────
class HeroSectionBase(BaseModel):
    headline: str
    subheadline: str
    typing_words: List[str]
    cta_primary: str
    cta_secondary: str
    show_cv_btn: bool = True
    show_status_badge: bool = True
    status_text: str
    bg_neural: bool = True
    bg_grid: bool = True


class HeroSectionCreate(HeroSectionBase):
    pass


class HeroSectionUpdate(HeroSectionBase):
    pass


class HeroSection(HeroSectionBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── Projects ───────────────────────────────────────────
class MetricItem(BaseModel):
    label: str
    value: str


class ProjectBase(BaseModel):
    icon: str
    name: str
    description: str
    long_description: Optional[str] = None
    tags: List[str] = []
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    image_url: Optional[str] = None
    status: str = "draft"
    sort_order: int = 0
    metrics: List[MetricItem] = []


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class ProjectReorder(BaseModel):
    ids: List[int]


# ── Skills / Tech / Service / Timeline / Terminal / Ticker / Social ──
class SkillBase(BaseModel):
    name: str
    percentage: int
    category: str
    sort_order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillUpdate(SkillBase):
    pass


class Skill(SkillBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class TechStackBase(BaseModel):
    name: str
    color: str
    sort_order: int = 0


class TechStackCreate(TechStackBase):
    pass


class TechStackUpdate(TechStackBase):
    pass


class TechStack(TechStackBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class ServiceBase(BaseModel):
    icon: str
    title: str
    description: str
    sort_order: int = 0


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    pass


class Service(ServiceBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class TimelineItemBase(BaseModel):
    year: str
    title: str
    subtitle: str
    sort_order: int = 0


class TimelineItemCreate(TimelineItemBase):
    pass


class TimelineItemUpdate(TimelineItemBase):
    pass


class TimelineItem(TimelineItemBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class TerminalLogBase(BaseModel):
    tag: str
    tag_type: str
    message: str
    sort_order: int = 0
    active: bool = True


class TerminalLogCreate(TerminalLogBase):
    pass


class TerminalLogUpdate(TerminalLogBase):
    pass


class TerminalLog(TerminalLogBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class TickerMessageBase(BaseModel):
    tag: str
    tag_type: str
    message: str
    active: bool = True


class TickerMessageCreate(TickerMessageBase):
    pass


class TickerMessageUpdate(TickerMessageBase):
    pass


class TickerMessage(TickerMessageBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class SocialLinkBase(BaseModel):
    platform: str
    icon: str
    url: str


class SocialLinkCreate(SocialLinkBase):
    pass


class SocialLinkUpdate(SocialLinkBase):
    pass


class SocialLink(SocialLinkBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── SEO / Settings ──────────────────────────────────────
class SeoSettingsBase(BaseModel):
    title: str
    description: str
    keywords: str
    og_image: Optional[str] = None
    canonical_url: Optional[str] = None
    twitter_handle: Optional[str] = None


class SeoSettingsCreate(SeoSettingsBase):
    pass


class SeoSettingsUpdate(SeoSettingsBase):
    pass


class SeoSettings(SeoSettingsBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class SiteSettingsBase(BaseModel):
    show_hire_btn: bool = True
    show_terminal: bool = True
    show_ticker: bool = True
    show_architecture: bool = True
    show_contact_form: bool = True
    show_cv_btn: bool = True
    available_for_work: bool = True
    show_book: bool = True


class SiteSettingsCreate(SiteSettingsBase):
    pass


class SiteSettingsUpdate(SiteSettingsBase):
    pass


class SiteSettings(SiteSettingsBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── Book ───────────────────────────────────────────────
class BookChapter(BaseModel):
    title: str
    summary: str


class BookQuote(BaseModel):
    text: str
    context: Optional[str] = None


class BookBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    tagline: str
    description: str
    cover_url: Optional[str] = None
    status: str = "coming_soon"
    release_date: Optional[str] = None
    preorder_url: Optional[str] = None
    chapters: List[BookChapter] = []
    quotes: List[BookQuote] = []


class BookCreate(BookBase):
    pass


class BookUpdate(BookBase):
    pass


class Book(BookBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── Contact ────────────────────────────────────────────
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str


class ContactMessage(BaseModel):
    id: int
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    read: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


# ── Combined Portfolio Data ────────────────────────────
class PortfolioData(BaseModel):
    profile: Optional[Profile] = None
    hero: Optional[HeroSection] = None
    projects: List[Project] = []
    skills: List[Skill] = []
    tech_stack: List[TechStack] = []
    services: List[Service] = []
    timeline: List[TimelineItem] = []
    terminal_logs: List[TerminalLog] = []
    ticker_messages: List[TickerMessage] = []
    social_links: List[SocialLink] = []
    seo: Optional[SeoSettings] = None
    settings: Optional[SiteSettings] = None
    book: Optional[Book] = None
    model_config = ConfigDict(from_attributes=True)
