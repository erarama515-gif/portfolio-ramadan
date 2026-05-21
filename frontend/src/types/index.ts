export interface Profile {
  id: number
  name: string
  role: string
  bio: string
  location: string
  email: string
  experience: string
  focus: string
  avatar_url?: string
  cv_url?: string
}

export interface HeroSection {
  id: number
  headline: string
  subheadline: string
  typing_words: string[]
  cta_primary: string
  cta_secondary: string
  show_cv_btn: boolean
  show_status_badge: boolean
  status_text: string
  bg_neural: boolean
  bg_grid: boolean
}

export interface Project {
  id: number
  icon: string
  name: string
  description: string
  long_description?: string
  tags: string[]
  demo_url?: string
  github_url?: string
  image_url?: string
  status: 'live' | 'draft'
  sort_order: number
  metrics?: { label: string; value: string }[]
}

export interface Skill {
  id: number
  name: string
  percentage: number
  category: string
  sort_order: number
}

export interface TechStack {
  id: number
  name: string
  color: string
  sort_order: number
}

export interface Service {
  id: number
  icon: string
  title: string
  description: string
  sort_order: number
}

export interface TimelineItem {
  id: number
  year: string
  title: string
  subtitle: string
  sort_order: number
}

export interface TerminalLog {
  id: number
  tag: string
  tag_type: 'SYS' | 'AI' | 'API' | 'WS' | 'DB'
  message: string
  sort_order: number
  active: boolean
}

export interface TickerMessage {
  id: number
  tag: string
  tag_type: 'SYS' | 'AI' | 'API' | 'WS' | 'DB'
  message: string
  active: boolean
}

export interface SocialLink {
  id: number
  platform: string
  icon: string
  url: string
}

export interface SeoSettings {
  id: number
  title: string
  description: string
  keywords: string
  og_image?: string
  canonical_url?: string
  twitter_handle?: string
}

export interface SiteSettings {
  show_hire_btn: boolean
  show_terminal: boolean
  show_ticker: boolean
  show_architecture: boolean
  show_contact_form: boolean
  show_cv_btn: boolean
  available_for_work: boolean
  show_book: boolean
}

export interface BookChapter {
  title: string
  summary: string
}

export interface BookQuote {
  text: string
  context?: string
}

export interface Book {
  id: number
  title: string
  subtitle?: string
  tagline: string
  description: string
  cover_url?: string
  status: 'coming_soon' | 'available'
  release_date?: string
  preorder_url?: string
  chapters: BookChapter[]
  quotes: BookQuote[]
}

export interface PortfolioData {
  profile: Profile
  hero: HeroSection
  projects: Project[]
  skills: Skill[]
  tech_stack: TechStack[]
  services: Service[]
  timeline: TimelineItem[]
  terminal_logs: TerminalLog[]
  ticker_messages: TickerMessage[]
  social_links: SocialLink[]
  seo: SeoSettings
  settings: SiteSettings
  book: Book
}

export interface ContactForm {
  name: string
  email: string
  subject?: string
  message: string
}
