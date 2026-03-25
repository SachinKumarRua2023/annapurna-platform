// src/components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display' }}>A</span>
            </div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: 'Playfair Display' }}>Annapurna</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            Fresh, pure, and natural food products sourced directly from trusted farmers across India.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {['All Products', 'Rice & Grains', 'Spices', 'Pulses', 'Oils & Ghee'].map(l => (
              <li key={l}><Link href="/products" className="hover:text-amber-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            {[['My Orders', '/orders'], ['Wishlist', '/wishlist'], ['Profile', '/account'], ['Addresses', '/account/addresses']].map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-amber-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:support@annapurna.com" className="hover:text-amber-400">support@annapurna.com</a></li>
            <li><a href="tel:+91XXXXXXXXXX" className="hover:text-amber-400">+91 XX XXXX XXXX</a></li>
            <li className="text-stone-500 text-xs pt-2">Mon–Sat: 9AM–6PM IST</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-5 text-center text-stone-500 text-xs">
        © {new Date().getFullYear()} Annapurna Platform. All rights reserved.
      </div>
    </footer>
  )
}
