import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Redirect to login on 401 + auto-unwrap response.data
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        Cookies.remove('admin_token')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(err)
  }
)

export const getImageUrl = (path?: string | null) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${BASE_URL}${path}`
}

// ── Portfolio (public) ──────────────────────────────────
export const portfolioApi = {
  getAll: () => api.get('/portfolio'),
}

// ── Auth ────────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    api.post('/auth/login', new URLSearchParams({ username, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
  me: () => api.get('/auth/me'),
}

// ── Profile ─────────────────────────────────────────────
export const profileApi = {
  get: () => api.get('/profile'),
  update: (data: FormData) =>
    api.put('/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

// ── Hero ────────────────────────────────────────────────
export const heroApi = {
  get: () => api.get('/hero'),
  update: (data: object) => api.put('/hero', data),
}

// ── Projects ─────────────────────────────────────────────
export const projectsApi = {
  list: () => api.get('/projects'),
  create: (data: FormData) =>
    api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, data: FormData) =>
    api.put(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: number) => api.delete(`/projects/${id}`),
  reorder: (ids: number[]) => api.post('/projects/reorder', { ids }),
}

// ── Skills ───────────────────────────────────────────────
export const skillsApi = {
  list: () => api.get('/skills'),
  create: (data: object) => api.post('/skills', data),
  update: (id: number, data: object) => api.put(`/skills/${id}`, data),
  delete: (id: number) => api.delete(`/skills/${id}`),
}

// ── Tech Stack ───────────────────────────────────────────
export const techApi = {
  list: () => api.get('/tech'),
  create: (data: object) => api.post('/tech', data),
  update: (id: number, data: object) => api.put(`/tech/${id}`, data),
  delete: (id: number) => api.delete(`/tech/${id}`),
}

// ── Services ─────────────────────────────────────────────
export const servicesApi = {
  list: () => api.get('/services'),
  create: (data: object) => api.post('/services', data),
  update: (id: number, data: object) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
}

// ── Timeline ─────────────────────────────────────────────
export const timelineApi = {
  list: () => api.get('/timeline'),
  create: (data: object) => api.post('/timeline', data),
  update: (id: number, data: object) => api.put(`/timeline/${id}`, data),
  delete: (id: number) => api.delete(`/timeline/${id}`),
}

// ── Terminal Logs ────────────────────────────────────────
export const terminalApi = {
  list: () => api.get('/terminal'),
  create: (data: object) => api.post('/terminal', data),
  update: (id: number, data: object) => api.put(`/terminal/${id}`, data),
  delete: (id: number) => api.delete(`/terminal/${id}`),
}

// ── Ticker ───────────────────────────────────────────────
export const tickerApi = {
  list: () => api.get('/ticker'),
  create: (data: object) => api.post('/ticker', data),
  update: (id: number, data: object) => api.put(`/ticker/${id}`, data),
  delete: (id: number) => api.delete(`/ticker/${id}`),
}

// ── Social Links ─────────────────────────────────────────
export const socialApi = {
  list: () => api.get('/social'),
  create: (data: object) => api.post('/social', data),
  update: (id: number, data: object) => api.put(`/social/${id}`, data),
  delete: (id: number) => api.delete(`/social/${id}`),
}

// ── SEO ──────────────────────────────────────────────────
export const seoApi = {
  get: () => api.get('/seo'),
  update: (data: object) => api.put('/seo', data),
}

// ── Settings ─────────────────────────────────────────────
export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data: object) => api.put('/settings', data),
}

// ── Book ─────────────────────────────────────────────────
export const bookApi = {
  get: () => api.get('/book'),
  update: (data: FormData) =>
    api.put('/book', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

// ── Contact ──────────────────────────────────────────────
export const contactApi = {
  submit: (data: { name: string; email: string; subject?: string; message: string }) =>
    api.post('/contact', data),
  listMessages: () => api.get('/contact/messages'),
  markRead: (id: number) => api.post(`/contact/messages/${id}/read`),
}

// ── Media ────────────────────────────────────────────────
export const mediaApi = {
  uploadCv: (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    return api.post('/media/cv', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  uploadAvatar: (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    return api.post('/media/avatar', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}
