'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 94075 74288', '+86 157 5792 0888'],
    description: 'Monday to Saturday, 9am to 6pm IST',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@annapurnaworldtrade.com', 'support@annapurnaworldtrade.com'],
    description: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Office Locations',
    details: ['Yiwu, Zhejiang, China', 'Delhi NCR, India'],
    description: 'Visit our offices by appointment',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['China: 9:00 AM - 6:00 PM CST', 'India: 9:00 AM - 6:00 PM IST'],
    description: 'Closed on Sundays',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    toast.success('Message sent successfully! We will contact you soon.')
    
    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-amber-400">Touch</span>
            </h1>
            <p className="text-xl text-green-100">
              Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-stone-50 hover:bg-green-50 transition-colors border border-stone-100"
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <div className="space-y-1 mb-2">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-stone-700 font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-stone-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Form Side */}
              <div className="md:col-span-3 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  Send us a Message
                </h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                    <p className="text-stone-600">We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="Your Company Ltd."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="supplier">Become a Supplier</option>
                        <option value="buyer">Buyer Registration</option>
                        <option value="shipping">Shipping & Logistics</option>
                        <option value="support">Customer Support</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Info Side */}
              <div className="md:col-span-2 bg-green-700 p-8 md:p-10 text-white">
                <h3 className="text-xl font-bold mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {[
                    'Verified suppliers and buyers',
                    'Quality assurance guaranteed',
                    'Real-time order tracking',
                    'Competitive pricing',
                    'Door-to-door delivery',
                    '24/7 customer support',
                    'Secure payment options',
                    'Customs clearance assistance',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-green-100">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-8 border-t border-green-600">
                  <p className="text-sm text-green-200">
                    For urgent inquiries, please call us directly at
                  </p>
                  <p className="text-lg font-semibold mt-1">+91 94075 74288</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Locations</h2>
            <p className="text-stone-600">Visit us at our offices in China and India</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* China Office */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-stone-100"
            >
              <div className="aspect-video bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">China Office</h3>
                  <p className="text-red-200">Yiwu, Zhejiang Province</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-stone-900 mb-2">Yiwu Annapurna World Trade Co., Ltd.</h4>
                <p className="text-stone-600 text-sm mb-4">
                  Room 201, Building 3, Yiwu International Trade City, 
                  Yiwu, Zhejiang, China 322000
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <a href="tel:+8615757920888" className="text-green-700 hover:underline">
                    +86 157 5792 0888
                  </a>
                  <span className="text-stone-400">|</span>
                  <span className="text-stone-600">9:00 AM - 6:00 PM CST</span>
                </div>
              </div>
            </motion.div>
            
            {/* India Office */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-stone-100"
            >
              <div className="aspect-video bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">India Office</h3>
                  <p className="text-orange-200">Delhi NCR</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-stone-900 mb-2">Annapurna Imports & Exports Pvt. Ltd.</h4>
                <p className="text-stone-600 text-sm mb-4">
                  405, Tower B, Signature Tower, 
                  South City 1, Gurgaon, Haryana, India 122001
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <a href="tel:+919407574288" className="text-green-700 hover:underline">
                    +91 94075 74288
                  </a>
                  <span className="text-stone-400">|</span>
                  <span className="text-stone-600">9:00 AM - 6:00 PM IST</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
