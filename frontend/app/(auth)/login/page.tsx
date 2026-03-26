'use client'
// Enhanced Login Page with Role Selection
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { Eye, EyeOff, User, Truck, Store } from 'lucide-react'
import toast from 'react-hot-toast'

type UserRole = 'customer' | 'supplier' | 'shipper'

export default function LoginPage() {
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
    } catch (err: any) {
      toast.error(err.response?.data?.non_field_errors?.[0] || 'Login failed. Check credentials.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast.success('Welcome!')
      router.push('/')
    } catch (err: any) {
      toast.error('Google login failed')
    }
  }

  const roleOptions = [
    { id: 'customer', label: 'Customer', icon: User, desc: 'Buy products' },
    { id: 'supplier', label: 'Supplier', icon: Store, desc: 'Sell products' },
    { id: 'shipper', label: 'Shipper', icon: Truck, desc: 'Deliver orders' },
  ] as const

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-900 to-green-700 items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-amber-400" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-amber-300" />
        </div>
        <div className="relative text-center text-white">
          <div className="text-8xl mb-6">🌾</div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Annapurna
          </h2>
          <p className="text-green-200 text-lg max-w-xs">
            Your trusted partner for global trade
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">150+</div>
              <div className="text-sm text-green-200">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">50K+</div>
              <div className="text-sm text-green-200">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">10K+</div>
              <div className="text-sm text-green-200">Suppliers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 lg:hidden">
              <span className="text-3xl font-bold text-amber-700" style={{ fontFamily: 'Playfair Display' }}>Annapurna</span>
            </Link>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Welcome back</h1>
            <p className="text-stone-500">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-3">Select your role</label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((role) => {
                const Icon = role.icon
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      selectedRole === role.id 
                        ? 'border-amber-600 bg-amber-50' 
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${selectedRole === role.id ? 'text-amber-600' : 'text-stone-500'}`} />
                    <div className="text-xs font-medium text-stone-700">{role.label}</div>
                    <div className="text-[10px] text-stone-500">{role.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-medium py-3 rounded-xl transition-all mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-stone-400 text-sm">or</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="you@example.com" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-stone-700">Password</label>
                <Link href="/forgot-password" className="text-sm text-amber-700 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors pr-11"
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
            </button>
          </form>

          <p className="text-center text-stone-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-amber-700 font-semibold hover:underline">Create one</Link>
          </p>

          <p className="text-center text-stone-400 text-xs mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
