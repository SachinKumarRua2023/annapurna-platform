'use client'
// src/app/(store)/products/page.tsx
export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'
import api from '@/lib/api'
import type { Product } from '@/types'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'

const SORT_OPTIONS = [
  { value: '-created_at', label: 'Newest First' },
  { value: 'price',       label: 'Price: Low to High' },
  { value: '-price',      label: 'Price: High to Low' },
  { value: 'name',        label: 'Name A–Z' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts]     = useState<Product[]>([])
  const [loading, setLoading]       = useState(true)
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useState({
    search:   searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    min_price: '',
    max_price: '',
    in_stock:  false,
    ordering:  '-created_at',
  })

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = {
        page: String(page),
        ordering: filters.ordering,
      }
      if (filters.search)    params.search    = filters.search
      if (filters.category)  params.category  = filters.category
      if (filters.min_price) params.min_price = filters.min_price
      if (filters.max_price) params.max_price = filters.max_price
      if (filters.in_stock)  params.in_stock  = 'true'

      const { data } = await api.get('/api/products/', { params })
      setProducts(data.results || data)
      setTotal(data.count || (data.results || data).length)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Sync URL search param
  useEffect(() => {
    const s = searchParams.get('search')
    const c = searchParams.get('category')
    if (s || c) setFilters(f => ({ ...f, search: s || f.search, category: c || f.category }))
  }, [searchParams])

  const clearFilters = () => {
    setFilters({ search: '', category: '', min_price: '', max_price: '', in_stock: false, ordering: '-created_at' })
    setPage(1)
  }

  const hasFilters = filters.search || filters.category || filters.min_price || filters.max_price || filters.in_stock

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">
              {filters.search ? `Results for "${filters.search}"` : filters.category ? filters.category.replace(/-/g, ' ') : 'All Products'}
            </h1>
            {!loading && <p className="text-stone-500 text-sm mt-0.5">{total} products found</p>}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={filters.ordering}
                onChange={e => setFilters(f => ({ ...f, ordering: e.target.value }))}
                className="appearance-none input py-2 pr-8 text-sm cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                filtersOpen ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5 block">Search</label>
              <input type="text" value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                className="input text-sm py-2" placeholder="Product name..." />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5 block">Min Price (₹)</label>
              <input type="number" value={filters.min_price} onChange={e => setFilters(f => ({ ...f, min_price: e.target.value }))}
                className="input text-sm py-2" placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5 block">Max Price (₹)</label>
              <input type="number" value={filters.max_price} onChange={e => setFilters(f => ({ ...f, max_price: e.target.value }))}
                className="input text-sm py-2" placeholder="10000" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={filters.in_stock} onChange={e => setFilters(f => ({ ...f, in_stock: e.target.checked }))}
                  className="w-4 h-4 accent-amber-600 rounded" />
                <span className="text-sm font-medium text-stone-700">In stock only</span>
              </label>
            </div>

            {hasFilters && (
              <div className="col-span-full flex justify-end">
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" /> Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton aspect-square" />
                <div className="p-3 space-y-2">
                  <div className="skeleton h-3 w-3/4 rounded" />
                  <div className="skeleton h-4 rounded" />
                  <div className="skeleton h-4 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            {/* Pagination */}
            {total > 20 && (
              <div className="flex justify-center gap-2 mt-10">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="btn-outline px-4 py-2 text-sm disabled:opacity-40">← Prev</button>
                <span className="px-4 py-2 text-sm text-stone-500">Page {page} of {Math.ceil(total / 20)}</span>
                <button disabled={page >= Math.ceil(total / 20)} onClick={() => setPage(p => p + 1)}
                  className="btn-outline px-4 py-2 text-sm disabled:opacity-40">Next →</button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">No products found</h3>
            <p className="text-stone-500 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
