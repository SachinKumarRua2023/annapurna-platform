import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'

export const metadata: Metadata = {
  title: 'Annapurna World Trade | China Import & Export Solutions',
  description: 'Import from China with confidence. Verified suppliers, all-in pricing with customs & GST, and door-to-door delivery across 150+ countries. Yiwu-based operations with India support.',
  keywords: ['China import', 'Yiwu sourcing', 'import export', 'China to India', 'global trade', 'verified suppliers'],
  openGraph: {
    title: 'Annapurna World Trade | China Import & Export Solutions',
    description: 'Your trusted partner for China-India and global trade. Import from China with verified suppliers and transparent pricing.',
    type: 'website',
  },
}

export default function Home() {
  return <HomePage />
}
