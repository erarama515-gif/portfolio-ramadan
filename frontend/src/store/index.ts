import { create } from 'zustand'
import type { PortfolioData } from '@/types'

interface PortfolioStore {
  data: PortfolioData | null
  loading: boolean
  setData: (d: PortfolioData) => void
  setLoading: (l: boolean) => void
  updateProject: (id: number, updates: object) => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  data: null,
  loading: true,
  setData: (data) => set({ data, loading: false }),
  setLoading: (loading) => set({ loading }),
  updateProject: (id, updates) =>
    set((state) => ({
      data: state.data
        ? {
            ...state.data,
            projects: state.data.projects.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
          }
        : null,
    })),
}))

interface AdminStore {
  token: string | null
  user: { id: number; username: string; email: string } | null
  setToken: (t: string | null) => void
  setUser: (u: AdminStore['user']) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}))
