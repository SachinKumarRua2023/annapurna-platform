'use client'
// src/components/product/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types'
import { clsx } from 'clsx'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [adding, setAdding] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { router.push('/login'); return }
    setAdding(true)
    await addItem(product.id)
    setAdding(false)
  }

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { router.push('/login'); return }
    setWishlisted(!wishlisted)
    // API call handled separately
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-stone-100 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">🌾</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && product.discount > 0 && (
              <span className="badge bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                -{product.discount}%
              </span>
            )}
            {product.badge === 'bestseller' && (
              <span className="badge bg-amber-500 text-white text-xs px-2 py-0.5 rounded-lg">
                🔥 Bestseller
              </span>
            )}
            {product.stock && product.stock === 0 && (
              <span className="badge bg-stone-700 text-white text-xs px-2 py-0.5 rounded-lg">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className={clsx('w-4 h-4', wishlisted ? 'fill-red-500 text-red-500' : 'text-stone-600')} />
          </button>

          {/* Quick add to cart */}
          {product.stock && product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="absolute bottom-2 left-2 right-2 bg-amber-600 text-white text-xs font-semibold py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-amber-700 active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-stone-500 text-xs mb-0.5">{product.category}</p>
          <h3 className="font-semibold text-stone-800 text-sm leading-snug line-clamp-2 mb-1.5">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && product.rating > 0 && (
            <div className="flex items-center gap-1 mb-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-stone-700">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-stone-900">₹{Number(product.price).toFixed(0)}</span>
            <span className="text-stone-400 text-xs">/unit</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-stone-400 text-xs line-through">
                ₹{Number(product.originalPrice).toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
