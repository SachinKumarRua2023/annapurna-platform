'use client'
// src/app/(store)/products/[slug]/page.tsx
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import api from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import type { Product } from '@/types'
import { Star, ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [tab, setTab] = useState<'desc' | 'reviews'>('desc')

  useEffect(() => {
    api.get(`/api/products/${slug}/`)
      .then(r => setProduct(r.data))
      .catch(() => router.push('/products'))
      .finally(() => setLoading(false))
  }, [slug])

  const handleAddToCart = async () => {
    if (!isAuthenticated) { router.push('/login'); return }
    if (!product) return
    setAdding(true)
    await addItem(product.id, quantity, product)
    setAdding(false)
  }

  if (loading) return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        <div className="skeleton aspect-square rounded-2xl" />
        <div className="space-y-4">
          {[40, 60, 30, 80, 50].map((w, i) => (
            <div key={i} className="skeleton h-6 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </>
  )

  if (!product) return null

  const images = product.images?.length ? product.images : []
  const primarySrc = images[selectedImage]?.image || product.primary_image

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-sm text-stone-500 mb-8">
          <a href="/" className="hover:text-amber-700">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-amber-700">Products</a>
          <span className="mx-2">/</span>
          <span className="text-stone-800">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100">
              {primarySrc ? (
                <Image src={primarySrc} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">🌾</div>
              )}
              {product.discount_percent > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                  -{product.discount_percent}% OFF
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-amber-500' : 'border-transparent hover:border-stone-300'
                    }`}>
                    <Image src={img.image} alt={img.alt_text || product.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-amber-700 font-medium text-sm mb-1">{product.category_name}</p>
            <h1 className="text-3xl font-bold text-stone-900 mb-3 leading-snug">{product.name}</h1>

            {product.avg_rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.avg_rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-stone-700">{product.avg_rating}</span>
                <span className="text-sm text-stone-500">({product.review_count} reviews)</span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-stone-900">₹{Number(product.price).toFixed(0)}</span>
              <span className="text-stone-400">/ {product.unit}</span>
              {product.compare_price && Number(product.compare_price) > Number(product.price) && (
                <span className="text-stone-400 text-lg line-through">₹{Number(product.compare_price).toFixed(0)}</span>
              )}
            </div>

            {product.short_desc && (
              <p className="text-stone-600 mb-6 leading-relaxed">{product.short_desc}</p>
            )}

            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:bg-stone-100 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-semibold text-stone-800 min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-4 py-3 hover:bg-stone-100 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={handleAddToCart} disabled={adding}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-3.5 text-base">
                  <ShoppingCart className="w-5 h-5" />
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
                <button className="p-3.5 border-2 border-stone-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all">
                  <Heart className="w-5 h-5 text-stone-500" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100">
              {[
                { icon: Truck,   label: 'Free delivery above ₹500' },
                { icon: Package, label: 'Easy returns in 7 days' },
                { icon: Shield,  label: 'Quality guaranteed' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-stone-50">
                  <Icon className="w-5 h-5 text-amber-600" />
                  <p className="text-xs text-stone-600 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200">
          <div className="flex gap-8 pt-1">
            {(['desc', 'reviews'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`py-4 font-semibold text-sm border-b-2 transition-all -mb-px ${
                  tab === t ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}>
                {t === 'desc' ? 'Description' : `Reviews (${product.review_count || 0})`}
              </button>
            ))}
          </div>

          <div className="py-8">
            {tab === 'desc' ? (
              <div className="prose max-w-none text-stone-700 leading-relaxed">
                {product.description || 'No description available.'}
              </div>
            ) : (
              <div className="space-y-6">
                {product.reviews && product.reviews.length > 0 ? product.reviews.map(r => (
                  <div key={r.id} className="flex gap-4 pb-6 border-b border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-semibold text-amber-700 flex-shrink-0">
                      {r.user_name?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-stone-800 text-sm">{r.user_name}</p>
                        {r.is_verified && <span className="badge badge-green text-xs">Verified Purchase</span>}
                      </div>
                      <div className="flex mb-2">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                        ))}
                      </div>
                      {r.title && <p className="font-medium text-stone-700 text-sm mb-1">{r.title}</p>}
                      <p className="text-stone-600 text-sm leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12 text-stone-500">
                    <Star className="w-12 h-12 mx-auto mb-3 text-stone-200" />
                    <p>No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}