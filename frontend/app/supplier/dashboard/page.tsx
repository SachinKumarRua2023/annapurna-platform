'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon,
  DollarSign,
  Box,
  TrendingUp,
  ShoppingCart,
  LogOut,
  User,
  Store
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image?: string
  status: 'active' | 'draft' | 'out_of_stock'
}

export default function SupplierDashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'products' | 'add' | 'orders' | 'analytics'>('products')
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Organic Rice', description: 'Premium basmati rice', price: 45, stock: 100, category: 'Grains', status: 'active' },
    { id: '2', name: 'Spice Mix', description: 'Authentic Indian spices', price: 25, stock: 50, category: 'Spices', status: 'active' },
  ])

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null as File | null
  })

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
      status: 'active'
    }
    setProducts([...products, product])
    setNewProduct({ name: '', description: '', price: '', stock: '', category: '', image: null })
    toast.success('Product added successfully!')
    setActiveTab('products')
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
    toast.success('Product deleted')
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: 24, icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Revenue', value: '$12,450', icon: DollarSign, color: 'bg-amber-500' },
    { label: 'Stock Value', value: products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString(), icon: Box, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Supplier Dashboard</h1>
                <p className="text-xs text-gray-500">{user?.full_name || 'Your Business'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.full_name || 'Supplier'}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b">
            {[
              { id: 'products', label: 'My Products', icon: Package },
              { id: 'add', label: 'Add Product', icon: Plus },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Products</h2>
                  <button 
                    onClick={() => setActiveTab('add')}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stock</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">${product.price}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{product.stock}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.status === 'active' ? 'bg-green-100 text-green-700' :
                              product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add Product Tab */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddProduct} className="max-w-2xl">
                <h2 className="text-lg font-semibold mb-6">Add New Product</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      rows={3}
                      placeholder="Describe your product"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newProduct.stock}
                        onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      required
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="">Select category</option>
                      <option value="Grains">Grains & Rice</option>
                      <option value="Spices">Spices</option>
                      <option value="Handicrafts">Handicrafts</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Tea">Tea & Beverages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors cursor-pointer">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                      Publish Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('products')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {[
                    { id: '#ORD001', customer: 'Rajesh Kumar', product: 'Organic Rice', qty: 50, total: 2250, status: 'pending' },
                    { id: '#ORD002', customer: 'Sarah Chen', product: 'Spice Mix', qty: 20, total: 500, status: 'shipped' },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Product</p>
                        <p className="font-medium text-gray-900">{order.product}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Qty</p>
                        <p className="font-medium text-gray-900">{order.qty}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium text-gray-900">${order.total}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        order.status === 'shipped' ? 'bg-green-100 text-green-700' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Sales Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-8 h-8" />
                      <div>
                        <p className="text-amber-100 text-sm">Monthly Revenue</p>
                        <p className="text-3xl font-bold">$12,450</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-amber-100">
                      <span className="text-green-300">+15%</span>
                      <span>from last month</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Top Products</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Organic Rice', sales: 245 },
                        { name: 'Spice Mix', sales: 189 },
                        { name: 'Handicrafts', sales: 156 },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-gray-700">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-amber-500 rounded-full" 
                                style={{ width: `${(item.sales / 245) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500">{item.sales}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
