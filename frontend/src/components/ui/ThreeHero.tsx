'use client'
// World-Class Three.js Hero Component - Google CEO Level Design
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface ThreeHeroProps {
  title: string
  subtitle: string
  ctaText: string
  onCtaClick: () => void
}

export default function ThreeHero({ title, subtitle, ctaText, onCtaClick }: ThreeHeroProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    // Scene Setup with Advanced Atmosphere
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015)
    
    // Dynamic Procedural Background
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')!
    
    // Create cosmic gradient
    const gradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(0.3, '#16213e')
    gradient.addColorStop(0.6, '#0f3460')
    gradient.addColorStop(1, '#0a0a0a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2048, 2048)
    
    // Add stars
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 2048
      const y = Math.random() * 2048
      const size = Math.random() * 2
      const opacity = Math.random() * 0.8 + 0.2
      
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
    }
    
    const bgTexture = new THREE.CanvasTexture(canvas)
    scene.background = bgTexture

    // Advanced Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 8)
    camera.lookAt(0, 0, 0)

    // High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)

    // Advanced Lighting System
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    // Main light with shadow
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5)
    mainLight.position.set(10, 10, 5)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 2048
    mainLight.shadow.mapSize.height = 2048
    mainLight.shadow.camera.near = 0.5
    mainLight.shadow.camera.far = 50
    mainLight.shadow.camera.left = -10
    mainLight.shadow.camera.right = 10
    mainLight.shadow.camera.top = 10
    mainLight.shadow.camera.bottom = -10
    scene.add(mainLight)

    // Dynamic colored lights
    const lights = [
      {
        light: new THREE.PointLight(0xff6b35, 2, 20),
        position: [8, 6, 8],
        speed: 0.001
      },
      {
        light: new THREE.PointLight(0x4ecdc4, 1.5, 20),
        position: [-8, -4, -8],
        speed: 0.0015
      },
      {
        light: new THREE.PointLight(0x95e1d3, 1, 20),
        position: [0, 8, 0],
        speed: 0.0008
      },
      {
        light: new THREE.PointLight(0xf38181, 0.8, 20),
        position: [-6, 4, 6],
        speed: 0.0012
      }
    ]

    lights.forEach(({ light, position }) => {
      light.position.set(position[0], position[1], position[2])
      light.castShadow = true
      scene.add(light)
    })

    // Advanced Particle System
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    const sizes = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      // Colors - Premium palette
      const colorChoice = Math.random()
      if (colorChoice < 0.25) {
        // Deep blue
        colors[i * 3] = 0.2 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else if (colorChoice < 0.5) {
        // Purple
        colors[i * 3] = 0.6 + Math.random() * 0.4
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else if (colorChoice < 0.75) {
        // Orange accent
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.1
      } else {
        // Cyan
        colors[i * 3] = 0.3 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
      }

      // Sizes
      sizes[i] = Math.random() * 0.15 + 0.05
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Advanced Geometric Shapes System
    const meshes: THREE.Mesh[] = []
    const geometries = [
      () => new THREE.IcosahedronGeometry(0.3 + Math.random() * 0.4, 1),
      () => new THREE.OctahedronGeometry(0.3 + Math.random() * 0.4, 0),
      () => new THREE.TetrahedronGeometry(0.3 + Math.random() * 0.4, 0),
      () => new THREE.DodecahedronGeometry(0.2 + Math.random() * 0.3, 0),
      () => new THREE.TorusGeometry(0.3, 0.1, 8, 16)
    ]

    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]()
      
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(
          0.3 + Math.random() * 0.4,
          0.3 + Math.random() * 0.3,
          0.6 + Math.random() * 0.3
        ),
        emissive: new THREE.Color(0.1, 0.1, 0.2),
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.25,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      )
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )
      mesh.castShadow = true
      mesh.receiveShadow = true
      meshes.push(mesh)
      scene.add(mesh)
    }

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop with GSAP
    const clock = new THREE.Clock()
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Mouse-responsive camera
      camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.05
      camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      // Particle animation
      particles.rotation.y += 0.0005
      particles.rotation.x += 0.0002

      // Dynamic particle size based on distance
      const positions = particlesGeometry.attributes.position.array as Float32Array
      const sizes = particlesGeometry.attributes.size.array as Float32Array
      
      for (let i = 0; i < particlesCount; i++) {
        const x = positions[i * 3]
        const y = positions[i * 3 + 1]
        const z = positions[i * 3 + 2]
        
        const distance = Math.sqrt(x * x + y * y + z * z)
        sizes[i] = Math.max(0.05, 0.15 - distance * 0.01)
      }
      
      particlesGeometry.attributes.size.needsUpdate = true

      // Advanced mesh animations
      meshes.forEach((mesh, i) => {
        const time = elapsedTime * 0.5
        
        // Complex rotation patterns
        mesh.rotation.x = Math.sin(time + i * 0.3) * 0.8
        mesh.rotation.y = Math.cos(time + i * 0.2) * 0.6
        mesh.rotation.z = Math.sin(time + i * 0.4) * 0.4
        
        // Orbital motion
        const orbitRadius = 5 + i * 0.2
        const orbitSpeed = 0.1 + i * 0.01
        mesh.position.x = Math.sin(time * orbitSpeed + i) * orbitRadius
        mesh.position.y = Math.cos(time * orbitSpeed * 0.7 + i) * orbitRadius * 0.5
        mesh.position.z = Math.sin(time * orbitSpeed * 0.5 + i) * orbitRadius * 0.3
        
        // Pulsing scale
        const scale = 1 + Math.sin(time * 2 + i) * 0.15
        mesh.scale.set(scale, scale, scale)
        
        // Material animation
        const material = mesh.material as THREE.MeshPhysicalMaterial
        material.emissiveIntensity = 0.2 + Math.sin(time * 3 + i) * 0.1
      })

      // Dynamic light animations
      lights.forEach(({ light, speed }, i) => {
        const time = elapsedTime * speed
        light.intensity = 1 + Math.sin(time + i) * 0.5
        light.position.x = Math.sin(time) * 10
        light.position.y = Math.cos(time * 0.7) * 8
        light.position.z = Math.sin(time * 0.5) * 6
      })

      renderer.render(scene, camera)
    }

    // Start animation
    animate()
    setIsLoading(false)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      // Dispose Three.js resources
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      meshes.forEach(mesh => {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
      })
      lights.forEach(({ light }) => light.dispose())
      renderer.dispose()
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [mousePosition])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Three.js Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white font-medium">Loading 3D Experience...</p>
          </div>
        </div>
      )}
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-6 max-w-4xl">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {subtitle}
          </p>
          
          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-bounce-in"
          >
            <span className="relative z-10">{ctaText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          
          {/* Additional Elements */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live 3D Rendering</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span>Interactive Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Optimized Performance</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
