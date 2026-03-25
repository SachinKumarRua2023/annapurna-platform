'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ArrowRight, Globe, Ship, Plane, Truck } from 'lucide-react'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      })

      // Animate subtitle
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      })

      // Animate CTA buttons
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8
      })

      // Animate floating icons
      gsap.utils.toArray<HTMLElement>('.floating-icon').forEach((icon, i) => {
        gsap.to(icon, {
          y: -15,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.2
        })
      })

      // Animate background gradient
      gsap.to('.hero-bg', {
        backgroundPosition: '200% 200%',
        duration: 15,
        repeat: -1,
        ease: 'none'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div 
        className="hero-bg absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700"
        style={{ backgroundSize: '400% 400%', backgroundPosition: '0% 0%' }}
      />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating transportation icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-icon absolute top-[15%] left-[10%] text-white/20">
          <Ship className="w-16 h-16" />
        </div>
        <div className="floating-icon absolute top-[25%] right-[15%] text-white/20">
          <Plane className="w-20 h-20" />
        </div>
        <div className="floating-icon absolute bottom-[30%] left-[8%] text-white/20">
          <Truck className="w-14 h-14" />
        </div>
        <div className="floating-icon absolute bottom-[20%] right-[12%] text-white/20">
          <Globe className="w-24 h-24" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Trusted by 10,000+ Businesses Worldwide</span>
        </div>

        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="block">China to Your Door</span>
          <span className="block text-amber-200">Smarter, Faster, Cheaper</span>
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Import from China with confidence. Verified suppliers, all-in pricing with customs & GST, 
          and door-to-door delivery across 150+ countries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="hero-cta group flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Start Importing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/about"
            className="hero-cta flex items-center gap-2 bg-amber-700/50 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-700/70 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Trust badges */}
        <div className="hero-cta mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🇨🇳</span>
            </div>
            <div className="text-left">
              <div className="font-bold">Yiwu Base</div>
              <div className="text-sm opacity-80">China Operations</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🇮🇳</span>
            </div>
            <div className="text-left">
              <div className="font-bold">India Support</div>
              <div className="text-sm opacity-80">Local Operations</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌏</span>
            </div>
            <div className="text-left">
              <div className="font-bold">Global Reach</div>
              <div className="text-sm opacity-80">150+ Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}
