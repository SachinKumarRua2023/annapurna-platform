'use client'
// src/components/ui/ModernProductGrid.tsx
import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Grid, List, ShoppingCart, Heart, Star, TrendingUp, Sparkles } from 'lucide-react'
import ThreeProductCard from './ThreeProductCard'

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  supplier: string
  stock: number
  is_featured: boolean
  rating?: number
  reviews?: number
  image?: string
}

interface ModernProductGridProps {
  products: Product[]
  title?: string
  showFilters?: boolean
}

export default function ModernProductGrid({ 
  products, 
  title = "Products", 
  showFilters = true 
}: ModernProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Extract unique categories with useMemo for performance
  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products])

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
        break
    }

    return filtered
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  const handleAddToCart = (product: Product) => {
    // Add to cart logic
    console.log('Adding to cart:', product.name)
  }

  const handleViewDetails = (product: Product) => {
    // View product details logic
    console.log('Viewing details:', product.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-amber-50 to-orange-100">
      {/* Enhanced Header with Glass Effect */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-amber-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">{title}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {filteredProducts.length} of {products.length} products
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-amber-600 font-medium">Premium Collection</span>
              </p>
            </div>
            
            {/* Enhanced View Toggle */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-1 border border-amber-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-amber-600 scale-110' 
                    : 'text-gray-600 hover:text-amber-600 hover:scale-105'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-amber-600 scale-110' 
                    : 'text-gray-600 hover:text-amber-600 hover:scale-105'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      {showFilters && (
        <div className="bg-white/90 backdrop-blur-md border-b border-amber-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Enhanced Search */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-amber-300"
                />
              </div>

              {/* Enhanced Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? '🌟 All Categories' : category}
                  </option>
                ))}
              </select>

              {/* Enhanced Price Range */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300"
                />
                <span className="text-gray-500 font-medium">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300"
                />
              </div>

              {/* Enhanced Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-300"
              >
                <option value="featured">⭐ Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="name">🔤 Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-amber-200/50">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setPriceRange({ min: 0, max: 1000 })
                setSortBy('featured')
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                {viewMode === 'grid' ? (
                  <ThreeProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onViewDetails={() => handleViewDetails(product)}
                  />
                ) : (
                  /* List View */
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-amber-300">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                        <div className="text-amber-600 font-bold text-sm text-center">{product.category}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                          </div>
                          {product.is_featured && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-amber-600">₹{product.price}</div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetails(product)}
                              className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
