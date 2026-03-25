'use client'
// src/components/ui/ThreeProductCard.tsx
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
    description?: string
  }
  onAddToCart: () => void
  onViewDetails: () => void
}

export default function ThreeProductCard({ product, onAddToCart, onViewDetails }: ThreeProductCardProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Enhanced scene setup
    const scene = new THREE.Scene()
    
    // Dynamic gradient background
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')!
    
    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, '#0a0a0a')
    gradient.addColorStop(0.5, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    context.fillStyle = gradient
    context.fillRect(0, 0, 512, 512)
    
    const bgTexture = new THREE.CanvasTexture(canvas)
    scene.background = bgTexture

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.set(0, 0, 3)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(300, 200)
    mountRef.current.appendChild(renderer.domElement)

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Colored accent lights
    const pointLight1 = new THREE.PointLight(0xff6b35, 0.5, 10)
    pointLight1.position.set(-3, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 0.3, 10)
    pointLight2.position.set(3, -1, -2)
    scene.add(pointLight2)

    // Enhanced product showcase geometry
    const geometry = new THREE.BoxGeometry(1.5, 1, 1)
    const material = new THREE.MeshPhongMaterial({
      color: 0x2d5016,
      emissive: 0x1a1a1a,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
      specular: 0xffffff,
      emissiveIntensity: 0.1
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Add floating particles around product
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xe8800a,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate product
      // Enhanced cube rotation
      cube.rotation.y += isHovered ? 0.03 : 0.008
      cube.rotation.x = Math.sin(Date.now() * 0.001) * 0.15
      cube.rotation.z = Math.cos(Date.now() * 0.0008) * 0.05
      
      // Enhanced particle animation
      particles.rotation.y += 0.003
      particles.rotation.x += 0.001
      
      // Pulsing effect on hover
      if (isHovered) {
        const scale = 1 + Math.sin(Date.now() * 0.003) * 0.05
        cube.scale.set(scale, scale, scale)
      } else {
        cube.scale.set(1, 1, 1)
      }
      
      // Light animation
      pointLight1.intensity = 0.5 + Math.sin(Date.now() * 0.002) * 0.2
      pointLight2.intensity = 0.3 + Math.cos(Date.now() * 0.003) * 0.15

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [isHovered])

  return (
    <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
      {/* Three.js Canvas */}
      <div 
        ref={mountRef}
        className="absolute inset-0 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Product Info Overlay */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between bg-gradient-to-t from-black/80 to-transparent">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="space-y-3">
          <div className="text-2xl font-bold text-amber-400">₹{product.price}</div>
          
          <div className="flex gap-2">
            <button
              onClick={onViewDetails}
              className="flex-1 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              View Details
            </button>
            <button
              onClick={onAddToCart}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2h1.6l.4.4L7 10l-3.6-3.6L7 10l-1.8-1.8L3 6.4z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
