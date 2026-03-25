'use client'
// src/app/auth/callback/page.tsx
export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'
import toast from 'react-hot-toast'

export default function AuthCallback() {
  const router = useRouter()
  const { setTokens } = useAuthStore()

  useEffect(() => {
    const handle = async () => {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        toast.error('Google sign-in failed. Please try again.')
        router.push('/login')
        return
      }

      try {
        // Tell Django about this Supabase user → get JWT tokens back
        const { data } = await api.post('/api/auth/supabase/', {
          supabase_uid: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
          avatar_url: session.user.user_metadata?.avatar_url || '',
        })
        setTokens(data.access, data.refresh, data.user)
        toast.success(data.created ? 'Account created! Welcome 🌾' : 'Welcome back!')
        router.push('/')
      } catch {
        toast.error('Authentication failed. Please try again.')
        router.push('/login')
      }
    }

    handle()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-600 font-medium">Completing sign in...</p>
        <p className="text-stone-400 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  )
}
