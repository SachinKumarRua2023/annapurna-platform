'use client'
// src/app/(store)/checkout/page.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import api from '@/lib/api'
import type { Address } from '@/types'
import { Plus, MapPin, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = [
  { value: 'cod',    label: '💵 Cash on Delivery', desc: 'Pay when your order arrives' },
  { value: 'upi',    label: '📱 UPI',               desc: 'PhonePe, GPay, Paytm' },
  { value: 'online', label: '💳 Card / Net Banking', desc: 'Debit, Credit, Net Banking' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { items, total, clearCart } = useCartStore()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [couponCode, setCouponCode] = useState('')
  const [notes, setNotes] = useState('')
  const [placing, setPlacing] = useState(false)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddr, setNewAddr] = useState({
    full_name: '', phone: '', line1: '', line2: '',
    city: '', state: '', pincode: '', type: 'home'
  })

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return }
    if (items.length === 0) { router.push('/cart'); return }
    api.get('/api/auth/addresses/').then(r => {
      setAddresses(r.data)
      const def = r.data.find((a: Address) => a.is_default)
      if (def) setSelectedAddress(def.id)
    })
  }, [isAuthenticated, items])

  const addAddress = async () => {
    try {
      const { data } = await api.post('/api/auth/addresses/', newAddr)
      setAddresses(a => [...a, data])
      setSelectedAddress(data.id)
      setShowAddAddress(false)
      toast.success('Address saved!')
    } catch {
      toast.error('Failed to save address')
    }
  }

  const placeOrder = async () => {
    if (!selectedAddress) { toast.error('Please select a delivery address'); return }
    setPlacing(true)
    try {
      const { data } = await api.post('/api/orders/checkout/', {
        address_id: selectedAddress,
        payment_method: paymentMethod,
        coupon_code: couponCode || undefined,
        notes,
      })
      clearCart()
      toast.success('Order placed successfully! 🎉')
      router.push(`/orders/${data.order_number}`)
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  const shipping = Number(total) >= 500 ? 0 : 50
  const grandTotal = Number(total) + shipping

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Address */}
            <section className="card p-6">
              <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" /> Delivery Address
              </h2>

              {addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {addresses.map(addr => (
                    <label key={addr.id} className={`flex gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddress === addr.id ? 'border-amber-500 bg-amber-50' : 'border-stone-200 hover:border-stone-300'
                    }`}>
                      <input type="radio" name="address" value={addr.id}
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-0.5 accent-amber-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-stone-800">{addr.full_name}</p>
                          <span className="badge badge-amber capitalize">{addr.type}</span>
                          {addr.is_default && <span className="badge badge-green">Default</span>}
                        </div>
                        <p className="text-stone-600 text-sm mt-0.5">{addr.phone}</p>
                        <p className="text-stone-600 text-sm">
                          {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {showAddAddress ? (
                <div className="bg-stone-50 rounded-xl p-4 space-y-3">
                  <h3 className="font-semibold text-stone-800 mb-2">New Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input text-sm py-2" placeholder="Full Name" value={newAddr.full_name} onChange={e => setNewAddr(a => ({...a, full_name: e.target.value}))} />
                    <input className="input text-sm py-2" placeholder="Phone" value={newAddr.phone} onChange={e => setNewAddr(a => ({...a, phone: e.target.value}))} />
                  </div>
                  <input className="input text-sm py-2" placeholder="Address Line 1" value={newAddr.line1} onChange={e => setNewAddr(a => ({...a, line1: e.target.value}))} />
                  <input className="input text-sm py-2" placeholder="Address Line 2 (optional)" value={newAddr.line2} onChange={e => setNewAddr(a => ({...a, line2: e.target.value}))} />
                  <div className="grid grid-cols-3 gap-3">
                    <input className="input text-sm py-2" placeholder="City" value={newAddr.city} onChange={e => setNewAddr(a => ({...a, city: e.target.value}))} />
                    <input className="input text-sm py-2" placeholder="State" value={newAddr.state} onChange={e => setNewAddr(a => ({...a, state: e.target.value}))} />
                    <input className="input text-sm py-2" placeholder="Pincode" value={newAddr.pincode} onChange={e => setNewAddr(a => ({...a, pincode: e.target.value}))} />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={addAddress} className="btn-primary text-sm px-4 py-2">Save Address</button>
                    <button onClick={() => setShowAddAddress(false)} className="btn-ghost text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowAddAddress(true)}
                  className="flex items-center gap-2 text-amber-700 text-sm font-medium hover:underline">
                  <Plus className="w-4 h-4" /> Add new address
                </button>
              )}
            </section>

            {/* Payment */}
            <section className="card p-6">
              <h2 className="text-lg font-bold text-stone-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.value} className={`flex gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === m.value ? 'border-amber-500 bg-amber-50' : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input type="radio" name="payment" value={m.value}
                      checked={paymentMethod === m.value}
                      onChange={() => setPaymentMethod(m.value)}
                      className="mt-0.5 accent-amber-600" />
                    <div>
                      <p className="font-semibold text-stone-800">{m.label}</p>
                      <p className="text-stone-500 text-sm">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Coupon + Notes */}
            <section className="card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Coupon Code</label>
                <div className="flex gap-2">
                  <input className="input text-sm py-2 flex-1" placeholder="Enter coupon code"
                    value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} />
                  <button className="btn-outline text-sm px-4 py-2">Apply</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Order Notes <span className="text-stone-400">(optional)</span></label>
                <textarea className="input text-sm py-2 resize-none" rows={3}
                  placeholder="Any special instructions..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-stone-900 mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm mb-4 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-stone-600">
                    <span className="line-clamp-1 flex-1 pr-2">{item.product.name} × {item.quantity}</span>
                    <span>₹{Number(item.subtotal).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span><span>₹{Number(total).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-base pt-2 border-t border-stone-200">
                  <span>Total</span><span>₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <button onClick={placeOrder} disabled={placing || !selectedAddress}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-6 py-4 text-base disabled:opacity-50">
                <CheckCircle className="w-5 h-5" />
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
