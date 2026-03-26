'use client'
// Enhanced Login Page with Role Selection - Fixed Suspense boundary for Next.js 14
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { Eye, EyeOff, User, Truck, Store } from 'lucide-react'
import toast from 'react-hot-toast'

type UserRole = 'customer' | 'supplier' | 'shipper'

// Inner component that uses useSearchParams
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect')
  const { login, loginWithGoogle, isLoading } = useAuthStore()
  const addItem = useCartStore(state => state.addItem)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      
      // Get the user role from auth store after login
      const { user } = useAuthStore.getState()
      const userRole = user?.role
      
      toast.success(`Welcome back! Logged in as ${userRole}`)
      
      // Check for pending cart item
      const pendingItem = localStorage.getItem('pendingCartItem')
      if (pendingItem) {
        try {
          const product = JSON.parse(pendingItem)
          addItem(product.id, 1, product)
          localStorage.removeItem('pendingCartItem')
          toast.success(`${product.name} added to cart!`)
          router.push('/cart')
          return
        } catch (e) {
          localStorage.removeItem('pendingCartItem')
        }
      }
      
      // Redirect based on redirectUrl or user role
      if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        switch(userRole) {
          case 'supplier':
            router.push('/supplier/dashboard')
            break
          case 'delivery':
            router.push('/shipper/dashboard')
            break
          default:
            router.push('/')
        }
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast.success('Logged in with Google!')
      router.push('/')
    } catch (error) {
      toast.error('Google login failed.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'customer', label: 'Customer', icon: User },
            { id: 'supplier', label: 'Supplier', icon: Store },
            { id: 'shipper', label: 'Shipper', icon: Truck },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id as UserRole)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                selectedRole === role.id
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <role.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{role.label}</span>
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-amber-600 hover:text-amber-700 font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Google Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-amber-600 hover:text-amber-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

// Main export with Suspense wrapper
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
