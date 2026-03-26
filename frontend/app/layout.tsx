// src/app/layout.tsx - World-Class SEO & Performance Optimization

import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Annapurna - Global Agri-Trade Platform',
    template: '%s | Annapurna'
  },
  description: 'Connect with verified suppliers and buyers worldwide. Premium grains, spices, and agricultural products with quality assurance, seamless logistics, and secure payments.',
  keywords: [
    'agricultural products',
    'wholesale grains',
    'bulk spices',
    'rice export',
    'organic products',
    'food trade',
    'agri marketplace',
    'B2B food',
    'global trade',
    'traditional handicrafts',
    'local farmers Nepal',
    'authentic Nepalese goods',
    'mountain products',
    'organic food Nepal',
    'traditional spices',
    'Pashmina shawls',
    'Himalayan honey',
    'Ilam tea',
    'fair trade Nepal'
  ],
  authors: [{ name: 'Annapurna Platform', url: 'https://annapurna.com' }],
  creator: 'Annapurna Platform',
  publisher: 'Annapurna Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://annapurna.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ne-NP': '/ne-NP',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://annapurna.com',
    title: 'Annapurna Platform - Premium Nepalese Products',
    description: 'Discover authentic Nepalese products directly from local farmers and artisans',
    siteName: 'Annapurna Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Annapurna Platform - Premium Nepalese Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annapurna Platform - Premium Nepalese Products',
    description: 'Discover authentic Nepalese products directly from local farmers and artisans',
    images: ['/twitter-image.jpg'],
    creator: '@annapurna_platform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔️</text></svg>" />
        <link rel="manifest" href="/manifest.json" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Annapurna Platform",
              url: "https://annapurna.com",
              logo: "https://annapurna.com/logo.png",
              description: "Premium Nepalese products from local farmers and artisans",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NP",
                addressLocality: "Kathmandu",
                addressRegion: "Bagmati"
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+977-1-1234567",
                contactType: "customer service"
              }
            })
          }}
        />
      </head>
      <body className="font-inter antialiased bg-gradient-to-br from-amber-50 via-orange-50 to-saffron-50 text-gray-900 min-h-screen">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
              }
            `
          }}
        />
        
        <div id="portal-root" />
        <Toaster 
          position="top-right" 
          toastOptions={{
            className: 'font-inter text-sm',
            style: { 
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              borderRadius: '8px'
            }
          }} 
        />
        
        <div className="relative">
          {children}
        </div>
        
        <div id="loading-overlay" className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 hidden">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </body>
    </html>
  )
}