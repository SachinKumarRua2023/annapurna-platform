'use client'
// src/components/home/HeroBanner.tsx
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D5016 0%, #3d6b1e 50%, #4a7d24 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-amber-400 translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-amber-300 -translate-x-16 translate-y-16" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left animate-fade-up">
          <span className="inline-block bg-amber-500/20 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-5 border border-amber-500/30">
            🌿 100% Natural & Pure
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display' }}>
            Fresh Goodness,<br />
            <span className="text-amber-400">Straight to Your Door</span>
          </h1>
          <p className="text-green-200 text-lg mb-8 max-w-lg">
            Premium rice, spices, pulses, and oils — sourced directly from trusted farmers across India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link href="/products" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-xl transition-all active:scale-95 text-lg">
              Shop Now
            </Link>
            <Link href="/products?is_featured=true" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all">
              View Featured
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 justify-center md:justify-start">
            {[['500+', 'Products'], ['10K+', 'Customers'], ['4.8★', 'Rating']].map(([num, label]) => (
              <div key={label}>
                <p className="text-amber-400 font-bold text-xl">{num}</p>
                <p className="text-green-300 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual placeholder (replace with real image) */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-2">🌾</div>
              <p className="text-white/60 text-sm">Fresh Harvest</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
