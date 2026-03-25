// src/store/cartStore.ts
import { create } from 'zustand'
import api from '@/lib/api'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    compare_price: number | null
    primary_image: string | null
    unit: string
    stock: number
  }
  quantity: number
  subtotal: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean

  fetchCart: () => Promise<void>
  addItem: (productId: string, quantity?: number) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,

  fetchCart: async () => {
    try {
      set({ isLoading: true })
      const { data } = await api.get('/api/orders/cart/')
      set({ items: data.items, total: data.total, itemCount: data.item_count })
    } catch {
      // User not logged in — cart stays empty
    } finally {
      set({ isLoading: false })
    }
  },

  addItem: async (productId, quantity = 1) => {
    try {
      const { data } = await api.post('/api/orders/cart/items/', { product_id: productId, quantity })
      set({ items: data.items, total: data.total, itemCount: data.item_count })
      toast.success('Added to cart!')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to add item')
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      const { data } = await api.patch(`/api/orders/cart/items/${itemId}/`, { quantity })
      set({ items: data.items, total: data.total, itemCount: data.item_count })
    } catch {
      toast.error('Failed to update cart')
    }
  },

  removeItem: async (itemId) => {
    try {
      const { data } = await api.delete(`/api/orders/cart/items/${itemId}/`)
      set({ items: data.items, total: data.total, itemCount: data.item_count })
      toast.success('Removed from cart')
    } catch {
      toast.error('Failed to remove item')
    }
  },

  clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
}))
