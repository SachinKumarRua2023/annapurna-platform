import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

export interface CartItem {
  id: number
  product: Product
  quantity: number
  subtotal: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
  addItem: (productId: number, quantity: number, product?: Product) => void
  fetchCart: () => void
  updateItem: (itemId: number, quantity: number) => void
  removeItem: (itemId: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const recalc = (items: CartItem[]) => ({
  total: items.reduce((s, i) => s + i.subtotal, 0),
  itemCount: items.reduce((s, i) => s + i.quantity, 0),
})

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isLoading: false,

      fetchCart: () => {
        // recalculate from persisted items on mount
        const items = get().items
        set(recalc(items))
      },

      addItem: (productId, quantity, product) => {
        const items = get().items
        const existing = items.find(i => i.product.id === productId)
        let updated: CartItem[]
        if (existing) {
          updated = items.map(i =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * Number(i.product.price) }
              : i
          )
        } else if (product) {
          const newItem: CartItem = {
            id: productId,
            product,
            quantity,
            subtotal: quantity * Number(product.price),
          }
          updated = [...items, newItem]
        } else {
          return
        }
        set({ items: updated, ...recalc(updated) })
      },

      updateItem: (itemId, quantity) => {
        if (quantity <= 0) { get().removeItem(itemId); return }
        const updated = get().items.map(i =>
          i.id === itemId
            ? { ...i, quantity, subtotal: quantity * Number(i.product.price) }
            : i
        )
        set({ items: updated, ...recalc(updated) })
      },

      removeItem: (itemId) => {
        const updated = get().items.filter(i => i.id !== itemId)
        set({ items: updated, ...recalc(updated) })
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),

      getTotalItems: () => get().itemCount,
      getTotalPrice: () => get().total,
    }),
    { name: 'annapurna-cart' }
  )
)