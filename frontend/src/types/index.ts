// World-Class Type Definitions

export interface ProductImage {
  id: number
  image: string
  alt_text?: string
}

export interface ProductReview {
  id: number
  user_name: string
  rating: number
  title?: string
  body: string
  is_verified?: boolean
}

export interface Product {
  id: number
  slug: string
  name: string
  description?: string
  short_desc?: string
  price: string | number
  compare_price?: string | number
  unit: string
  stock: number
  discount_percent: number
  avg_rating: number
  review_count: number
  category_name?: string
  primary_image?: string
  images?: ProductImage[]
  reviews?: ProductReview[]
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  email: string
  full_name: string
  picture?: string
  verified?: boolean
  created_at?: string
}

export interface Category {
  id: string
  name: string
  description?: string
  product_count: number
  icon?: string
  image?: string
}

export interface Supplier {
  id: string
  name: string
  description?: string
  location?: string
  rating?: number
  product_count: number
  verified?: boolean
  image?: string
}

export interface Order {
  id: string
  items: { id: number; product: Product; quantity: number; subtotal: number }[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address?: Address
  payment_method?: string
  created_at: string
  updated_at?: string
}

export interface Address {
  id: string
  street: string
  city: string
  state?: string
  postal_code: string
  country: string
  is_default?: boolean
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  updated_at?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next?: string
  previous?: string
  page_size: number
  current_page: number
  total_pages: number
}

export interface FilterOptions {
  category?: string
  price_min?: number
  price_max?: number
  rating?: number
  supplier?: string
  sort_by?: string
  search?: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  verified: boolean
}

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
  showSupplier?: boolean
  showRating?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
  onClose?: () => void
}

export interface SearchSuggestion {
  id: string
  text: string
  type: 'product' | 'category' | 'supplier'
  url: string
}

export interface WishlistItem {
  id: string
  product: Product
  added_at: string
}

export interface RecentlyViewed {
  id: string
  product: Product
  viewed_at: string
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
}

export interface BreadcrumbItem {
  name: string
  url?: string
}

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: number
}

export interface UserBehavior {
  page_views: number
  time_spent: number
  products_viewed: string[]
  search_queries: string[]
  cart_additions: string[]
}