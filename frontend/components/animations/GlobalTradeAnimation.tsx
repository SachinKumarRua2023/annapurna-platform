'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface TradeRoute {
  from: { x: number; y: number; name: string }
  to: { x: number; y: number; name: string }
  type: 'ship' | 'plane' | 'truck'
  color: string
}

const tradeRoutes: TradeRoute[] = [
  // China to India (Main route)
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 65, y: 45, name: 'India' }, type: 'ship', color: '#E65100' },
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 65, y: 45, name: 'India' }, type: 'plane', color: '#FF9800' },
  
  // China to USA
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 20, y: 35, name: 'USA' }, type: 'ship', color: '#1565C0' },
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 20, y: 35, name: 'USA' }, type: 'plane', color: '#2196F3' },
  
  // China to Europe
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 48, y: 30, name: 'Europe' }, type: 'ship', color: '#2E7D32' },
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 48, y: 30, name: 'Europe' }, type: 'plane', color: '#4CAF50' },
  
  // India to Middle East
  { from: { x: 65, y: 45, name: 'India' }, to: { x: 55, y: 42, name: 'UAE' }, type: 'ship', color: '#C62828' },
  { from: { x: 65, y: 45, name: 'India' }, to: { x: 55, y: 42, name: 'UAE' }, type: 'plane', color: '#EF5350' },
  
  // India to Africa
  { from: { x: 65, y: 45, name: 'India' }, to: { x: 52, y: 55, name: 'Africa' }, type: 'ship', color: '#6A1B9A' },
  
  // China to Australia
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 85, y: 70, name: 'Australia' }, type: 'ship', color: '#00695C' },
  { from: { x: 75, y: 35, name: 'China' }, to: { x: 85, y: 70, name: 'Australia' }, type: 'plane', color: '#009688' },
  
  // India to Southeast Asia
  { from: { x: 65, y: 45, name: 'India' }, to: { x: 78, y: 55, name: 'Singapore' }, type: 'ship', color: '#AD1457' },
  { from: { x: 65, y: 45, name: 'India' }, to: { x: 78, y: 55, name: 'Singapore' }, type: 'plane', color: '#EC407A' },
  
  // Europe to USA
  { from: { x: 48, y: 30, name: 'Europe' }, to: { x: 20, y: 35, name: 'USA' }, type: 'ship', color: '#455A64' },
  { from: { x: 48, y: 30, name: 'Europe' }, to: { x: 20, y: 35, name: 'USA' }, type: 'plane', color: '#607D8B' },
]

export default function GlobalTradeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const routesRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!routesRef.current) return

    const svg = routesRef.current
    
    // Animate ships
    gsap.utils.toArray<HTMLElement>('.trade-ship').forEach((ship, i) => {
      gsap.to(ship, {
        motionPath: {
          path: ship.getAttribute('data-path') || '',
          align: ship.getAttribute('data-path') || '',
          alignOrigin: [0.5, 0.5],
        },
        duration: 8 + i * 0.5,
        repeat: -1,
        ease: 'none',
      })
    })

    // Animate planes
    gsap.utils.toArray<HTMLElement>('.trade-plane').forEach((plane, i) => {
      gsap.to(plane, {
        motionPath: {
          path: plane.getAttribute('data-path') || '',
          align: plane.getAttribute('data-path') || '',
          alignOrigin: [0.5, 0.5],
        },
        duration: 4 + i * 0.3,
        repeat: -1,
        ease: 'none',
      })
    })

    // Pulse animation for connection points
    gsap.utils.toArray<HTMLElement>('.connection-point').forEach((point) => {
      gsap.to(point, {
        scale: 1.5,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    })

    // Animate route lines drawing
    gsap.utils.toArray<SVGPathElement>('.route-line').forEach((line, i) => {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 2,
        delay: i * 0.1,
        ease: 'power2.out',
      })
    })
  }, [])

  const getCurvedPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2 - 10 // Curve upward
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`
  }

  return (
    <div ref={containerRef} className="relative w-full h-[600px] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-3xl">
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Simplified world map dots */}
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r={0.3}
              fill="white"
            />
          ))}
        </svg>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Global Trade Network
        </h2>
        <p className="text-amber-400 text-lg">
          Import • Export • Deliver Worldwide
        </p>
      </div>

      {/* Main Animation SVG */}
      <svg
        ref={routesRef}
        viewBox="0 0 100 80"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"/>
          </pattern>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Gradient for routes */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9800" stopOpacity="0"/>
            <stop offset="50%" stopColor="#FF9800" stopOpacity="1"/>
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Background grid */}
        <rect width="100" height="80" fill="url(#grid)" />

        {/* Trade Routes */}
        {tradeRoutes.map((route, index) => {
          const path = getCurvedPath(route.from, route.to)
          return (
            <g key={index}>
              {/* Route line */}
              <path
                d={path}
                fill="none"
                stroke={route.color}
                strokeWidth="0.3"
                strokeOpacity="0.4"
                className="route-line"
              />
              
              {/* Animated transport vehicle */}
              <g
                className={route.type === 'ship' ? 'trade-ship' : 'trade-plane'}
                data-path={path}
                filter="url(#glow)"
              >
                {route.type === 'ship' ? (
                  // Ship icon
                  <g transform="translate(-1.5, -1)">
                    <path
                      d="M0,1 L3,1 L2.5,2 L0.5,2 Z"
                      fill={route.color}
                    />
                    <rect x="0.5" y="0" width="2" height="1" fill={route.color} opacity="0.7"/>
                  </g>
                ) : (
                  // Plane icon
                  <g transform="translate(-1, -0.5)">
                    <path
                      d="M0,0.5 L2,0.5 L2.5,0 L2,1 L0,1 Z"
                      fill={route.color}
                    />
                  </g>
                )}
              </g>
            </g>
          )
        })}

        {/* Country markers */}
        {[
          { x: 75, y: 35, name: 'CHINA', flag: '🇨🇳' },
          { x: 65, y: 45, name: 'INDIA', flag: '🇮🇳' },
          { x: 20, y: 35, name: 'USA', flag: '🇺🇸' },
          { x: 48, y: 30, name: 'EUROPE', flag: '🇪🇺' },
          { x: 55, y: 42, name: 'UAE', flag: '🇦🇪' },
          { x: 52, y: 55, name: 'AFRICA', flag: '🌍' },
          { x: 85, y: 70, name: 'AUSTRALIA', flag: '🇦🇺' },
          { x: 78, y: 55, name: 'SINGAPORE', flag: '🇸🇬' },
        ].map((country, i) => (
          <g key={i}>
            {/* Pulse ring */}
            <circle
              cx={country.x}
              cy={country.y}
              r="2"
              fill="none"
              stroke="#FF9800"
              strokeWidth="0.3"
              className="connection-point"
            />
            {/* Country dot */}
            <circle
              cx={country.x}
              cy={country.y}
              r="1"
              fill="#FF9800"
              filter="url(#glow)"
            />
            {/* Country label */}
            <text
              x={country.x}
              y={country.y - 3}
              textAnchor="middle"
              fill="white"
              fontSize="2"
              fontWeight="bold"
            >
              {country.name}
            </text>
            <text
              x={country.x}
              y={country.y + 4}
              textAnchor="middle"
              fontSize="3"
            >
              {country.flag}
            </text>
          </g>
        ))}
      </svg>

      {/* Stats overlay */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between text-white">
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">150+</div>
          <div className="text-sm opacity-80">Countries Served</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">10K+</div>
          <div className="text-sm opacity-80">Happy Clients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">200+</div>
          <div className="text-sm opacity-80">Verified Suppliers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">98%</div>
          <div className="text-sm opacity-80">On-Time Delivery</div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}
