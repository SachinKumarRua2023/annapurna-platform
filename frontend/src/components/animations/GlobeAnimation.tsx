'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

// Major trade hubs with coordinates
const tradeHubs = [
  { name: 'China', lat: 35.0, lon: 105.0, color: '#FF6B00', flag: '🇨🇳' },
  { name: 'India', lat: 20.0, lon: 77.0, color: '#FF9800', flag: '🇮🇳' },
  { name: 'USA', lat: 39.0, lon: -98.0, color: '#2196F3', flag: '🇺🇸' },
  { name: 'Europe', lat: 48.0, lon: 15.0, color: '#4CAF50', flag: '🇪🇺' },
  { name: 'UAE', lat: 24.0, lon: 54.0, color: '#00BCD4', flag: '🇦🇪' },
  { name: 'Singapore', lat: 1.3, lon: 103.8, color: '#E91E63', flag: '🇸🇬' },
  { name: 'Australia', lat: -25.0, lon: 133.0, color: '#9C27B0', flag: '🇦🇺' },
  { name: 'Japan', lat: 36.0, lon: 138.0, color: '#F44336', flag: '🇯🇵' },
  { name: 'UK', lat: 54.0, lon: -2.0, color: '#3F51B5', flag: '🇬🇧' },
  { name: 'Brazil', lat: -14.0, lon: -51.0, color: '#8BC34A', flag: '🇧🇷' },
  { name: 'South Africa', lat: -30.0, lon: 22.0, color: '#FF5722', flag: '🇿🇦' },
  { name: 'Russia', lat: 60.0, lon: 90.0, color: '#795548', flag: '🇷🇺' },
]

// Trade routes between hubs with transport type
const tradeRoutes = [
  { from: 0, to: 1, type: 'ship' }, // China - India (Ship)
  { from: 0, to: 1, type: 'plane' }, // China - India (Plane)
  { from: 0, to: 2, type: 'ship' }, // China - USA (Ship)
  { from: 0, to: 2, type: 'plane' }, // China - USA (Plane)
  { from: 0, to: 3, type: 'ship' }, // China - Europe (Ship)
  { from: 0, to: 3, type: 'plane' }, // China - Europe (Plane)
  { from: 0, to: 4, type: 'ship' }, // China - UAE (Ship)
  { from: 0, to: 5, type: 'ship' }, // China - Singapore (Ship)
  { from: 0, to: 6, type: 'ship' }, // China - Australia (Ship)
  { from: 0, to: 7, type: 'plane' }, // China - Japan (Plane)
  { from: 1, to: 2, type: 'ship' }, // India - USA (Ship)
  { from: 1, to: 3, type: 'plane' }, // India - Europe (Plane)
  { from: 1, to: 4, type: 'ship' }, // India - UAE (Ship)
  { from: 1, to: 5, type: 'ship' }, // India - Singapore (Ship)
  { from: 1, to: 10, type: 'ship' }, // India - South Africa (Ship)
  { from: 2, to: 3, type: 'plane' }, // USA - Europe (Plane)
  { from: 2, to: 8, type: 'plane' }, // USA - UK (Plane)
  { from: 3, to: 8, type: 'truck' }, // Europe - UK (Truck/Eurotunnel)
  { from: 4, to: 5, type: 'ship' }, // UAE - Singapore (Ship)
  { from: 5, to: 6, type: 'ship' }, // Singapore - Australia (Ship)
  { from: 5, to: 7, type: 'ship' }, // Singapore - Japan (Ship)
  { from: 7, to: 2, type: 'plane' }, // Japan - USA (Plane)
  { from: 11, to: 0, type: 'plane' }, // Russia - China (Plane)
  { from: 11, to: 3, type: 'plane' }, // Russia - Europe (Plane)
  { from: 9, to: 2, type: 'ship' }, // Brazil - USA (Ship)
]

// Convert lat/lon to 3D position on sphere
function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

// Earth sphere component
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    
    // Ocean background - deep blue
    const gradient = ctx.createLinearGradient(0, 0, 0, 1024)
    gradient.addColorStop(0, '#0a1628')
    gradient.addColorStop(0.5, '#1a365d')
    gradient.addColorStop(1, '#0a1628')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2048, 1024)
    
    // Add continent shapes with better detail
    ctx.fillStyle = '#2d5a3d'
    
    // Asia (more detailed shape)
    ctx.beginPath()
    ctx.moveTo(1400, 300)
    ctx.quadraticCurveTo(1600, 200, 1700, 350)
    ctx.quadraticCurveTo(1650, 500, 1500, 450)
    ctx.quadraticCurveTo(1350, 400, 1400, 300)
    ctx.fill()
    
    // India
    ctx.beginPath()
    ctx.moveTo(1300, 450)
    ctx.quadraticCurveTo(1350, 400, 1380, 480)
    ctx.quadraticCurveTo(1350, 550, 1300, 520)
    ctx.quadraticCurveTo(1250, 480, 1300, 450)
    ctx.fill()
    
    // Europe
    ctx.beginPath()
    ctx.ellipse(1050, 300, 120, 80, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Africa
    ctx.beginPath()
    ctx.moveTo(1050, 450)
    ctx.quadraticCurveTo(1150, 400, 1120, 600)
    ctx.quadraticCurveTo(1000, 750, 950, 600)
    ctx.quadraticCurveTo(980, 450, 1050, 450)
    ctx.fill()
    
    // North America
    ctx.beginPath()
    ctx.moveTo(400, 250)
    ctx.quadraticCurveTo(600, 150, 700, 300)
    ctx.quadraticCurveTo(650, 450, 450, 400)
    ctx.quadraticCurveTo(300, 350, 400, 250)
    ctx.fill()
    
    // South America
    ctx.beginPath()
    ctx.moveTo(550, 550)
    ctx.quadraticCurveTo(650, 500, 620, 750)
    ctx.quadraticCurveTo(520, 850, 480, 700)
    ctx.quadraticCurveTo(500, 580, 550, 550)
    ctx.fill()
    
    // Australia
    ctx.beginPath()
    ctx.ellipse(1700, 750, 100, 60, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Add grid lines for tech effect
    ctx.strokeStyle = 'rgba(255, 200, 100, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < 2048; i += 100) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 1024)
      ctx.stroke()
    }
    for (let i = 0; i < 1024; i += 100) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(2048, i)
      ctx.stroke()
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.7}
        metalness={0.1}
        emissive={new THREE.Color(0x0a1628)}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Atmosphere glow
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.15, 64, 64]} />
      <meshBasicMaterial
        color="#f59e0b"
        transparent
        opacity={0.15}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Trade hub marker with flag
function TradeHub({ position, color, name }: { position: THREE.Vector3; color: string; name: string }) {
  const ref = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15
      ref.current.scale.setScalar(scale)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime
    }
  })
  
  return (
    <group position={position}>
      {/* Outer glow ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      
      {/* Core dot */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.01}
        outlineColor="black"
      >
        {name}
      </Text>
    </group>
  )
}

// Animated trade route with vehicle
function TradeRoute({ from, to, type }: { from: THREE.Vector3; to: THREE.Vector3; type: 'ship' | 'plane' | 'truck' }) {
  const vehicleRef = useRef<THREE.Group>(null)
  const curveRef = useRef<THREE.QuadraticBezierCurve3 | null>(null)
  
  const points = useMemo(() => {
    const midPoint = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(2.8)
    const curve = new THREE.QuadraticBezierCurve3(from, midPoint, to)
    curveRef.current = curve
    return curve.getPoints(100)
  }, [from, to])
  
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])
  
  useFrame((state) => {
    if (vehicleRef.current && curveRef.current) {
      const speed = type === 'plane' ? 0.8 : type === 'truck' ? 0.3 : 0.4
      const t = (state.clock.elapsedTime * speed) % 1
      const pos = curveRef.current.getPoint(t)
      vehicleRef.current.position.copy(pos)
      
      // Orient vehicle along path
      const tangent = curveRef.current.getTangent(t)
      vehicleRef.current.lookAt(pos.clone().add(tangent))
    }
  })
  
  const routeColor = type === 'ship' ? '#00bcd4' : type === 'plane' ? '#ff9800' : '#4caf50'
  
  return (
    <>
      {/* Route line */}
      <line geometry={geometry}>
        <lineBasicMaterial color={routeColor} transparent opacity={0.3} linewidth={1} />
      </line>
      
      {/* Animated vehicle */}
      <group ref={vehicleRef}>
        {type === 'ship' && (
          <mesh>
            <coneGeometry args={[0.03, 0.08, 8]} />
            <meshBasicMaterial color="#00bcd4" />
          </mesh>
        )}
        {type === 'plane' && (
          <group>
            <mesh>
              <coneGeometry args={[0.02, 0.06, 4]} />
              <meshBasicMaterial color="#ff9800" />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
              <boxGeometry args={[0.06, 0.01, 0.01]} />
              <meshBasicMaterial color="#ff9800" />
            </mesh>
          </group>
        )}
        {type === 'truck' && (
          <mesh>
            <boxGeometry args={[0.04, 0.03, 0.05]} />
            <meshBasicMaterial color="#4caf50" />
          </mesh>
        )}
      </group>
    </>
  )
}

// Main globe scene
function GlobeScene() {
  const hubPositions = useMemo(() => 
    tradeHubs.map(hub => latLonToVector3(hub.lat, hub.lon, 2.05)),
    []
  )
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f59e0b" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#00bcd4" />
      
      <Stars radius={150} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Earth />
      <Atmosphere />
      
      {/* Trade hubs */}
      {tradeHubs.map((hub, i) => (
        <TradeHub
          key={hub.name}
          position={hubPositions[i]}
          color={hub.color}
          name={hub.name}
        />
      ))}
      
      {/* Trade routes */}
      {tradeRoutes.map((route, i) => (
        <TradeRoute
          key={i}
          from={hubPositions[route.from]}
          to={hubPositions[route.to]}
          type={route.type}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  )
}

// Main component
export default function GlobeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out'
      })
    }
  }, [])
  
  return (
    <div ref={containerRef} className="w-full h-[600px] relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <GlobeScene />
      </Canvas>
      
      {/* Overlay info */}
      <div className="absolute top-8 left-8 text-white z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          Global Trade Network
        </h2>
        <p className="text-amber-400 text-lg drop-shadow-md">
          Import • Export • Deliver Worldwide
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-sm rounded-xl p-4 text-white text-sm z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#00bcd4]"></span>
          <span>🚢 Sea Freight</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#ff9800]"></span>
          <span>✈️ Air Freight</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#4caf50]"></span>
          <span>🚛 Land Transport</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between text-white z-10">
        <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold text-amber-400">150+</div>
          <div className="text-sm">Countries</div>
        </div>
        <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold text-amber-400">10K+</div>
          <div className="text-sm">Clients</div>
        </div>
        <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold text-amber-400">200+</div>
          <div className="text-sm">Suppliers</div>
        </div>
        <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold text-amber-400">98%</div>
          <div className="text-sm">On-Time</div>
        </div>
      </div>
    </div>
  )
}
