'use client'
// World-Class Homepage - Google CEO Level Design System
import { useState, useEffect, useMemo, Suspense, lazy } from 'react'
import { ShoppingCart, User, Search, Menu, X, Star, TrendingUp, Package, Sparkles, Shield, Truck, Heart, Globe } from 'lucide-react'
import ThreeHero from '@/components/ui/ThreeHero'
import ModernProductGrid from '@/components/ui/ModernProductGrid'
import Footer from '@/components/layout/Footer'
import { useAuthStore } from '@/store/authStore'

// Lazy load 3D Globe Animation with ships, planes, trucks
const GlobeAnimation = lazy(() => import('@/components/animations/GlobeAnimation'))

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  supplier: string
  stock: number
  is_featured: boolean
  rating?: number
  reviews?: number
  discount?: number
  badge?: string
}

export default function HomePage() {
  const { user } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3)

  // Memoized sample products with enhanced data
  const sampleProducts = useMemo(() => [
    {
      id: '1',
      name: 'Premium Basmati Rice - Himalayan Gold',
      price: 89.99,
      originalPrice: 119.99,
      description: 'Extra long grain aromatic basmati rice from the fertile Terai region. Aged to perfection for superior taste and texture.',
      category: 'Organic Grains',
      supplier: 'Himalayan Organic Farms',
      stock: 150,
      is_featured: true,
      rating: 4.8,
      reviews: 124,
      discount: 25,
      badge: 'Bestseller'
    },
    {
      id: '2',
      name: 'Wild Timur Pepper - Mountain Spice',
      price: 28.99,
      description: 'Himalayan Sichuan pepper with unique citrus flavor profile. Hand-picked from high-altitude regions.',
      category: 'Spices & Herbs',
      supplier: 'Kathmandu Spice Traders',
      stock: 75,
      is_featured: true,
      rating: 4.9,
      reviews: 89,
      badge: 'Organic'
    },
    {
      id: '3',
      name: 'Pure Himalayan Wild Honey',
      price: 38.99,
      description: 'Raw, unprocessed honey from high-altitude flowers. Rich in antioxidants and natural enzymes.',
      category: 'Honey & Sweeteners',
      supplier: 'Everest Honey Collective',
      stock: 35,
      is_featured: true,
      rating: 4.7,
      reviews: 156,
      badge: 'Limited'
    },
    {
      id: '4',
      name: 'Handwoven Pashmina Shawl',
      price: 125.99,
      description: 'Luxurious hand-woven pashmina shawl with traditional Himalayan patterns. Perfect for any occasion.',
      category: 'Handicrafts',
      supplier: 'Traditional Artisans Guild',
      stock: 20,
      is_featured: true,
      rating: 4.9,
      reviews: 67,
      badge: 'Premium'
    },
    {
      id: '5',
      name: 'Ilam Black Tea - First Flush',
      price: 25.99,
      description: 'Premium first flush black tea from the renowned Ilam tea gardens. Delicate flavor with floral notes.',
      category: 'Tea & Beverages',
      supplier: 'Valley Tea Estates',
      stock: 80,
      is_featured: true,
      rating: 4.6,
      reviews: 203,
      badge: 'New'
    },
    {
      id: '6',
      name: 'Organic Grass-Fed Ghee',
      price: 35.99,
      description: 'Pure clarified butter from grass-fed cows. Rich in vitamins and perfect for cooking.',
      category: 'Dairy Products',
      supplier: 'Mountain Dairy Co-op',
      stock: 60,
      is_featured: false,
      rating: 4.8,
      reviews: 92
    },
    {
      id: '7',
      name: 'Pure Shilajit Resin',
      price: 125.99,
      description: 'Authentic Himalayan shilajit resin. Sourced from high-altitude mountains for maximum potency.',
      category: 'Health & Wellness',
      supplier: 'Natural Wellness Nepal',
      stock: 20,
      is_featured: false,
      rating: 4.9,
      reviews: 45,
      badge: 'Rare'
    },
    {
      id: '8',
      name: 'Traditional Sel Roti Pack',
      price: 12.99,
      description: 'Authentic homemade sel roti sweet bread. Made with traditional recipes and love.',
      category: 'Snacks & Sweets',
      supplier: 'Mountain Sweet Makers',
      stock: 50,
      is_featured: false,
      rating: 4.5,
      reviews: 178
    }
  ], [])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(sampleProducts)
      setFeaturedProducts(sampleProducts.filter(p => p.is_featured))
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [sampleProducts])

  const handleGetStarted = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1)
    console.log('Adding to cart:', product.name)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-saffron-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 w-20 h-20 border-4 border-orange-500 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse' }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Amazing Products</h2>
          <p className="text-gray-600">Preparing your shopping experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-saffron-100">
      {/* World-Class Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl shadow-lg z-50 border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Premium Logo */}
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Annapurna</span>
                <p className="text-xs text-gray-500">Premium Quality</p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: '#products', label: 'Products', icon: <Package className="w-4 h-4" /> },
                { href: '#categories', label: 'Categories', icon: <Sparkles className="w-4 h-4" /> },
                { href: '#suppliers', label: 'Suppliers', icon: <Shield className="w-4 h-4" /> },
                { href: '#about', label: 'About', icon: <Heart className="w-4 h-4" /> }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:scale-105 group"
                >
                  <span className="group-hover:animate-bounce">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Enhanced Right Actions */}
            <div className="flex items-center gap-3">
              <button className="p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-110">
                <Search className="w-5 h-5" />
              </button>
              
              <button className="p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-110 relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {user ? (
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
                    <span className="text-white text-sm font-bold">
                      {user.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
              ) : (
                <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Original Hero Section with Floating 3D Shapes */}
      <ThreeHero
        title="Annapurna Platform"
        subtitle="Discover authentic Nepalese treasures from local farmers and artisans. Every product tells a story of tradition and quality."
        ctaText="Explore Collection"
        onCtaClick={handleGetStarted}
      />

      {/* Trust Indicators */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            {[
              { icon: <Shield className="w-5 h-5" />, text: '100% Authentic' },
              { icon: <Truck className="w-5 h-5" />, text: 'Free Shipping' },
              { icon: <Heart className="w-5 h-5" />, text: 'Quality Assured' },
              { icon: <Sparkles className="w-5 h-5" />, text: 'Premium Quality' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <span className="text-amber-600">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Join our growing community of satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Local Suppliers', icon: <Package className="w-8 h-8" />, color: 'from-blue-500 to-blue-600' },
              { number: '50+', label: 'Product Categories', icon: <Sparkles className="w-8 h-8" />, color: 'from-green-500 to-green-600' },
              { number: '10K+', label: 'Happy Customers', icon: <Heart className="w-8 h-8" />, color: 'from-purple-500 to-purple-600' },
              { number: '100%', label: 'Satisfaction', icon: <Shield className="w-8 h-8" />, color: 'from-orange-500 to-orange-600' },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products-section" className="py-16 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our finest products from trusted local suppliers
            </p>
          </div>
          
          <ModernProductGrid 
            products={featuredProducts} 
            title="Featured Products"
            showFilters={false}
          />
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of authentic Nepalese products
            </p>
          </div>
          
          <ModernProductGrid 
            products={products} 
            title="All Products"
            showFilters={true}
          />
        </div>
      </section>

      {/* Enhanced Categories */}
      <section id="categories" className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Organic Grains', icon: '🌾', count: 25, color: 'from-green-400 to-green-600' },
              { name: 'Spices & Herbs', icon: '🌿', count: 18, color: 'from-orange-400 to-orange-600' },
              { name: 'Dairy Products', icon: '🥛', count: 12, color: 'from-blue-400 to-blue-600' },
              { name: 'Honey & Sweeteners', icon: '🍯', count: 8, color: 'from-yellow-400 to-yellow-600' },
              { name: 'Tea & Beverages', icon: '🍵', count: 15, color: 'from-purple-400 to-purple-600' },
              { name: 'Handicrafts', icon: '🎨', count: 20, color: 'from-pink-400 to-pink-600' },
              { name: 'Health & Wellness', icon: '🌱', count: 10, color: 'from-indigo-400 to-indigo-600' },
              { name: 'Snacks & Sweets', icon: '🍪', count: 14, color: 'from-red-400 to-red-600' },
            ].map((category, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-xl blur-xl group-hover:opacity-30 transition-opacity" style={{ backgroundImage: `linear-gradient(to right, ${category.color.split(' ').join(', ')})` }} />
                <div className="relative bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count} products</p>
                  <div className={`mt-3 w-full h-1 bg-gradient-to-r ${category.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Earth Globe - Global Trade Network */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`earth-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Global Trade Network
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Worldwide Shipping & Logistics
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch our global trade routes in action. From ships crossing oceans to planes flying continents, 
              we connect Nepal to the world through sea, air, and land transport.
            </p>
            <div className="flex justify-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/50 px-4 py-2 rounded-full border border-cyan-800">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm">Ocean Freight (Ships)</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400 bg-orange-950/50 px-4 py-2 rounded-full border border-orange-800">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-sm">Air Cargo (Planes)</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 bg-green-950/50 px-4 py-2 rounded-full border border-green-800">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Land Transport (Trucks)</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-950/50 border border-slate-700">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading 3D Globe...</p>
                </div>
              </div>
            }>
              <GlobeAnimation />
            </Suspense>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: '150+', label: 'Countries Served', icon: Globe },
              { number: '50K+', label: 'Shipments/Year', icon: Truck },
              { number: '99.8%', label: 'On-Time Delivery', icon: Package },
              { number: '24/7', label: 'Global Tracking', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by 10,000+ businesses across 150+ countries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'Delhi Import Co.',
                location: 'Delhi, India',
                quote: 'Annapurna made importing from China seamless. Their verified suppliers and transparent pricing saved us 30% on procurement costs.',
                rating: 5
              },
              {
                name: 'Sarah Chen',
                company: 'Chen Trading LLC',
                location: 'Dubai, UAE',
                quote: 'The door-to-door service is incredible. From Yiwu pickup to Dubai delivery, everything was handled professionally.',
                rating: 5
              },
              {
                name: 'Michael Osei',
                company: 'Accra Wholesale',
                location: 'Ghana, Africa',
                quote: 'Best import-export partner we have worked with. Quality inspection before shipment gives us complete peace of mind.',
                rating: 5
              }
            ].map((client, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: client.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{client.quote}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.company}</div>
                  <div className="text-xs text-amber-600 mt-1">{client.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section - Redesigned with Professional UI */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        {/* Three.js Animated Border Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <iframe 
            src="data:text/html,<body style='margin:0;overflow:hidden;background:transparent;'><canvas id=c style='position:fixed;inset:0;'></canvas><script>const c=document.getElementById('c'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const p=[];for(let i=0;i<50;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*2,dx:(Math.random()-.5)*.5,dy:(Math.random()-.5)*.5});function a(){x.clearRect(0,0,c.width,c.height);x.strokeStyle='rgba(245,158,11,0.15)';x.lineWidth=1;for(let i=0;i<p.length;i++){const pi=p[i];for(let j=i+1;j<p.length;j++){const pj=p[j],d=Math.hypot(pi.x-pj.x,pi.y-pj.y);if(d<150){x.beginPath();x.moveTo(pi.x,pi.y);x.lineTo(pj.x,pj.y);x.stroke()}}pi.x+=pi.dx;pi.y+=pi.dy;if(pi.x<0||pi.x>c.width)pi.dx*=-1;if(pi.y<0||pi.y>c.height)pi.dy*=-1;x.fillStyle='rgba(245,158,11,0.6)';x.beginPath();x.arc(pi.x,pi.y,pi.r,0,7);x.fill()}}setInterval(a,30)</script></body>"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
        
        {/* Top gradient border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">Leading Global Trade</span>
              </div>
              
              {/* Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Meet Our
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                  Director
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Under the visionary leadership of <span className="text-amber-400 font-semibold">Vipin Tripathi</span>, 
                Yiwu Annapurna Imports and Exports Co. Ltd. has established itself as a trusted name in international trade, 
                connecting businesses across China, India, and 150+ countries worldwide.
              </p>
              
              {/* Stats - Redesigned */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '15+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
                  { number: '150+', label: 'Countries Served', color: 'from-amber-500 to-orange-500' },
                  { number: '50K+', label: 'Products Shipped', color: 'from-emerald-500 to-teal-500' },
                ].map((stat, i) => (
                  <div key={i} className="relative group">
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
                    {/* Glow effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 blur-xl`} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Image with animated border */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Animated rotating border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl animate-spin-slow opacity-75 blur-sm" 
                     style={{ animationDuration: '8s' }} />
                
                {/* Secondary rotating border (opposite direction) */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl animate-spin-slow opacity-50 blur-md" 
                     style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                
                {/* Image container */}
                <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
                  <img 
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=877,fit=crop/ALpP4OZwJvU6P404/whatsapp-image-2025-09-04-at-12-09-30-picsart-aiimageenhancer-AVLxL5jbvJfV4lVw.jpeg"
                    alt="Vipin Tripathi - Director"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Name badge - floating */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-amber-500/30 px-8 py-4 rounded-xl shadow-2xl shadow-amber-500/10">
                  <p className="text-xl font-bold text-white text-center">Vipin Tripathi</p>
                  <p className="text-amber-400 text-sm font-medium text-center">Director & CEO</p>
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500 rounded-tr-lg" />
                <div className="absolute -bottom-10 -left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500 rounded-bl-lg" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </section>

      {/* Technology Partner Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-4">Technology Partner</p>
          <a 
            href="https://services.seekhowithrua.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-gray-800 hover:text-amber-600 transition-colors"
          >
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold">SeekHowItRua Services</div>
              <div className="text-sm text-gray-500">Digital Solutions Provider (India)</div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
