// src/types/index.ts

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_price: number | null
  discount_percent: number
  primary_image: string | null
  category_name: string
  avg_rating: number
  stock: number
  is_featured: boolean
  is_bestseller: boolean
  unit: string
  description?: string
  short_desc?: string
  images?: ProductImage[]
  reviews?: Review[]
  review_count?: number
  tags?: string[]
}

export interface ProductImage {
  id: string
  image: string
  alt_text: string
  is_primary: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string | null
  children: Category[]
}

export interface Review {
  id: string
  user_name: string
  user_avatar: string | null
  rating: number
  title: string
  body: string
  is_verified: boolean
  created_at: string
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  full_name: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  pincode: string
  country: string
  is_default: boolean
}

export interface Order {
  id: string
  order_number: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping_charge: number
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: 'cod' | 'online' | 'upi'
  shipping_name: string
  shipping_city: string
  shipping_state: string
  created_at: string
}

export interface OrderItem {
  id: string
  product: string
  product_name: string
  product_sku: string
  unit_price: number
  quantity: number
  total: number
}
