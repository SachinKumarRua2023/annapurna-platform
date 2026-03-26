'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { items, total, itemCount, fetchCart, updateItem, removeItem, isLoading } = useCartStore()

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return }
    fetchCart()
  }, [isAuthenticated])

  const shipping = total >= 500 ? 0 : 50
  const grandTotal = Number(total) + shipping

  if (isLoading) return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-4">
        {[1,2,3].map(i => <div key={i} className="skeleton h-28 rounded-2xl" />)}
      </div>
    </>
  )

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">
          My Cart <span className="text-stone-400 font-normal text-xl ml-2">({itemCount} items)</span>
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-stone-200" />
            <h2 className="text-2xl font-semibold text-stone-700 mb-2">Your cart is empty</h2>
            <p className="text-stone-500 mb-8">Add some delicious products to get started</p>
            <Link href="/products" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="card flex gap-4 p-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                    {item.product.primary_image ? (
                      <Image src={item.product.primary_image} alt={item.product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🌾</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`} className="font-semibold text-stone-800 hover:text-amber-700 line-clamp-2 block">
                      {item.product.name}
                    </Link>
                    <p className="text-stone-500 text-sm mt-0.5">₹{Number(item.product.price).toFixed(0)} / {item.product.unit}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateItem(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-stone-100 transition-colors text-stone-600">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-semibold text-stone-800 min-w-[2rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-3 py-1.5 hover:bg-stone-100 transition-colors text-stone-600 disabled:opacity-40">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-900">₹{Number(item.subtotal).toFixed(0)}</span>
                        <button onClick={() => removeItem(item.id)}
                          className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-lg font-bold text-stone-900 mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{Number(total).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery charges</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span>₹{shipping}</span>
                    )}
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2">
                      Add ₹{(500 - Number(total)).toFixed(0)} more for free delivery!
                    </p>
                  )}
                  <div className="border-t border-stone-200 pt-3 flex justify-between font-bold text-stone-900 text-base">
                    <span>Total</span>
                    <span>₹{grandTotal.toFixed(0)}</span>
                  </div>
                </div>

                <Link href="/checkout"
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-6 py-4 text-base">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>

                <Link href="/products" className="block text-center text-amber-700 text-sm mt-4 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}