'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  User, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Package,
  Edit2,
  LogOut,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AccountPage() {
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'payments'>('profile')

  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', address: '123 Main Street, Delhi, India - 110001', default: true },
    { id: '2', type: 'Office', address: '456 Business Park, Mumbai, India - 400001', default: false },
  ])

  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'Credit Card', number: '**** **** **** 1234', expiry: '12/25', default: true },
    { id: '2', type: 'UPI', number: 'user@upi', default: false },
  ])

  const [orders] = useState([
    { id: '#ORD001', date: '2024-01-15', total: 1250, status: 'delivered', items: 3 },
    { id: '#ORD002', date: '2024-01-10', total: 890, status: 'in_transit', items: 2 },
    { id: '#ORD003', date: '2024-01-05', total: 2340, status: 'delivered', items: 5 },
  ])

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_transit': return <Truck className="w-5 h-5 text-blue-500" />
      default: return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'in_transit': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user?.full_name || 'My Account'}</h1>
                  <p className="text-gray-500">{user?.email || 'customer@example.com'}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                    Customer
                  </span>
                </div>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                  { id: 'addresses', label: 'Addresses', icon: MapPin },
                  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-amber-50 text-amber-600 border-l-4 border-amber-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Total Orders</span>
                    <span className="font-semibold text-gray-900">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Saved Addresses</span>
                    <span className="font-semibold text-gray-900">{addresses.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Payment Methods</span>
                    <span className="font-semibold text-gray-900">{paymentMethods.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.full_name || ''}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email || ''}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input 
                        type="tel" 
                        defaultValue="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input 
                        type="text" 
                        defaultValue="15 Jan 1990"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Package className="w-6 h-6 text-gray-400" />
                          <span className="font-semibold text-gray-900">{order.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">{order.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{order.items} items</span>
                          <span>•</span>
                          <span>Delivered on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-gray-900">₹{order.total}</span>
                          <Link 
                            href={`/account/orders/${order.id}`}
                            className="text-amber-600 hover:text-amber-700 font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <button 
                      onClick={() => toast.success('Add address feature coming soon!')}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      + Add New Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className={`border rounded-xl p-4 ${addr.default ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold text-gray-900">{addr.type}</span>
                          {addr.default && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{addr.address}</p>
                        <div className="flex gap-2 mt-4">
                          <button className="text-sm text-amber-600 hover:text-amber-700">
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-sm text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                    <button 
                      onClick={() => toast.success('Add payment method feature coming soon!')}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      + Add New Card
                    </button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map((payment) => (
                      <div key={payment.id} className={`border rounded-xl p-4 flex items-center justify-between ${payment.default ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.type}</p>
                            <p className="text-sm text-gray-500">{payment.number}</p>
                            {payment.expiry && (
                              <p className="text-xs text-gray-400">Expires {payment.expiry}</p>
                            )}
                          </div>
                        </div>
                        {payment.default ? (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                            Default
                          </span>
                        ) : (
                          <button className="text-sm text-amber-600 hover:text-amber-700">
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
