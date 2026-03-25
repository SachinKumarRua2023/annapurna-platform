import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Annapurna Platform',
  description: 'Premium Indian grocery delivery - Fresh organic produce, authentic spices, and traditional foods delivered to your doorstep.',
  url: 'https://annapurna-platform.vercel.app',
  ogImage: 'https://annapurna-platform.vercel.app/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/annapurna',
    instagram: 'https://instagram.com/annapurna',
  },
}

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Indian grocery',
    'organic produce',
    'spices',
    'food delivery',
    'authentic Indian food',
    'fresh vegetables',
    'traditional ingredients',
  ],
  authors: [{ name: 'Annapurna Platform' }],
  creator: 'Annapurna Platform',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@annapurna',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export function generateProductMetadata(product: {
  name: string
  description: string
  image: string
  price: number
  category: string
}) {
  return {
    title: `${product.name} - Buy Online`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Annapurna Platform`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}
