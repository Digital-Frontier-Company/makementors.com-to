"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ParticleBackground() {
  const mountRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      particles: THREE.Points,
      mouseY = 0

    const init = () => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
      camera.position.z = 400

      const particleCount = 5000
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))

      const material = new THREE.PointsMaterial({
        size: 2,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      renderer = new THREE.WebGLRenderer({ canvas: mountRef.current!, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      document.addEventListener("mousemove", onDocumentMouseMove)
      window.addEventListener("resize", onWindowResize)
    }

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseY = event.clientY - window.innerHeight / 2
    }

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const animate = () => {
      requestAnimationFrame(animate)
      const time = Date.now() * 0.00005
      camera.position.y += (-mouseY - camera.position.y) * 0.02
      particles.rotation.y = time * 0.2
      renderer.render(scene, camera)
    }

    init()
    animate()

    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove)
      window.removeEventListener("resize", onWindowResize)
      // Clean up Three.js resources
      if (renderer) {
        renderer.dispose()
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            object.material.dispose()
          }
        })
      }
    }
  }, [])

  return <canvas id="particles-canvas" ref={mountRef}></canvas>
}
