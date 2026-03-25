'use client'
// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Menu, X, Search, Heart, ChevronDown, LogOut, Package } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { clsx } from 'clsx'

export default function Navbar() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { itemCount, fetchCart } = useCartStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (isAuthenticated) fetchCart()
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [isAuthenticated])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) router.push(`/products?search=${encodeURIComponent(search)}`)
  }

  const handleLogout = async () => {
    await logout()
    setUserMenu(false)
    router.push('/')
  }

  return (
    <header className={clsx(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'
    )}>
      {/* Top bar */}
      <div className="bg-amber-600 text-white text-xs text-center py-1.5 font-medium">
        🌾 Free delivery on orders above ₹500 &nbsp;|&nbsp; Fresh from source, delivered daily
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display' }}>A</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-stone-900 leading-none" style={{ fontFamily: 'Playfair Display', fontSize: '18px' }}>Annapurna</p>
              <p className="text-stone-500 text-[10px] leading-none tracking-wider uppercase">Fresh from Source</p>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for rice, spices, pulses..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {isAuthenticated ? (
              <>
                {/* Wishlist */}
                <Link href="/wishlist" className="btn-ghost p-2.5 hidden sm:flex">
                  <Heart className="w-5 h-5" />
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative btn-ghost p-2.5">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </Link>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenu(!userMenu)}
                    className="flex items-center gap-2 btn-ghost px-2.5 py-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-700 font-semibold text-sm">
                        {user?.full_name?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 hidden sm:block text-stone-500" />
                  </button>

                  {userMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenu(false)} />
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-20">
                        <div className="px-4 py-2 border-b border-stone-100">
                          <p className="font-semibold text-stone-800 text-sm truncate">{user?.full_name}</p>
                          <p className="text-stone-500 text-xs truncate">{user?.email}</p>
                        </div>
                        <Link href="/account" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-stone-50 text-sm" onClick={() => setUserMenu(false)}>
                          <User className="w-4 h-4 text-stone-500" /> My Account
                        </Link>
                        <Link href="/orders" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-stone-50 text-sm" onClick={() => setUserMenu(false)}>
                          <Package className="w-4 h-4 text-stone-500" /> My Orders
                        </Link>
                        {user?.role === 'admin' && (
                          <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-stone-50 text-sm text-amber-700" onClick={() => setUserMenu(false)}>
                            Admin Dashboard
                          </Link>
                        )}
                        <div className="border-t border-stone-100 mt-1">
                          <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 w-full">
                            <LogOut className="w-4 h-4" /> Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm px-3 py-2 hidden sm:block">Sign in</Link>
                <Link href="/register" className="btn-primary text-sm px-4 py-2">Get Started</Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="btn-ghost p-2.5 md:hidden">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 pb-3 text-sm">
          {[
            { href: '/products', label: 'All Products' },
            { href: '/products?category=rice', label: 'Rice & Grains' },
            { href: '/products?category=spices', label: 'Spices' },
            { href: '/products?category=pulses', label: 'Pulses & Lentils' },
            { href: '/products?category=oils', label: 'Oils' },
            { href: '/products?is_featured=true', label: '✨ Featured' },
            { href: '/products?is_bestseller=true', label: '🔥 Bestsellers' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-stone-600 hover:text-amber-700 transition-colors font-medium">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-2">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none" />
            </div>
          </form>
          {['All Products', 'Rice & Grains', 'Spices', 'Pulses & Lentils', 'Oils'].map(label => (
            <Link key={label} href={`/products?search=${label}`} className="block py-2 text-stone-700 font-medium border-b border-stone-50" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
