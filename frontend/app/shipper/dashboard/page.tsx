'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { 
  Truck, 
  MapPin, 
  Package, 
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  User,
  Navigation,
  Phone,
  ChevronRight,
  Search
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Delivery {
  id: string
  orderId: string
  customer: string
  phone: string
  address: string
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'failed'
  estimatedTime: string
  items: number
  total: number
}

export default function ShipperDashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending')
  const [searchQuery, setSearchQuery] = useState('')

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { 
      id: 'DEL001', 
      orderId: '#ORD001', 
      customer: 'Rajesh Kumar', 
      phone: '+91 98765 43210',
      address: '123 Main St, Delhi, India', 
      status: 'pending', 
      estimatedTime: '2:00 PM',
      items: 3,
      total: 1250
    },
    { 
      id: 'DEL002', 
      orderId: '#ORD002', 
      customer: 'Sarah Chen', 
      phone: '+971 50 123 4567',
      address: '456 Trade Center, Dubai, UAE', 
      status: 'in_transit', 
      estimatedTime: '4:30 PM',
      items: 5,
      total: 3450
    },
    { 
      id: 'DEL003', 
      orderId: '#ORD003', 
      customer: 'Michael Osei', 
      phone: '+233 20 123 4567',
      address: '789 Market Road, Accra, Ghana', 
      status: 'delivered', 
      estimatedTime: 'Delivered at 11:00 AM',
      items: 2,
      total: 890
    },
  ])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleStatusUpdate = (deliveryId: string, newStatus: Delivery['status']) => {
    setDeliveries(deliveries.map(d => 
      d.id === deliveryId ? { ...d, status: newStatus } : d
    ))
    toast.success(`Delivery ${deliveryId} updated to ${newStatus}`)
  }

  const stats = [
    { label: 'Pending', value: deliveries.filter(d => d.status === 'pending').length, icon: Package, color: 'bg-yellow-500' },
    { label: 'In Transit', value: deliveries.filter(d => d.status === 'in_transit').length, icon: Truck, color: 'bg-blue-500' },
    { label: 'Delivered Today', value: deliveries.filter(d => d.status === 'delivered').length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Failed', value: deliveries.filter(d => d.status === 'failed').length, icon: AlertCircle, color: 'bg-red-500' },
  ]

  const filteredDeliveries = deliveries.filter(d => {
    if (activeTab === 'pending') return d.status === 'pending'
    if (activeTab === 'active') return d.status === 'picked_up' || d.status === 'in_transit'
    if (activeTab === 'completed') return d.status === 'delivered' || d.status === 'failed'
    return true
  }).filter(d => 
    d.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'picked_up': return 'bg-blue-100 text-blue-700'
      case 'in_transit': return 'bg-indigo-100 text-indigo-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return Package
      case 'picked_up': return Truck
      case 'in_transit': return Navigation
      case 'delivered': return CheckCircle
      case 'failed': return AlertCircle
      default: return Clock
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Shipper Dashboard</h1>
                <p className="text-xs text-gray-500">Delivery Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.full_name || 'Shipper'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b">
            {[
              { id: 'pending', label: 'Pending', count: deliveries.filter(d => d.status === 'pending').length },
              { id: 'active', label: 'Active', count: deliveries.filter(d => d.status === 'picked_up' || d.status === 'in_transit').length },
              { id: 'completed', label: 'Completed', count: deliveries.filter(d => d.status === 'delivered' || d.status === 'failed').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {filteredDeliveries.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No deliveries found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDeliveries.map((delivery) => {
                  const StatusIcon = getStatusIcon(delivery.status)
                  return (
                    <div key={delivery.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(delivery.status)}`}>
                            <StatusIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{delivery.orderId}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(delivery.status)}`}>
                                {delivery.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-lg font-medium text-gray-900 mt-1">{delivery.customer}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {delivery.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {delivery.address}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Items</p>
                            <p className="font-semibold text-gray-900">{delivery.items}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-semibold text-gray-900">${delivery.total}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">ETA</p>
                            <p className="font-semibold text-gray-900">{delivery.estimatedTime}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {delivery.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(delivery.id, 'picked_up')}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Pick Up
                            </button>
                          )}
                          {delivery.status === 'picked_up' && (
                            <button
                              onClick={() => handleStatusUpdate(delivery.id, 'in_transit')}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Start Delivery
                            </button>
                          )}
                          {delivery.status === 'in_transit' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                Mark Delivered
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(delivery.id, 'failed')}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                Failed
                              </button>
                            </>
                          )}
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Today's Route */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            Today's Delivery Route
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { time: '9:00 AM', location: 'Warehouse Pickup', status: 'completed', address: 'Yiwu, China' },
              { time: '2:00 PM', location: 'Rajesh Kumar', status: 'upcoming', address: 'Delhi, India' },
              { time: '4:30 PM', location: 'Sarah Chen', status: 'upcoming', address: 'Dubai, UAE' },
            ].map((stop, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  stop.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {stop.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stop.time}</p>
                  <p className="text-sm text-gray-700">{stop.location}</p>
                  <p className="text-xs text-gray-400">{stop.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
