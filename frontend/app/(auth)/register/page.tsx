'use client'
// Enhanced Registration Page with Role Selection
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff, User, Truck, Store } from 'lucide-react'
import toast from 'react-hot-toast'

type UserRole = 'customer' | 'supplier' | 'shipper'

export default function RegisterPage() {
  const router = useRouter()
  const { register, loginWithGoogle, isLoading } = useAuthStore()
  const [form, setForm] = useState({ 
    full_name: '', 
    email: '', 
    phone: '', 
    password: '', 
    password2: '',
    role: 'customer' as UserRole,
    company_name: '',
    business_address: ''
  })
  const [showPw, setShowPw] = useState(false)

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.password2) { toast.error('Passwords do not match'); return }
    try {
      await register(form)
      toast.success(`Account created as ${form.role}! Welcome to Annapurna 🌾`)
      
      // Redirect based on role
      switch(form.role) {
        case 'supplier':
          router.push('/supplier/dashboard')
          break
        case 'shipper':
          router.push('/shipper/dashboard')
          break
        default:
          router.push('/')
      }
    } catch (err: any) {
      const errs = err.response?.data
      if (errs) {
        const first = Object.values(errs)[0] as string[]
        toast.error(Array.isArray(first) ? first[0] : 'Registration failed')
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle()
      toast.success('Welcome to Annapurna!')
      router.push('/')
    } catch (err: any) {
      toast.error('Google registration failed')
    }
  }

  const roleOptions = [
    { id: 'customer', label: 'Customer', icon: User, desc: 'Buy products worldwide' },
    { id: 'supplier', label: 'Supplier', icon: Store, desc: 'Sell & manage products' },
    { id: 'shipper', label: 'Shipper', icon: Truck, desc: 'Deliver & track orders' },
  ] as const

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-amber-700 to-orange-600 items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-white" />
        </div>
        <div className="relative text-center text-white">
          <div className="text-8xl mb-6">🌿</div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Join Annapurna
          </h2>
          <p className="text-amber-100 text-lg max-w-xs">
            Global trade platform connecting buyers, suppliers & shippers
          </p>
          <div className="flex gap-6 mt-8 justify-center">
            {[['150+', 'Countries'], ['50K+', 'Products'], ['10K+', 'Suppliers']].map(([h, s]) => (
              <div key={h} className="text-center">
                <p className="font-bold text-xl text-white">{h}</p>
                <p className="text-amber-200 text-xs">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Create Account</h1>
            <p className="text-stone-500">Join our global trade network</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-3">I want to join as</label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((role) => {
                const Icon = role.icon
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, role: role.id }))}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      form.role === role.id 
                        ? 'border-amber-600 bg-amber-50' 
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${form.role === role.id ? 'text-amber-600' : 'text-stone-500'}`} />
                    <div className="text-xs font-medium text-stone-700">{role.label}</div>
                    <div className="text-[10px] text-stone-500">{role.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <button 
            onClick={handleGoogleRegister}
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
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name *</label>
              <input 
                type="text" 
                required 
                value={form.full_name} 
                onChange={update('full_name')}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="Enter your full name" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email *</label>
              <input 
                type="email" 
                required 
                value={form.email} 
                onChange={update('email')}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="you@example.com" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
              <input 
                type="tel" 
                value={form.phone} 
                onChange={update('phone')}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="+91 98765 43210" 
              />
            </div>

            {/* Supplier-specific fields */}
            {form.role === 'supplier' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Company Name *</label>
                  <input 
                    type="text" 
                    required={form.role === 'supplier'}
                    value={form.company_name} 
                    onChange={update('company_name')}
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                    placeholder="Your company name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Business Address</label>
                  <input 
                    type="text" 
                    value={form.business_address} 
                    onChange={update('business_address')}
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                    placeholder="Business address" 
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password *</label>
              <div className="relative">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  required 
                  value={form.password}
                  onChange={update('password')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors pr-11"
                  placeholder="Min 8 characters" 
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
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Confirm Password *</label>
              <input 
                type="password" 
                required 
                value={form.password2} 
                onChange={update('password2')}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-600 focus:outline-none transition-colors"
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Creating account...' : `Create ${form.role.charAt(0).toUpperCase() + form.role.slice(1)} Account`}
            </button>
          </form>

          <p className="text-center text-stone-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-700 font-semibold hover:underline">Sign in</Link>
          </p>

          <p className="text-center text-stone-400 text-xs mt-4">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
