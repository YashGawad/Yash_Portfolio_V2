import { useEffect, useRef } from 'react'
import { isReducedMotion, isFinePointer } from '../../lib/animations'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isDesktop = isFinePointer() && width >= 768
    // Lightweight count: 16 on mobile (no lines), 40 on desktop
    const particleCount = isDesktop ? 40 : 16
    const connectionDistance = 120
    const mouseRadius = isDesktop ? 140 : 0

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    }

    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
      })
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Mouse movement only for fine pointer desktop
    let handleMouseMove: ((e: MouseEvent) => void) | null = null
    let handleMouseLeave: (() => void) | null = null

    if (isDesktop) {
      handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        mouse.active = true
      }

      handleMouseLeave = () => {
        mouse.active = false
        mouse.x = -1000
        mouse.y = -1000
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('mouseleave', handleMouseLeave)
    }

    // Pause rendering when page is hidden OR when user has scrolled past hero section (> 1.25 * viewport height)
    let isPageVisible = !document.hidden
    let isInHeroViewport = window.scrollY < window.innerHeight * 1.25

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          isInHeroViewport = window.scrollY < window.innerHeight * 1.25
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Render loop
    const render = () => {
      if (!isPageVisible || !isInHeroViewport) {
        // Idling while not in hero or page hidden to conserve 100% GPU/CPU
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        // Wrap edges smoothly
        if (p.x < -10) p.x = width + 10
        else if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        else if (p.y > height + 10) p.y = -10

        // Desktop mouse repulsion
        if (mouse.active && isDesktop) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.7
            p.x += (dx / dist) * force * 1.8
            p.y += (dy / dist) * force * 1.8
          }
        }

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.baseAlpha})`
        ctx.fill()

        // Connect nearby particles (desktop only for performance)
        if (isDesktop) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.14
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`
              ctx.lineWidth = 0.75
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove)
      if (handleMouseLeave) window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-700"
    />
  )
}
