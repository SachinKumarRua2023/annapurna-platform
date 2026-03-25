// src/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/api'

interface User {
  id: string
  email: string
  full_name: string
  phone: string
  role: 'admin' | 'customer' | 'supplier' | 'delivery' | 'staff'
  avatar: string | null
  is_verified: boolean
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean

  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  setTokens: (access: string, refresh: string, user: User) => void
  fetchProfile: () => Promise<void>
}

interface RegisterData {
  email: string
  full_name: string
  phone?: string
  password: string
  password2: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      setTokens: (access, refresh, user) => {
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        set({ accessToken: access, refreshToken: refresh, user, isAuthenticated: true })
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data } = await api.post('/api/auth/login/', { email, password })
          get().setTokens(data.access, data.refresh, data.user)
        } finally {
          set({ isLoading: false })
        }
      },

      loginWithGoogle: async () => {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        })
      },

      register: async (data) => {
        set({ isLoading: true })
        try {
          const { data: res } = await api.post('/api/auth/register/', data)
          get().setTokens(res.access, res.refresh, res.user)
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        try {
          const refresh = get().refreshToken
          if (refresh) await api.post('/api/auth/logout/', { refresh })
        } catch {}
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false })
      },

      fetchProfile: async () => {
        try {
          const { data } = await api.get('/api/auth/profile/')
          set({ user: data })
        } catch {}
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
