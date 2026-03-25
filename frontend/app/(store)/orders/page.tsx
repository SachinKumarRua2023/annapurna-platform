'use client'
// src/app/(store)/orders/page.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'
import type { Order } from '@/types'
import { Package, ChevronRight } from 'lucide-react'

const STATUS_STYLES: Record<string, string> = {
  pending:    'badge-amber',
  confirmed:  'badge-blue',
  processing: 'badge-blue',
  shipped:    'badge-blue',
  delivered:  'badge-green',
  cancelled:  'badge-red',
  refunded:   'badge-red',
}

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return }
    api.get('/api/orders/')
      .then(r => setOrders(r.data.results || r.data))
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="skeleton h-32 rounded-2xl" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-20 h-20 mx-auto mb-4 text-stone-200" />
            <h2 className="text-xl font-semibold text-stone-700 mb-2">No orders yet</h2>
            <p className="text-stone-500 mb-6">Start shopping to see your orders here</p>
            <Link href="/products" className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Link key={order.id} href={`/orders/${order.order_number}`}
                className="card p-5 flex items-center justify-between hover:shadow-md transition-all group">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-stone-800">{order.order_number}</p>
                    <span className={`badge ${STATUS_STYLES[order.status] || 'badge-amber'} capitalize`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} · ₹{Number(order.total).toFixed(0)}
                  </p>
                  <p className="text-stone-400 text-xs mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
