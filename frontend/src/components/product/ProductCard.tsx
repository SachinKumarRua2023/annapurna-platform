'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Star, Check, Plus, Minus } from 'lucide-react'
import { Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore(state => state.addToCart)
  const items = useCartStore(state => state.items)
  const updateItem = useCartStore(state => state.updateQuantity)
  
  const cartItem = items.find(item => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product)
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      duration: 2000
    })
    setTimeout(() => setIsAdding(false), 500)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      updateItem(product.id, 0)
      toast.success('Removed from cart')
    } else {
      updateItem(product.id, newQuantity)
    }
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        {/* Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold px-3 py-1 bg-black/70 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
          {product.category}
        </span>
        
        {/* Title */}
        <h3 className="font-semibold text-stone-800 line-clamp-2 text-sm leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-stone-700">{product.rating}</span>
          <span className="text-xs text-stone-400">({product.reviews})</span>
        </div>

        {/* Weight/Origin */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          {product.weight && <span>{product.weight}</span>}
          {product.origin && (
            <>
              <span>•</span>
              <span>{product.origin}</span>
            </>
          )}
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-stone-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              product.inStock
                ? 'bg-amber-600 text-white hover:bg-amber-700 active:scale-95'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-stone-100 rounded-xl p-1">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Minus className="w-4 h-4 text-stone-600" />
            </button>
            <span className="font-semibold text-stone-800">{quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center bg-amber-600 text-white rounded-lg shadow-sm hover:bg-amber-700 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
