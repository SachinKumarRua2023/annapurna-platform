'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Search, 
  ShieldCheck, 
  Warehouse, 
  PackageCheck, 
  FileText, 
  CreditCard,
  Globe,
  Plane,
  Ship,
  Truck
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Search,
    title: 'Free Sourcing Across China',
    description: 'We find the best suppliers from Yiwu and across China at factory-direct prices. No upfront fees.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ShieldCheck,
    title: 'Inspection & Quality Control',
    description: 'Every product inspected before shipment. Quality guaranteed or money back.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Repackaging',
    description: 'Free storage at our Yiwu facility. Professional repackaging and consolidation.',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: PackageCheck,
    title: 'Dropshipping Solutions',
    description: 'Ship directly to your customers worldwide. We handle fulfillment end-to-end.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: FileText,
    title: 'Custom Clearance & Docs',
    description: 'Complete documentation, customs clearance, and compliance support for all countries.',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: CreditCard,
    title: 'Easy Payment Solutions',
    description: 'Pay in INR, USD, or CNY. Razorpay, wire transfer, or LC accepted.',
    color: 'from-teal-500 to-teal-600'
  }
]

const processSteps = [
  { icon: Search, title: 'Free Pickup', desc: 'We collect from suppliers' },
  { icon: PackageCheck, title: 'Collection', desc: 'Goods arrive at warehouse' },
  { icon: Warehouse, title: 'Storage', desc: 'Safe warehousing in Yiwu' },
  { icon: ShieldCheck, title: 'QC Check', desc: 'Quality inspection' },
  { icon: FileText, title: 'Customs Clear', desc: 'Export documentation' },
  { icon: Ship, title: 'Shipment', desc: 'Sea or air dispatch' },
  { icon: Plane, title: 'In Transit', desc: 'Real-time tracking' },
  { icon: Truck, title: 'Delivery', desc: 'Door-to-door delivery' },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out'
        })
      })

      // Animate process steps
      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, i) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 90%',
          },
          x: -30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power3.out'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Complete Import Solutions
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            From sourcing to delivery, we handle everything. One partner, endless possibilities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-100 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-stone-800 mb-3">
                {service.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center text-amber-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-stone-800 mb-10">
            How It Works
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                  <step.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-stone-800 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-stone-500">{step.desc}</p>
                
                {/* Connector line (except last) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 w-full h-0.5 bg-amber-200 -translate-y-1/2 translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technology Partner */}
        <div className="mt-16 text-center">
          <p className="text-stone-500 mb-2">Technology Partner</p>
          <a 
            href="https://services.seekhowithrua.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Powered by SeekHowItRua Services (India)
          </a>
        </div>
      </div>
    </section>
  )
}
