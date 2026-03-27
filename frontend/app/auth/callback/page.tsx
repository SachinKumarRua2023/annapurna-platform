'use client'
// src/app/auth/callback/page.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function AuthCallback() {
  const router = useRouter()
  const { setTokens } = useAuthStore()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus('loading')
        setMessage('Completing authentication...')

        // Dynamically import supabase client
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()

        // Get the hash params from URL (Supabase OAuth returns tokens in URL hash)
        const hash = window.location.hash
        const query = window.location.search
        
        // Try to exchange the code for a session (PKCE flow)
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          throw error
        }

        // If no session yet, try to get user which triggers token refresh
        if (!data.session) {
          const { data: userData, error: userError } = await supabase.auth.getUser()
          
          if (userError || !userData.user) {
            console.error('User error:', userError)
            throw new Error('Could not retrieve user')
          }
          
          const user = userData.user
          
          // Update auth store
          setTokens('supabase-token', 'supabase-refresh', {
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
            phone: user.user_metadata?.phone || '',
            role: 'customer',
            avatar: user.user_metadata?.avatar_url || null,
            is_verified: user.email_confirmed_at ? true : false,
          })

          setStatus('success')
          setMessage(`Welcome!`)
          toast.success('Successfully signed in with Google!')
          
          setTimeout(() => {
            router.push('/')
          }, 1500)
          return
        }

        // If we have a session
        const user = data.session.user
        
        setTokens(data.session.access_token, data.session.refresh_token || 'supabase-refresh', {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          phone: user.user_metadata?.phone || '',
          role: 'customer',
          avatar: user.user_metadata?.avatar_url || null,
          is_verified: user.email_confirmed_at ? true : false,
        })

        setStatus('success')
        setMessage(`Welcome!`)
        toast.success('Successfully signed in with Google!')
        
        setTimeout(() => {
          router.push('/')
        }, 1500)
        
      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage('Authentication failed. Redirecting...')
        
        // Don't redirect immediately on error - show the error first
        setTimeout(() => {
          router.push('/login?error=auth_failed')
        }, 3000)
      }
    }

    handleCallback()
  }, [router, setTokens])

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-600 font-medium">{message}</p>
            <p className="text-stone-400 text-sm mt-1">Please wait a moment</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-stone-600 font-medium">{message}</p>
            <p className="text-stone-400 text-sm mt-1">Redirecting to homepage...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-stone-600 font-medium">{message}</p>
          </>
        )}
      </div>
    </div>
  )
}
