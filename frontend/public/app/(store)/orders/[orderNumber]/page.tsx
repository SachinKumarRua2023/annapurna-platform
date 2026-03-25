'use client'
// src/app/(store)/orders/[orderNumber]/page.tsx
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'
import type { Order } from '@/types'
import { Package, MapPin, CreditCard, CheckCircle, Truck, Clock, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
const STATUS_ICONS: Record<string, any> = {
  pending: Clock, confirmed: CheckCircle, processing: Package,
  shipped: Truck, delivered: CheckCircle, cancelled: XCircle
}

export default function OrderDetailPage() {
  const { orderNumber } = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return }
    api.get(`/api/orders/${orderNumber}/`)
      .then(r => setOrder(r.data))
      .catch(() => router.push('/orders'))
      .finally(() => setLoading(false))
  }, [isAuthenticated, orderNumber])

  const cancelOrder = async () => {
    if (!confirm('Cancel this order?')) return
    setCancelling(true)
    try {
      await api.post(`/api/orders/${orderNumber}/cancel/`)
      setOrder(o => o ? { ...o, status: 'cancelled' } : null)
      toast.success('Order cancelled')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Cannot cancel at this stage')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) return <><Navbar /><div className="max-w-3xl mx-auto px-4 py-12"><div className="skeleton h-96 rounded-2xl" /></div></>
  if (!order) return null

  const currentStep = STATUS_STEPS.indexOf(order.status)
  const isCancelled = order.status === 'cancelled'
  const StatusIcon = STATUS_ICONS[order.status] || Package

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/orders" className="text-amber-700 text-sm hover:underline mb-1 block">← All Orders</Link>
            <h1 className="text-2xl font-bold text-stone-900">{order.order_number}</h1>
            <p className="text-stone-500 text-sm mt-0.5">
              Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          {['pending', 'confirmed'].includes(order.status) && (
            <button onClick={cancelOrder} disabled={cancelling}
              className="text-sm text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-all">
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>

        {/* Status tracker */}
        {!isCancelled ? (
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-stone-200 mx-8" />
              <div className="absolute top-5 left-0 h-0.5 bg-amber-500 mx-8 transition-all"
                style={{ width: currentStep >= 0 ? `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` : '0%' }} />
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStep
                return (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      done ? 'bg-amber-500 border-amber-500' : 'bg-white border-stone-300'
                    }`}>
                      <Package className={`w-4 h-4 ${done ? 'text-white' : 'text-stone-400'}`} />
                    </div>
                    <p className={`text-xs mt-2 font-medium capitalize ${done ? 'text-amber-700' : 'text-stone-400'}`}>{step}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="card p-4 mb-6 flex items-center gap-3 border-red-200 bg-red-50">
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="font-medium text-red-700">This order has been cancelled</p>
          </div>
        )}

        {/* Items */}
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-600" /> Order Items
          </h2>
          <div className="divide-y divide-stone-100">
            {order.items.map(item => (
              <div key={item.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-stone-800">{item.product_name}</p>
                  <p className="text-stone-500 text-sm">SKU: {item.product_sku} · ₹{Number(item.unit_price).toFixed(0)} × {item.quantity}</p>
                </div>
                <p className="font-semibold text-stone-900">₹{Number(item.total).toFixed(0)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-stone-200 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>₹{Number(order.subtotal).toFixed(0)}</span></div>
            {Number(order.discount) > 0 && (
              <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{Number(order.discount).toFixed(0)}</span></div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Delivery</span>
              <span>{Number(order.shipping_charge) === 0 ? 'FREE' : `₹${Number(order.shipping_charge).toFixed(0)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-stone-900 text-base pt-1 border-t border-stone-200">
              <span>Total</span><span>₹{Number(order.total).toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Address + Payment */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-amber-600" /> Delivery Address
            </h3>
            <p className="font-medium text-stone-700">{order.shipping_name}</p>
            <p className="text-stone-600 text-sm">{order.shipping_city}, {order.shipping_state}</p>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-amber-600" /> Payment
            </h3>
            <p className="text-stone-700 capitalize font-medium">{order.payment_method.replace('_', ' ')}</p>
            <p className={`text-sm capitalize mt-0.5 ${
              order.payment_status === 'paid' ? 'text-green-600' : 'text-amber-600'
            }`}>{order.payment_status}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
