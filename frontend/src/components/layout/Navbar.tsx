'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, Menu, X, User, Search, Phone, Mail, MapPin } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const totalItems = useCartStore(state => state.getTotalItems())

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      {/* Top bar - Contact info */}
      <div className="bg-amber-600 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919407574288" className="flex items-center gap-1 hover:text-amber-100">
              <Phone className="w-3 h-3" />
              <span>+91 9407574288</span>
            </a>
            <a href="mailto:contact@annapurnaworldtrade.com" className="flex items-center gap-1 hover:text-amber-100">
              <Mail className="w-3 h-3" />
              <span>contact@annapurnaworldtrade.com</span>
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Yiwu, China & India Operations</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://www.instagram.com/annapurna58585858/" target="_blank" className="hover:text-amber-100">
              Instagram
            </Link>
            <Link href="https://www.facebook.com/people/Yiwu-Annapurna-World-Trade-Co-Ltd/61580077102644/" target="_blank" className="hover:text-amber-100">
              Facebook
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-stone-800 leading-tight">Annapurna</h1>
              <span className="text-xs text-amber-600">World Trade</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-600 hover:text-amber-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-600 hover:text-amber-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <Link href="/login" className="p-2 text-stone-600 hover:text-amber-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-stone-600 hover:text-amber-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-stone-600 hover:bg-amber-50 hover:text-amber-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
