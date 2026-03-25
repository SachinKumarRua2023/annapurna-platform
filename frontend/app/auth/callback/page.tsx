'use client'
// src/app/auth/callback/page.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { googleAuth } from '@/lib/google-auth'
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
        setMessage('Authenticating with Google...')

        const user = await googleAuth.handleAuthCallback()
        
        if (user) {
          setStatus('success')
          setMessage(`Welcome, ${user.name}!`)
          
          // Update auth store
          setTokens('mock-access-token', 'mock-refresh-token', {
            id: user.id,
            email: user.email,
            full_name: user.name,
            phone: '',
            role: 'customer',
            avatar: user.picture,
            is_verified: user.verified,
          })

          toast.success('Successfully signed in with Google!')
          
          // Redirect to dashboard after delay
          setTimeout(() => {
            router.push('/')
          }, 2000)
        } else {
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage('An error occurred during authentication.')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }

    handleCallback()
  }, [router, setTokens])

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
