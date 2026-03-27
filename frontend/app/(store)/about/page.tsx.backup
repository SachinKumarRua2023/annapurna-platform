'use client'

import { motion } from 'framer-motion'
import { Globe, Truck, Users, Award, TrendingUp, Shield, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { number: '15+', label: 'Years Experience' },
  { number: '150+', label: 'Countries Served' },
  { number: '50K+', label: 'Products Shipped' },
  { number: '10K+', label: 'Happy Customers' },
]

const values = [
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connecting businesses across 150+ countries with seamless import-export solutions.',
  },
  {
    icon: Shield,
    title: 'Trust & Quality',
    description: 'Verified suppliers, quality assurance, and transparent pricing guaranteed.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: 'Helping businesses scale internationally with dedicated support and market insights.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Building long-term relationships with suppliers, buyers, and logistics partners.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-amber-400">Annapurna</span>
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Your trusted partner for China-India and global trade. 
              Bridging markets, connecting businesses, delivering excellence since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-green-700 mb-2">{stat.number}</div>
                <div className="text-stone-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Founded in 2010 by <strong className="text-stone-900">Vipin Tripathi</strong>, Annapurna Imports and Exports 
                  began with a simple mission: to make international trade accessible, transparent, and reliable for businesses of all sizes.
                </p>
                <p>
                  What started as a small trading company in Yiwu, China, has grown into a global platform connecting 
                  thousands of suppliers and buyers across Asia, Europe, Africa, and the Americas.
                </p>
                <p>
                  Today, we operate from strategic locations in China and India, with a network of trusted logistics 
                  partners ensuring door-to-door delivery with real-time tracking.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                <Globe className="w-32 h-32 text-green-700 opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every relationship we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-stone-50 hover:bg-green-50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{value.title}</h3>
                <p className="text-stone-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <Award className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-stone-300 leading-relaxed">
                To simplify global trade by providing a trusted platform where businesses can connect, 
                trade, and grow without borders. We ensure quality, transparency, and reliability in every transaction.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <TrendingUp className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-stone-300 leading-relaxed">
                To become the world's most trusted trade ecosystem, empowering millions of businesses 
                to reach global markets with confidence and ease.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join thousands of businesses already using Annapurna for their global trade needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-stone-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
