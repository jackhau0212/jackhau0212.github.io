'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Earth3DProps {
  className?: string
}

export default function Earth3D({ className = '' }: Earth3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const mountElement = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountElement.clientWidth / mountElement.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 2.5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountElement.appendChild(renderer.domElement)

    // Texture loader
    const textureLoader = new THREE.TextureLoader()

    // Load Earth textures (only diffuse and normal)
    const earthTexture = textureLoader.load('/textures/earth_texture.jpg')
    const earthNormalMap = textureLoader.load('/textures/earth_normal.jpg')

    // Create Earth geometry
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64)

    // Create Earth material with only diffuse and normal maps
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: earthNormalMap,
      normalScale: new THREE.Vector2(0.85, 0.85),
      shininess: 30,
    })

    // Create Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earthRef.current = earth
    earth.castShadow = true
    earth.receiveShadow = true
    scene.add(earth)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    // Main directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 3, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Secondary fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-5, -3, -5)
    scene.add(fillLight)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate Earth continuously
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.005
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountElement || !renderer || !camera) return

      const width = mountElement.clientWidth
      const height = mountElement.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)

      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement)
      }

      renderer.dispose()
      earthGeometry.dispose()
      earthMaterial.dispose()
      earthTexture.dispose()
      earthNormalMap.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`h-96 w-full overflow-hidden rounded-lg ${className}`}
    />
  )
}
