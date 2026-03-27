// src/lib/google-auth.ts
import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  verified: boolean
}

export class GoogleAuthService {
  private supabase: ReturnType<typeof createClient>

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Google auth error:', error)
        throw error
      }

      // OAuth flow will redirect to callback page
    } catch (error) {
      console.error('Google auth exception:', error)
      throw error
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.supabase.auth.signOut()
      // Clear local storage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  async syncWithBackend(googleUser: GoogleUser): Promise<void> {
    try {
      // Use environment-based API URL or fallback to relative path
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
      const response = await fetch(`${apiUrl}/auth/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: googleUser.id,
          email: googleUser.email,
          full_name: googleUser.name,
          picture: googleUser.picture,
          is_verified: googleUser.verified,
          provider: 'google',
        }),
      })

      if (!response.ok) {
        // If backend sync fails, just store locally - don't throw error
        console.warn('Backend sync failed, using local auth only')
        return
      }

      const data = await response.json()
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user', JSON.stringify(data.user))
      
    } catch (error) {
      console.error('Backend sync error:', error)
      // Don't throw - allow local auth to work even if backend sync fails
    }
  }

  async handleAuthCallback(): Promise<GoogleUser | null> {
    try {
      const { data, error } = await this.supabase.auth.getSession()
      
      if (error) {
        console.error('Auth callback error:', error)
        return null
      }

      if (data?.session?.user) {
        const googleUser: GoogleUser = {
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: data.session.user.user_metadata?.full_name || data.session.user.email?.split('@')[0] || '',
          picture: data.session.user.user_metadata?.avatar_url || '',
          verified: data.session.user.email_confirmed_at ? true : false,
        }

        await this.syncWithBackend(googleUser)
        return googleUser
      }

      return null
    } catch (error) {
      console.error('Auth callback error:', error)
      return null
    }
  }

  getCurrentUser(): GoogleUser | null {
    try {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }
}

export const googleAuth = new GoogleAuthService()
