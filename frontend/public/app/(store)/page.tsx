// src/app/(store)/page.tsx
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FeaturedSection from '@/components/home/FeaturedSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import HeroBanner from '@/components/home/HeroBanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <CategoryGrid />
        <FeaturedSection />
        {/* Trust badges */}
        <section className="bg-amber-50 border-y border-amber-100 py-10">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌾', title: 'Farm Fresh', desc: 'Direct from farmers' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Within 24-48 hours' },
              { icon: '💯', title: 'Quality Assured', desc: 'Lab tested produce' },
              { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards, COD' },
            ].map(b => (
              <div key={b.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{b.icon}</span>
                <p className="font-semibold text-stone-800">{b.title}</p>
                <p className="text-stone-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
