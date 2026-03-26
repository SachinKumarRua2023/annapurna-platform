'use client'
// World-Class Homepage - Redesigned Premium UI
import { useState, useEffect, useMemo, Suspense, lazy } from 'react'
import { ShoppingCart, User, Search, Menu, X, Star, TrendingUp, Package, Sparkles, Shield, Truck, Heart, Globe, ArrowRight, MapPin, Phone, Mail, ExternalLink, ChevronRight } from 'lucide-react'
import ThreeHero from '@/components/ui/ThreeHero'
import ModernProductGrid from '@/components/ui/ModernProductGrid'
import Footer from '@/components/layout/Footer'
import { useAuthStore } from '@/store/authStore'

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

// ── Inline styles injected once ──────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --gold:   #C9A84C;
    --gold2:  #E8C96A;
    --ink:    #0D0D0D;
    --ash:    #F5F3EE;
    --mist:   #EAE7DF;
    --clay:   #B5703A;
    --ocean:  #1A3A5C;
    --sage:   #3D5A47;
    --cream:  #FBF8F2;
    --border: rgba(201,168,76,0.2);
  }

  * { box-sizing: border-box; }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); }

  .font-display { font-family: 'Playfair Display', Georgia, serif; }

  /* ── Nav ── */
  .nav-wrap {
    position: fixed; top: 0; width: 100%; z-index: 100;
    background: rgba(251,248,242,0.92);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }

  /* ── Shimmer badge ── */
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .badge-shimmer {
    background: linear-gradient(90deg, var(--gold) 25%, var(--gold2) 50%, var(--gold) 75%);
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Stat counter ── */
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .stat-animate { animation: countUp 0.6s ease forwards; }

  /* ── Card hover lift ── */
  .card-lift {
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
  }
  .card-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(13,13,13,0.12);
  }

  /* ── Category card ── */
  .cat-card {
    position: relative; overflow: hidden;
    background: white; border-radius: 20px;
    border: 1px solid var(--mist);
    transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    cursor: pointer;
  }
  .cat-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold) 0%, var(--clay) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .cat-card:hover::before { opacity: 0.06; }
  .cat-card:hover { transform: translateY(-6px); border-color: var(--gold); }
  .cat-card .cat-line {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--clay));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .cat-card:hover .cat-line { transform: scaleX(1); }

  /* ── Testimonial card ── */
  .testi-card {
    background: white;
    border: 1px solid var(--mist);
    border-radius: 24px;
    padding: 36px;
    transition: all 0.35s ease;
    position: relative; overflow: hidden;
  }
  .testi-card::after {
    content: '"';
    position: absolute; top: -10px; right: 24px;
    font-family: 'Playfair Display', serif;
    font-size: 120px; line-height: 1;
    color: var(--gold); opacity: 0.07;
    pointer-events: none;
  }
  .testi-card:hover { border-color: var(--gold); box-shadow: 0 20px 50px rgba(201,168,76,0.1); }

  /* ── Director card ── */
  .director-img-wrap {
    position: relative;
    width: 340px; height: 440px;
  }
  .director-img-wrap img {
    width: 100%; height: 100%; object-fit: cover; object-position: top;
    border-radius: 24px; display: block;
  }
  .director-ring {
    position: absolute; inset: -8px;
    border-radius: 32px;
    background: conic-gradient(from 0deg, var(--gold), var(--clay), var(--gold2), var(--gold));
    z-index: -1;
    animation: spin 8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .director-badge {
    position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
    background: white; border: 1px solid var(--border);
    border-radius: 16px; padding: 14px 28px;
    text-align: center; white-space: nowrap;
    box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  }

  /* ── Footer ── */
  .footer-wrap {
    background: var(--ink);
    color: rgba(255,255,255,0.7);
  }
  .footer-link {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: 14px;
  }
  .footer-link:hover { color: var(--gold2); }

  /* ── Section divider ── */
  .divider-gold {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.4;
  }

  /* ── Globe section ── */
  .globe-section {
    background: radial-gradient(ellipse at 50% 0%, #0f2034 0%, #060e18 60%);
  }

  /* ── Nav link ── */
  .nav-link {
    font-size: 14px; font-weight: 500; color: #444;
    text-decoration: none; letter-spacing: 0.01em;
    transition: color 0.2s ease;
    position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 1.5px;
    background: var(--gold); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .nav-link:hover { color: var(--gold); }
  .nav-link:hover::after { transform: scaleX(1); }

  /* ── CTA button ── */
  .btn-gold {
    background: linear-gradient(135deg, var(--gold) 0%, var(--clay) 100%);
    color: white; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 600;
    border-radius: 12px; padding: 13px 28px;
    transition: all 0.3s ease;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201,168,76,0.4);
    filter: brightness(1.05);
  }

  .btn-ghost {
    background: transparent;
    border: 1.5px solid var(--border);
    color: #444; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    border-radius: 12px; padding: 12px 24px;
    transition: all 0.3s ease;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.04); }

  /* ── Trust bar ── */
  .trust-bar {
    background: white;
    border-bottom: 1px solid var(--mist);
    padding: 14px 0;
  }
  .trust-item {
    display: flex; align-items: center; gap: 10px;
    color: #555; font-size: 13px; font-weight: 500;
  }
  .trust-icon-wrap {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, rgba(201,168,76,0.12), rgba(181,112,58,0.08));
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* ── Section labels ── */
  .section-label {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 100px;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.25);
    color: var(--clay);
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 16px;
  }

  /* ── Stat card ── */
  .stat-card {
    background: white; border: 1px solid var(--mist);
    border-radius: 20px; padding: 28px 24px;
    text-align: center;
    transition: all 0.35s ease;
  }
  .stat-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(201,168,76,0.1); }

  /* ── Products section ── */
  .products-section { background: var(--ash); }

  /* ── Scroll fade in ── */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeInUp 0.7s ease both; }
  .fade-in-d1 { animation-delay: 0.1s; }
  .fade-in-d2 { animation-delay: 0.2s; }
  .fade-in-d3 { animation-delay: 0.3s; }
  .fade-in-d4 { animation-delay: 0.4s; }

  /* ── Mobile menu ── */
  .mobile-menu {
    background: white;
    border-top: 1px solid var(--mist);
    padding: 16px 0 24px;
  }
  .mobile-nav-link {
    display: block; padding: 12px 24px;
    color: #333; font-weight: 500; text-decoration: none;
    transition: background 0.2s; border-radius: 0;
  }
  .mobile-nav-link:hover { background: var(--ash); color: var(--gold); }

  /* ── Pulse dot ── */
  @keyframes pulseDot { 0%,100% { transform: scale(1); opacity:1; } 50% { transform: scale(1.4); opacity:0.6; } }
  .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
`

export default function HomePage() {
  const { user } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3)

  const sampleProducts = useMemo(() => [
    {
      id: '1', name: 'Premium Basmati Rice - Himalayan Gold', price: 89.99,
      originalPrice: 119.99, description: 'Extra long grain aromatic basmati rice from the fertile Terai region. Aged to perfection for superior taste and texture.',
      category: 'Organic Grains', supplier: 'Himalayan Organic Farms', stock: 150,
      is_featured: true, rating: 4.8, reviews: 124, discount: 25, badge: 'Bestseller'
    },
    {
      id: '2', name: 'Wild Timur Pepper - Mountain Spice', price: 28.99,
      description: 'Himalayan Sichuan pepper with unique citrus flavor profile. Hand-picked from high-altitude regions.',
      category: 'Spices & Herbs', supplier: 'Kathmandu Spice Traders', stock: 75,
      is_featured: true, rating: 4.9, reviews: 89, badge: 'Organic'
    },
    {
      id: '3', name: 'Pure Himalayan Wild Honey', price: 38.99,
      description: 'Raw, unprocessed honey from high-altitude flowers. Rich in antioxidants and natural enzymes.',
      category: 'Honey & Sweeteners', supplier: 'Everest Honey Collective', stock: 35,
      is_featured: true, rating: 4.7, reviews: 156, badge: 'Limited'
    },
    {
      id: '4', name: 'Handwoven Pashmina Shawl', price: 125.99,
      description: 'Luxurious hand-woven pashmina shawl with traditional Himalayan patterns. Perfect for any occasion.',
      category: 'Handicrafts', supplier: 'Traditional Artisans Guild', stock: 20,
      is_featured: true, rating: 4.9, reviews: 67, badge: 'Premium'
    },
    {
      id: '5', name: 'Ilam Black Tea - First Flush', price: 25.99,
      description: 'Premium first flush black tea from the renowned Ilam tea gardens. Delicate flavor with floral notes.',
      category: 'Tea & Beverages', supplier: 'Valley Tea Estates', stock: 80,
      is_featured: true, rating: 4.6, reviews: 203, badge: 'New'
    },
    {
      id: '6', name: 'Organic Grass-Fed Ghee', price: 35.99,
      description: 'Pure clarified butter from grass-fed cows. Rich in vitamins and perfect for cooking.',
      category: 'Dairy Products', supplier: 'Mountain Dairy Co-op', stock: 60,
      is_featured: false, rating: 4.8, reviews: 92
    },
    {
      id: '7', name: 'Pure Shilajit Resin', price: 125.99,
      description: 'Authentic Himalayan shilajit resin. Sourced from high-altitude mountains for maximum potency.',
      category: 'Health & Wellness', supplier: 'Natural Wellness Nepal', stock: 20,
      is_featured: false, rating: 4.9, reviews: 45, badge: 'Rare'
    },
    {
      id: '8', name: 'Traditional Sel Roti Pack', price: 12.99,
      description: 'Authentic homemade sel roti sweet bread. Made with traditional recipes and love.',
      category: 'Snacks & Sweets', supplier: 'Mountain Sweet Makers', stock: 50,
      is_featured: false, rating: 4.5, reviews: 178
    }
  ], [])

  useEffect(() => {
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
      <>
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
        <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 24px' }}>
              <div style={{
                position: 'absolute', inset: 0, border: '3px solid var(--gold)', borderTopColor: 'transparent',
                borderRadius: '50%', animation: 'spin 1s linear infinite'
              }} />
              <div style={{
                position: 'absolute', inset: 8, border: '2px solid var(--clay)', borderBottomColor: 'transparent',
                borderRadius: '50%', animation: 'spin 0.7s linear infinite reverse'
              }} />
            </div>
            <p className="font-display" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 8 }}>Loading Amazing Products</p>
            <p style={{ color: '#888', fontSize: 14 }}>Preparing your experience…</p>
          </div>
        </div>
      </>
    )
  }

  const navLinks = [
    { href: '#products', label: 'Products' },
    { href: '#categories', label: 'Categories' },
    { href: '#suppliers', label: 'Suppliers' },
    { href: '#about', label: 'About' },
  ]

  const trustItems = [
    { icon: <Shield size={16} color="var(--gold)" />, label: '100% Authentic Products' },
    { icon: <Truck size={16} color="var(--gold)" />, label: 'Free Shipping on ₹999+' },
    { icon: <Star size={16} color="var(--gold)" />, label: 'Quality Guaranteed' },
    { icon: <Globe size={16} color="var(--gold)" />, label: 'Worldwide Delivery' },
  ]

  const stats = [
    { number: '500+', label: 'Local Suppliers', sub: 'verified & trusted' },
    { number: '50+', label: 'Product Categories', sub: 'curated selection' },
    { number: '10K+', label: 'Happy Customers', sub: 'across 150+ countries' },
    { number: '100%', label: 'Satisfaction Rate', sub: 'quality promise' },
  ]

  const categories = [
    { name: 'Organic Grains', icon: '🌾', count: 25, accent: '#3D5A47' },
    { name: 'Spices & Herbs', icon: '🌿', count: 18, accent: '#B5703A' },
    { name: 'Dairy Products', icon: '🥛', count: 12, accent: '#1A3A5C' },
    { name: 'Honey & Sweets', icon: '🍯', count: 8,  accent: '#C9A84C' },
    { name: 'Tea & Beverages', icon: '🍵', count: 15, accent: '#4A3728' },
    { name: 'Handicrafts',     icon: '🎨', count: 20, accent: '#7B4F9E' },
    { name: 'Health & Wellness', icon: '🌱', count: 10, accent: '#2D6A4F' },
    { name: 'Snacks & Sweets',   icon: '🍪', count: 14, accent: '#C1440E' },
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar', company: 'Delhi Import Co.', location: 'Delhi, India',
      quote: 'Annapurna made importing from China seamless. Their verified suppliers and transparent pricing saved us 30% on procurement costs.',
      rating: 5
    },
    {
      name: 'Sarah Chen', company: 'Chen Trading LLC', location: 'Dubai, UAE',
      quote: 'The door-to-door service is incredible. From Yiwu pickup to Dubai delivery, everything was handled professionally.',
      rating: 5
    },
    {
      name: 'Michael Osei', company: 'Accra Wholesale', location: 'Ghana, Africa',
      quote: 'Best import-export partner we have worked with. Quality inspection before shipment gives us complete peace of mind.',
      rating: 5
    },
  ]

  const footerLinks = {
    company:   [{ label: 'About Us', href: '/about' }, { label: 'Our Services', href: '/services' }, { label: 'How It Works', href: '/how-it-works' }, { label: 'Contact', href: '/contact' }],
    resources: [{ label: 'Product Catalog', href: '/products' }, { label: 'Shipping Rates', href: '/shipping' }, { label: 'Customs Guide', href: '/customs-guide' }, { label: 'FAQ', href: '/faq' }],
    legal:     [{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }, { label: 'Refund Policy', href: '/refund' }, { label: 'IEC Certificate', href: '/iec' }],
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <header className="nav-wrap">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

            {/* Logo */}
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--clay) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
                flexShrink: 0,
              }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'Playfair Display, serif' }}>A</span>
              </div>
              <div>
                <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>Annapurna</div>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Premium Quality</div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
              {navLinks.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{ padding: '10px', borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', color: '#555', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--ash)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <Search size={18} />
              </button>

              <button style={{ padding: '10px', borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', color: '#555', position: 'relative' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--ash)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold), var(--clay))',
                    color: 'white', fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid var(--cream)',
                  }}>{cartCount}</span>
                )}
              </button>

              {user ? (
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--gold), var(--clay))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'white', fontWeight: 700, fontSize: 16,
                }}>
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <button className="btn-gold" style={{ fontSize: 13, padding: '10px 20px' }}>
                  <User size={14} /> Sign In
                </button>
              )}

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ padding: 10, borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', color: '#555' }}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO (unchanged) ───────────────────────────────── */}
      <ThreeHero
        title="Annapurna Platform"
        subtitle="Discover authentic Nepalese treasures from local farmers and artisans. Every product tells a story of tradition and quality."
        ctaText="Explore Collection"
        onCtaClick={handleGetStarted}
      />

      {/* ── TRUST BAR ──────────────────────────────────────── */}
      <div className="trust-bar">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32 }}>
          {trustItems.map((t, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon-wrap">{t.icon}</div>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><Sparkles size={12} /> Trusted Worldwide</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
              Numbers That Speak
            </h2>
            <p style={{ color: '#666', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
              Join our growing community of satisfied customers across the globe
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {stats.map((s, i) => (
              <div key={i} className={`stat-card card-lift fade-in fade-in-d${i + 1}`}>
                <div className="badge-shimmer font-display" style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>{s.number}</div>
                <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 16, marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: '#999', fontSize: 13 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* ── FEATURED PRODUCTS ──────────────────────────────── */}
      <section id="products-section" className="products-section" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label"><Star size={12} /> Hand-picked</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Featured Products
              </h2>
            </div>
            <a href="/products" className="btn-ghost" style={{ fontSize: 13 }}>
              View All <ChevronRight size={14} />
            </a>
          </div>
          <ModernProductGrid products={featuredProducts} title="Featured Products" showFilters={false} />
        </div>
      </section>

      {/* ── ALL PRODUCTS ───────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label"><Package size={12} /> Full Range</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'var(--ink)' }}>
              Complete Collection
            </h2>
            <p style={{ color: '#666', fontSize: 16, marginTop: 12 }}>Browse our full range of authentic Nepalese products</p>
          </div>
          <ModernProductGrid products={products} title="All Products" showFilters={true} />
        </div>
      </section>

      <div className="divider-gold" />

      {/* ── CATEGORIES ─────────────────────────────────────── */}
      <section id="categories" style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label"><Sparkles size={12} /> Browse by Type</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'var(--ink)' }}>
              Shop by Category
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {categories.map((c, i) => (
              <div key={i} className="cat-card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 44, marginBottom: 16, display: 'block' }}>{c.icon}</div>
                <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 15, marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{c.count} products</div>
                <div className="cat-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBE SECTION ──────────────────────────────────── */}
      <section className="globe-section" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', color: '#E8C96A', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              <Globe size={12} /> Global Trade Network
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Worldwide Shipping & Logistics
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, maxWidth: 560, margin: '0 auto 32px' }}>
              Watch our global trade routes in real time — ships, planes, and trucks connecting Nepal to the world.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              {[
                { dot: '#22D3EE', label: 'Ocean Freight', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)' },
                { dot: '#FB923C', label: 'Air Cargo',     bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)' },
                { dot: '#4ADE80', label: 'Land Transport', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 100, background: r.bg, border: `1px solid ${r.border}`, color: r.dot, fontSize: 13, fontWeight: 500 }}>
                  <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot }} />
                  {r.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: 24, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', height: 560 }}>
            <Suspense fallback={
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <div style={{ width: 48, height: 48, border: '3px solid var(--gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                  Loading 3D Globe…
                </div>
              </div>
            }>
              <GlobeAnimation />
            </Suspense>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 32 }}>
            {[
              { number: '150+', label: 'Countries Served', Icon: Globe },
              { number: '50K+', label: 'Shipments/Year',   Icon: Truck },
              { number: '99.8%', label: 'On-Time Delivery', Icon: Package },
              { number: '24/7',  label: 'Global Tracking',  Icon: Shield },
            ].map(({ number, label, Icon }, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
                <Icon size={24} color="var(--gold)" style={{ margin: '0 auto 12px', display: 'block' }} />
                <div className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'white', lineHeight: 1, marginBottom: 6 }}>{number}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--ash)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><Heart size={12} /> Client Stories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'var(--ink)' }}>
              What Our Clients Say
            </h2>
            <p style={{ color: '#666', fontSize: 16, marginTop: 12 }}>Trusted by 10,000+ businesses across 150+ countries</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card">
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <p style={{ color: '#444', lineHeight: 1.75, fontSize: 15, marginBottom: 24, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ borderTop: '1px solid var(--mist)', paddingTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--gold), var(--clay))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 18,
                    fontFamily: 'Playfair Display, serif',
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: '#888' }}>{t.company}</div>
                    <div style={{ fontSize: 12, color: 'var(--gold)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={11} /> {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECTOR SECTION ───────────────────────────────── */}
      <section id="about" style={{ padding: '100px 24px', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(181,112,58,0.05) 0%, transparent 60%)',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'center' }}>

            {/* Left — text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold2)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
                Visionary Leadership
              </div>

              <h2 className="font-display" style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 24 }}>
                Meet Our<br />
                <span style={{ color: 'var(--gold2)' }}>Director</span>
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.8, marginBottom: 40, maxWidth: 480 }}>
                Under the visionary leadership of{' '}
                <span style={{ color: 'var(--gold2)', fontWeight: 600 }}>Vipin Tripathi</span>,
                Yiwu Annapurna Imports and Exports Co. Ltd. has established itself as a trusted name
                in international trade, connecting businesses across China, India, and 150+ countries.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 40 }}>
                {[
                  { n: '15+',  l: 'Years Experience' },
                  { n: '150+', l: 'Countries Served' },
                  { n: '50K+', l: 'Products Shipped' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-display badge-shimmer" style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <a href="/contact" className="btn-gold">
                Get in Touch <ArrowRight size={16} />
              </a>
            </div>

            {/* Right — portrait */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', paddingBottom: 40 }}>
                {/* Rotating ring */}
                <div className="director-ring" />

                {/* Image */}
                <div style={{ width: 320, height: 420, borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=877,fit=crop/ALpP4OZwJvU6P404/whatsapp-image-2025-09-04-at-12-09-30-picsart-aiimageenhancer-AVLxL5jbvJfV4lVw.jpeg"
                    alt="Vipin Tripathi - Director & CEO"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                  />
                  {/* Bottom gradient */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 100%)' }} />
                </div>

                {/* Name badge */}
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: 16, padding: '16px 32px', textAlign: 'center', whiteSpace: 'nowrap',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
                }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 17, fontFamily: 'Playfair Display, serif' }}>Vipin Tripathi</div>
                  <div style={{ color: 'var(--gold2)', fontSize: 13, fontWeight: 500, marginTop: 2 }}>Director & CEO</div>
                </div>

                {/* Corner accents */}
                <div style={{ position: 'absolute', top: -8, right: -8, width: 28, height: 28, borderTop: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', borderRadius: '0 8px 0 0' }} />
                <div style={{ position: 'absolute', top: -8, left: -8, width: 28, height: 28, borderTop: '2px solid rgba(201,168,76,0.4)', borderLeft: '2px solid rgba(201,168,76,0.4)', borderRadius: '8px 0 0 0' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="footer-wrap">
        {/* Main footer */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>

            {/* Brand column */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: 'linear-gradient(135deg, var(--gold), var(--clay))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'Playfair Display, serif' }}>A</span>
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>Annapurna</div>
                  <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>World Trade</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 24, maxWidth: 260, color: 'rgba(255,255,255,0.45)' }}>
                Your trusted partner for China–India and global trade. Verified suppliers, transparent pricing, door-to-door delivery.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: <Phone size={13} />, text: '+91 9407574288',                    href: 'tel:+919407574288' },
                  { icon: <Phone size={13} />, text: '+86 18321553540 (China)',            href: 'tel:+8618321553540' },
                  { icon: <Mail size={13} />,  text: 'contact@annapurnaworldtrade.com',   href: 'mailto:contact@annapurnaworldtrade.com' },
                  { icon: <MapPin size={13} />, text: 'Yiwu, China · India Operations',   href: '#' },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--gold)', opacity: 0.7, flexShrink: 0 }}>{c.icon}</span>
                    {c.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { heading: 'Company',   links: footerLinks.company },
              { heading: 'Resources', links: footerLinks.resources },
              { heading: 'Legal',     links: footerLinks.legal },
            ].map((col, ci) => (
              <div key={ci}>
                <div style={{ color: 'white', fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20 }}>{col.heading}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map((l, li) => (
                    <a key={li} href={l.href} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ChevronRight size={12} style={{ opacity: 0.4, flexShrink: 0 }} />
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social + tech partner */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Follow us</span>
              {[
                {
                  label: 'Instagram', href: 'https://www.instagram.com/annapurna58585858/',
                  svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                },
                {
                  label: 'Facebook', href: 'https://www.facebook.com/people/Yiwu-Annapurna-World-Trade-Co-Ltd/61580077102644/',
                  svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold2)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  {s.svg} {s.label}
                </a>
              ))}
            </div>

            {/* Tech partner */}
            <a href="https://services.seekhowithrua.com" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Technology by</span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 14px', borderRadius: 10,
                background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>S</span>
                </div>
                <span style={{ color: 'var(--gold2)', fontSize: 13, fontWeight: 600 }}>SeekHowItRua Services</span>
                <ExternalLink size={12} color="var(--gold)" opacity={0.6} />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.3)', padding: '16px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
              © {new Date().getFullYear()} Yiwu Annapurna Imports and Exports Co. Ltd. All rights reserved.
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
              Made with care for global trade · Director: Vipin Tripathi
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}