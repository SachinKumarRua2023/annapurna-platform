'use client'
// World-Class Featured Section - Google CEO Level Design
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Sparkles, TrendingUp, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types'
import { clsx } from 'clsx'

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice - Himalayan Gold',
    price: 89.99,
    originalPrice: 119.99,
    description: 'Extra long grain aromatic basmati rice from the fertile Terai region. Aged to perfection for superior taste and texture.',
    category: 'Organic Grains',
    supplier: 'Himalayan Organic Farms',
    stock: 150,
    is_featured: true,
    rating: 4.8,
    reviews: 124,
    discount: 25,
    badge: 'Bestseller'
  },
  {
    id: '2',
    name: 'Wild Timur Pepper - Mountain Spice',
    price: 28.99,
    description: 'Himalayan Sichuan pepper with unique citrus flavor profile. Hand-picked from high-altitude regions.',
    category: 'Spices & Herbs',
    supplier: 'Kathmandu Spice Traders',
    stock: 75,
    is_featured: true,
    rating: 4.9,
    reviews: 89,
    badge: 'Organic'
  },
  {
    id: '3',
    name: 'Pure Himalayan Wild Honey',
    price: 38.99,
    description: 'Raw, unprocessed honey from high-altitude flowers. Rich in antioxidants and natural enzymes.',
    category: 'Honey & Sweeteners',
    supplier: 'Everest Honey Collective',
    stock: 35,
    is_featured: true,
    rating: 4.7,
    reviews: 156,
    badge: 'Limited'
  },
  {
    id: '4',
    name: 'Handwoven Pashmina Shawl',
    price: 125.99,
    description: 'Luxurious hand-woven pashmina shawl with traditional Himalayan patterns. Perfect for any occasion.',
    category: 'Handicrafts',
    supplier: 'Traditional Artisans Guild',
    stock: 20,
    is_featured: true,
    rating: 4.9,
    reviews: 67,
    badge: 'Premium'
  },
  {
    id: '5',
    name: 'Ilam Black Tea - First Flush',
    price: 25.99,
    description: 'Premium first flush black tea from the renowned Ilam tea gardens. Delicate flavor with floral notes.',
    category: 'Tea & Beverages',
    supplier: 'Valley Tea Estates',
    stock: 80,
    is_featured: true,
    rating: 4.6,
    reviews: 203,
    badge: 'New'
  },
  {
    id: '6',
    name: 'Organic Grass-Fed Ghee',
    price: 35.99,
    description: 'Pure clarified butter from grass-fed cows. Rich in vitamins and perfect for cooking.',
    category: 'Dairy Products',
    supplier: 'Mountain Dairy Co-op',
    stock: 60,
    is_featured: false,
    rating: 4.8,
    reviews: 92
  },
  {
    id: '7',
    name: 'Pure Shilajit Resin',
    price: 125.99,
    description: 'Authentic Himalayan shilajit resin. Sourced from high-altitude mountains for maximum potency.',
    category: 'Health & Wellness',
    supplier: 'Natural Wellness Nepal',
    stock: 20,
    is_featured: false,
    rating: 4.9,
    reviews: 45,
    badge: 'Rare'
  },
  {
    id: '8',
    name: 'Traditional Sel Roti Pack',
    price: 12.99,
    description: 'Authentic homemade sel roti sweet bread. Made with traditional recipes and love.',
    category: 'Snacks & Sweets',
    supplier: 'Mountain Sweet Makers',
    stock: 50,
    is_featured: false,
    rating: 4.5,
    reviews: 178
  }
]

export default function FeaturedSection() {
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [bestsellers, setBestsellers] = useState<Product[]>([])
  const [tab, setTab] = useState<'featured' | 'bestsellers'>('featured')
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  // Memoized products for performance
  const featuredProducts = useMemo(() => sampleProducts.filter(p => p.is_featured), [])
  const bestsellerProducts = useMemo(() => sampleProducts.filter(p => (p.rating || 0) >= 4.7).slice(0, 8), [])

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setProducts(featuredProducts)
      setBestsellers(bestsellerProducts)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [featuredProducts, bestsellerProducts])

  const shown = tab === 'featured' ? products : bestsellers

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    if (!isAuthenticated) { 
      router.push('/login'); 
      return 
    }
    await addItem(product.id, 1, product)
  }

  const handleWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    if (!isAuthenticated) { 
      router.push('/login'); 
      return 
    }
    
    setWishlist(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-amber-600 font-bold text-sm uppercase tracking-wider mb-1">
                  Handpicked for You
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Premium Selection
                </h2>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover our carefully curated collection of authentic Nepalese products, 
              each telling a unique story of tradition and quality.
            </p>
          </div>
          
          <Link 
            href="/products" 
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            View All Products
            <Package className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-amber-200/50 shadow-lg">
            {[
              { key: 'featured', label: '✨ Featured', icon: <Sparkles className="w-4 h-4" />, count: featuredProducts.length },
              { key: 'bestsellers', label: '🔥 Bestsellers', icon: <TrendingUp className="w-4 h-4" />, count: bestsellerProducts.length }
            ].map((t) => (
              <button 
                key={t.key} 
                onClick={() => setTab(t.key as 'featured' | 'bestsellers')}
                className={clsx(
                  'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2',
                  tab === t.key 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-amber-50'
                )}
              >
                {t.icon}
                <span>{t.label}</span>
                <span className={clsx(
                  'px-2 py-0.5 rounded-full text-xs',
                  tab === t.key ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                )}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>In Stock</span>
            </div>
            <span className="text-gray-300">•</span>
            <span>{shown.length} products</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : shown.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shown.map((product) => (
              <div key={product.id} className="group relative">
                {/* Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50">
                        {product.category === 'Organic Grains' ? '🌾' :
                         product.category === 'Spices & Herbs' ? '🌿' :
                         product.category === 'Honey & Sweeteners' ? '🍯' :
                         product.category === 'Handicrafts' ? '🎨' :
                         product.category === 'Tea & Beverages' ? '🍵' :
                         product.category === 'Dairy Products' ? '🥛' :
                         product.category === 'Health & Wellness' ? '🌱' : '🍪'}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discount && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          -{product.discount}%
                        </span>
                      )}
                      {product.badge && (
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleWishlist(e, product.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <Heart className={clsx(
                        'w-5 h-5 transition-colors',
                        wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                      )} />
                    </button>

                    {/* Quick Add to Cart */}
                    {product.stock > 0 && (
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-bold py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={clsx(
                                'w-4 h-4',
                                i < Math.floor(product.rating!) 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-gray-300'
                              )} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {product.rating}
                        </span>
                        {product.reviews && (
                          <span className="text-xs text-gray-500">
                            ({product.reviews})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                          <span className="text-green-600 text-sm font-semibold">
                            Save ${product.originalPrice - product.price}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-600 mb-6">Check back later for amazing deals</p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
