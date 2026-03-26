'use client'

import { Suspense, lazy } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import GlobeAnimation from '@/components/animations/GlobeAnimation'
import { products } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Shield, Truck } from 'lucide-react'

// Lazy load heavy components
const GlobalTradeAnimation = lazy(() => import('@/components/animations/GlobalTradeAnimation'))

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* 3D Globe Section - Visual Wow Factor */}
      <section className="bg-stone-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Global Trade Network
            </h2>
            <p className="text-amber-400">
              Connecting 150+ countries with seamless import-export solutions
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <GlobeAnimation />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-white/80">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-white/80">Verified Suppliers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-white/80">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Featured Products
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Import from China at Factory Prices
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              All prices include customs duty, GST, and door-to-door delivery. No hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition-all duration-300 hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Why Import With Annapurna?
            </h2>
            <p className="text-xl text-stone-600">
              The complete solution for China-India and global trade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Verified Suppliers',
                desc: 'Every supplier personally verified by our Yiwu team. No scams, no middlemen.'
              },
              {
                icon: Shield,
                title: 'Transparent Pricing',
                desc: 'All-in pricing with customs duty, GST, and shipping. No surprise charges.'
              },
              {
                icon: Truck,
                title: 'Door-to-Door Delivery',
                desc: 'We handle everything from China pickup to your doorstep in India or worldwide.'
              },
              {
                icon: TrendingUp,
                title: 'Best Rates',
                desc: 'Direct factory access through our Yiwu presence. Better than Alibaba prices.'
              },
              {
                icon: Shield,
                title: 'Quality Guarantee',
                desc: '100% inspection before shipment. Quality issues? Full refund or replacement.'
              },
              {
                icon: Star,
                title: 'Dedicated Support',
                desc: 'WhatsApp support with our India team. Track your order 24/7.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{item.title}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Importing?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Get a free quote in 24 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-all duration-300 hover:scale-105"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/919407574288"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-700/50 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-700/70 transition-all duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Global Trade Map - Fallback Animation */}
      <section className="py-16 bg-stone-900 hidden">
        <Suspense fallback={<div className="h-[500px] bg-stone-800 animate-pulse rounded-3xl" />}>
          <GlobalTradeAnimation />
        </Suspense>
      </section>

      <Footer />
    </main>
  )
}
