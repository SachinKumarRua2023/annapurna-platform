'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

// Major trade hubs with coordinates
const tradeHubs = [
  { name: 'China', lat: 35.0, lon: 105.0, color: '#FF6B00' },
  { name: 'India', lat: 20.0, lon: 77.0, color: '#FF9800' },
  { name: 'USA', lat: 39.0, lon: -98.0, color: '#2196F3' },
  { name: 'Europe', lat: 48.0, lon: 15.0, color: '#4CAF50' },
  { name: 'UAE', lat: 24.0, lon: 54.0, color: '#00BCD4' },
  { name: 'Singapore', lat: 1.3, lon: 103.8, color: '#E91E63' },
  { name: 'Australia', lat: -25.0, lon: 133.0, color: '#9C27B0' },
  { name: 'Japan', lat: 36.0, lon: 138.0, color: '#F44336' },
  { name: 'UK', lat: 54.0, lon: -2.0, color: '#3F51B5' },
  { name: 'Brazil', lat: -14.0, lon: -51.0, color: '#8BC34A' },
]

// Trade routes between hubs
const tradeRoutes = [
  { from: 0, to: 1 }, // China - India
  { from: 0, to: 2 }, // China - USA
  { from: 0, to: 3 }, // China - Europe
  { from: 0, to: 4 }, // China - UAE
  { from: 0, to: 5 }, // China - Singapore
  { from: 0, to: 6 }, // China - Australia
  { from: 0, to: 7 }, // China - Japan
  { from: 1, to: 2 }, // India - USA
  { from: 1, to: 3 }, // India - Europe
  { from: 1, to: 4 }, // India - UAE
  { from: 1, to: 5 }, // India - Singapore
  { from: 2, to: 3 }, // USA - Europe
  { from: 2, to: 8 }, // USA - UK
  { from: 3, to: 8 }, // Europe - UK
  { from: 4, to: 5 }, // UAE - Singapore
  { from: 5, to: 6 }, // Singapore - Australia
  { from: 5, to: 7 }, // Singapore - Japan
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
  
  // Create earth texture using canvas
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Ocean background
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, '#1a237e')
    gradient.addColorStop(0.5, '#0d47a1')
    gradient.addColorStop(1, '#01579b')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)
    
    // Add continent-like shapes (simplified)
    ctx.fillStyle = '#2e7d32'
    // Asia
    ctx.beginPath()
    ctx.ellipse(700, 200, 150, 100, 0, 0, Math.PI * 2)
    ctx.fill()
    // Europe
    ctx.beginPath()
    ctx.ellipse(520, 180, 60, 40, 0, 0, Math.PI * 2)
    ctx.fill()
    // Africa
    ctx.beginPath()
    ctx.ellipse(530, 300, 80, 120, 0, 0, Math.PI * 2)
    ctx.fill()
    // North America
    ctx.beginPath()
    ctx.ellipse(200, 180, 120, 80, 0, 0, Math.PI * 2)
    ctx.fill()
    // South America
    ctx.beginPath()
    ctx.ellipse(280, 380, 60, 100, 0, 0, Math.PI * 2)
    ctx.fill()
    // Australia
    ctx.beginPath()
    ctx.ellipse(850, 380, 50, 30, 0, 0, Math.PI * 2)
    ctx.fill()
    
    return new THREE.CanvasTexture(canvas)
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  )
}

// Atmosphere glow
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.1, 64, 64]} />
      <meshBasicMaterial
        color="#4fc3f7"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Trade hub marker
function TradeHub({ position, color, name }: { position: THREE.Vector3; color: string; name: string }) {
  const ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      ref.current.scale.setScalar(scale)
    }
  })
  
  return (
    <group ref={ref} position={position}>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="bottom"
      >
        {name}
      </Text>
    </group>
  )
}

// Animated trade route
function TradeRoute({ from, to, color }: { from: THREE.Vector3; to: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      from,
      from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(3),
      to
    )
    return curve.getPoints(50)
  }, [from, to])
  
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points)
    return geom
  }, [points])
  
  // Animated particle along route
  const particleRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.elapsedTime * 0.3) % 1
      const curve = new THREE.QuadraticBezierCurve3(
        from,
        from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(3),
        to
      )
      const pos = curve.getPoint(t)
      particleRef.current.position.copy(pos)
    }
  })
  
  return (
    <>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} linewidth={2} />
      </line>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4fc3f7" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
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
          color="#FF9800"
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={4}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Main component
export default function GlobeAnimation() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <GlobeScene />
      </Canvas>
      
      {/* Overlay info */}
      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Global Trade Network</h2>
        <p className="text-amber-400">Connecting 150+ Countries</p>
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between text-white">
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">150+</div>
          <div className="text-sm">Countries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">10K+</div>
          <div className="text-sm">Clients</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">200+</div>
          <div className="text-sm">Suppliers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">98%</div>
          <div className="text-sm">On-Time</div>
        </div>
      </div>
    </div>
  )
}
