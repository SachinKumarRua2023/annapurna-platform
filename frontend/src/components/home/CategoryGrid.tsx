'use client'
// World-Class Category Grid - Google CEO Level Design
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Sparkles, Package, Heart, Shield, TrendingUp } from 'lucide-react'
import type { Category } from '@/types'

// Enhanced category icons with emojis
const CATEGORY_ICONS: Record<string, string> = {
  'organic-grains': '🌾',
  'grains': '🌽', 
  'spices-herbs': '🌶️',
  'spices': '🌿',
  'herbs': '🌱',
  'pulses': '🫘',
  'lentils': '🟤',
  'oils': '🫙',
  'flour': '🧁',
  'sugar': '🍬',
  'salt': '🧂',
  'nuts': '🥜',
  'seeds': '🌱',
  'honey-sweeteners': '🍯',
  'honey': '🍯',
  'sweeteners': '🍬',
  'dairy': '🥛',
  'dairy-products': '🥛',
  'tea-beverages': '🍵',
  'tea': '🍵',
  'beverages': '☕',
  'handicrafts': '🎨',
  'crafts': '🎨',
  'health-wellness': '🌿',
  'health': '🌿',
  'wellness': '💚',
  'snacks-sweets': '🍪',
  'snacks': '🍿',
  'sweets': '🍬',
  'default': '🛒'
}

// Sample categories for demonstration
const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Organic Grains',
    description: 'Premium quality grains from Himalayan farms',
    product_count: 25,
    icon: '🌾',
    image: '/categories/grains.jpg'
  },
  {
    id: '2',
    name: 'Spices & Herbs',
    description: 'Authentic Nepalese spices and herbs',
    product_count: 18,
    icon: '🌶️',
    image: '/categories/spices.jpg'
  },
  {
    id: '3',
    name: 'Dairy Products',
    description: 'Fresh dairy from mountain farms',
    product_count: 12,
    icon: '🥛',
    image: '/categories/dairy.jpg'
  },
  {
    id: '4',
    name: 'Honey & Sweeteners',
    description: 'Natural sweeteners and honey',
    product_count: 8,
    icon: '🍯',
    image: '/categories/honey.jpg'
  },
  {
    id: '5',
    name: 'Tea & Beverages',
    description: 'Premium teas and beverages',
    product_count: 15,
    icon: '🍵',
    image: '/categories/tea.jpg'
  },
  {
    id: '6',
    name: 'Handicrafts',
    description: 'Traditional Nepalese handicrafts',
    product_count: 20,
    icon: '🎨',
    image: '/categories/handicrafts.jpg'
  },
  {
    id: '7',
    name: 'Health & Wellness',
    description: 'Natural health products',
    product_count: 10,
    icon: '🌿',
    image: '/categories/health.jpg'
  },
  {
    id: '8',
    name: 'Snacks & Sweets',
    description: 'Traditional snacks and sweets',
    product_count: 14,
    icon: '🍪',
    image: '/categories/snacks.jpg'
  }
]

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Memoized categories for performance
  const displayCategories = useMemo(() => {
    return categories.length > 0 ? categories : sampleCategories
  }, [categories])

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setCategories(sampleCategories)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Function to get icon based on category name or slug
  const getCategoryIcon = (category: Category) => {
    // Try to find icon by name (lowercase, spaces replaced with dashes)
    const nameKey = category.name.toLowerCase().replace(/\s+/g, '-')
    // Try to find icon by slug if it exists
    const slugKey = (category as any).slug || nameKey
    
    return category.icon || CATEGORY_ICONS[slugKey] || CATEGORY_ICONS[nameKey] || CATEGORY_ICONS.default
  }

  // Function to get category URL
  const getCategoryUrl = (category: Category) => {
    const slug = (category as any).slug || category.name.toLowerCase().replace(/\s+/g, '-')
    return `/products?category=${slug}`
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white via-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <p className="text-amber-600 font-bold text-sm uppercase tracking-wider">
                Browse by
              </p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Categories
            </h2>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-lg animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3" />
                <div className="h-3 bg-gray-200 rounded mx-auto w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!displayCategories.length) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-amber-600 font-bold text-sm uppercase tracking-wider mb-2">
                Browse by
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Categories
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse collection of authentic Nepalese products, 
            organized by category for your convenience.
          </p>
        </div>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {displayCategories.slice(0, 8).map((category, index) => {
            const icon = getCategoryIcon(category)
            const url = getCategoryUrl(category)
            
            return (
              <Link 
                key={category.id} 
                href={url}
                className="group relative"
              >
                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-amber-200">
                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl filter drop-shadow-sm">{icon}</span>
                    </div>
                    
                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-125" />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-bold text-gray-900 text-sm text-center leading-tight mb-2 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h3>

                  {/* Product Count */}
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Package className="w-3 h-3" />
                    <span>{category.product_count} products</span>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Package className="w-5 h-5" />
            View All Categories
            <Sparkles className="w-5 h-5" />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: <Shield className="w-6 h-6" />, text: 'Quality Assured' },
            { icon: <Heart className="w-6 h-6" />, text: 'Authentic Products' },
            { icon: <TrendingUp className="w-6 h-6" />, text: 'Best Prices' },
            { icon: <Package className="w-6 h-6" />, text: 'Fast Delivery' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                {item.icon}
              </div>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
