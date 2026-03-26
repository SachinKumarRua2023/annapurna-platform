'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Truck, 
  Package, 
  Shield, 
  FileText, 
  HeadphonesIcon,
  Warehouse,
  CreditCard,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Globe,
    title: 'Import-Export Solutions',
    description: 'Complete end-to-end import and export services connecting businesses across 150+ countries. We handle documentation, customs, and compliance.',
    features: ['Documentation handling', 'Customs clearance', 'Compliance management', 'Multi-country support'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Truck,
    title: 'Logistics & Shipping',
    description: 'Reliable door-to-door shipping with real-time tracking. Air, sea, and land freight options available for all cargo types.',
    features: ['Real-time tracking', 'Air/Sea/Land freight', 'Door-to-door delivery', 'Express shipping'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Package,
    title: 'Product Sourcing',
    description: 'Access verified suppliers from China, India, and other manufacturing hubs. Quality assurance and factory audits included.',
    features: ['Verified suppliers', 'Factory audits', 'Quality checks', 'Negotiation support'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous quality control processes including pre-shipment inspections, lab testing, and certification verification.',
    features: ['Pre-shipment inspection', 'Lab testing', 'Certification check', 'Defect resolution'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Strategic warehousing solutions in China and India with inventory management, repackaging, and distribution services.',
    features: ['Storage solutions', 'Inventory management', 'Repackaging', 'Distribution'],
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: FileText,
    title: 'Customs Brokerage',
    description: 'Expert customs clearance services ensuring smooth border crossing with proper documentation and duty optimization.',
    features: ['Customs clearance', 'Duty optimization', 'Documentation', 'Regulatory compliance'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: CreditCard,
    title: 'Trade Finance',
    description: 'Secure payment solutions including escrow services, letters of credit, and flexible payment terms for trusted partners.',
    features: ['Escrow services', 'Letter of credit', 'Secure payments', 'Flexible terms'],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer support with dedicated account managers for enterprise clients and priority handling.',
    features: ['24/7 availability', 'Dedicated managers', 'Priority support', 'Multi-language'],
    color: 'from-pink-500 to-rose-500',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Inquiry',
    description: 'Share your product requirements and specifications with our team.',
  },
  {
    number: '02',
    title: 'Sourcing',
    description: 'We connect you with verified suppliers and provide competitive quotes.',
  },
  {
    number: '03',
    title: 'Quality Check',
    description: 'Products undergo rigorous quality inspection before shipment.',
  },
  {
    number: '04',
    title: 'Shipping',
    description: 'Secure packaging and door-to-door delivery with real-time tracking.',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-amber-400">Services</span>
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Comprehensive trade solutions designed to simplify your international business operations 
              and accelerate global growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              What We Offer
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              From sourcing to delivery, we provide end-to-end solutions for your international trade needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-stone-100"
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{service.title}</h3>
                <p className="text-stone-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-xs text-stone-500 flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              How It Works
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Our streamlined process ensures smooth transactions from inquiry to delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-stone-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{step.title}</h3>
                <p className="text-stone-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-stone-200 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Industries We Serve
              </h2>
              <p className="text-stone-300 mb-8 leading-relaxed">
                From consumer goods to industrial equipment, we have expertise across diverse sectors 
                ensuring specialized handling for your specific industry needs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Consumer Electronics',
                  'Textiles & Apparel',
                  'Machinery & Tools',
                  'Home & Garden',
                  'Beauty & Personal Care',
                  'Automotive Parts',
                  'Sports & Outdoor',
                  'Food & Beverages',
                ].map((industry, index) => (
                  <div key={index} className="flex items-center gap-2 text-stone-300">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    {industry}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '98%', label: 'On-time Delivery' },
                { value: '50K+', label: 'Orders Shipped' },
                { value: '150+', label: 'Countries Served' },
                { value: '4.9/5', label: 'Customer Rating' },
              ].map((stat, index) => (
                <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-stone-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Trade Operations?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Get started with a free consultation. Our trade experts will analyze your requirements 
            and provide a customized solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-stone-100 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
