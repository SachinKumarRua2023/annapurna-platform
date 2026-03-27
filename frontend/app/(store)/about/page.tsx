'use client'

import { motion } from 'framer-motion'
import { Globe, Truck, Users, Award, TrendingUp, Shield, CheckCircle, Sparkles, ArrowRight, Target, Heart } from 'lucide-react'
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
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--ink)' }}>
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, var(--clay) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <Sparkles size={14} style={{ color: 'var(--gold)' }} />
              <span style={{ color: 'var(--gold2)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>About Us</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6" style={{ color: 'white' }}>
              About <span style={{ color: 'var(--gold2)' }}>Annapurna</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Your trusted partner for China-India and global trade. 
              Bridging markets, connecting businesses, delivering excellence since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ 
                  background: 'var(--cream)',
                  border: '1px solid var(--mist)'
                }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold mb-2" style={{ 
                  background: 'linear-gradient(135deg, var(--gold), var(--clay))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{stat.number}</div>
                <div style={{ color: '#666' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20" style={{ background: 'var(--ash)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <Target size={14} style={{ color: 'var(--gold)' }} />
                <span style={{ color: 'var(--clay)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Journey</span>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
                Our Story
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: '#666' }}>
                <p>
                  Founded in 2010 by <strong style={{ color: 'var(--ink)' }}>Vipin Tripathi</strong>, Annapurna Imports and Exports 
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
              <div className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--cream) 0%, var(--mist) 100%)' }}>
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 70%)' }} />
                <Globe className="w-32 h-32 relative z-10" style={{ color: 'var(--clay)', opacity: 0.5 }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <Heart size={14} style={{ color: 'var(--gold)' }} />
              <span style={{ color: 'var(--clay)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>What We Stand For</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
              Our Core Values
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#666' }}>
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
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 group"
                style={{ 
                  background: 'var(--cream)',
                  border: '1px solid var(--mist)'
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--clay))' }}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--ink)' }}>{value.title}</h3>
                <p style={{ color: '#666' }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: 'var(--ink)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, var(--gold), var(--clay))' }}>
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                To simplify global trade by providing a trusted platform where businesses can connect, 
                trade, and grow without borders. We ensure quality, transparency, and reliability in every transaction.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, var(--gold), var(--clay))' }}>
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                To become the world's most trusted trade ecosystem, empowering millions of businesses 
                to reach global markets with confidence and ease.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Features */}
      <section className="py-20" style={{ background: 'var(--ash)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <CheckCircle size={14} style={{ color: 'var(--gold)' }} />
              <span style={{ color: 'var(--clay)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Advantages</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
              Why Choose Annapurna?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Verified Suppliers', desc: 'All suppliers are thoroughly vetted for quality and reliability.' },
              { icon: Truck, title: 'Global Logistics', desc: 'End-to-end shipping with real-time tracking capabilities.' },
              { icon: Users, title: 'Expert Support', desc: 'Dedicated account managers for personalized assistance.' },
              { icon: Award, title: 'Quality Assurance', desc: 'Rigorous quality checks before every shipment.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ 
                  background: 'white',
                  border: '1px solid var(--mist)'
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, var(--gold), var(--clay))' }}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--ink)' }}>{feature.title}</h3>
                <p style={{ color: '#666', fontSize: 14 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--ink)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Join thousands of businesses already using Annapurna for their global trade needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, var(--gold), var(--clay))', color: 'white' }}
              >
                Browse Products <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'white', color: 'var(--ink)' }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
