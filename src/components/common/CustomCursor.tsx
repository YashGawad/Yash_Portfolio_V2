import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFinePointer] = useState(() => {
    if (typeof window === 'undefined') return false
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduced
  })

  useEffect(() => {
    if (!isFinePointer) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      setIsVisible(true)

      // Move inner dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    // Smooth lerp loop for the outer trailing ring
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    // Listen for mouseenter/mouseleave on window
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hover over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, textarea, .interactive-hover')
      setIsHovered(!!interactive)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleElementHover, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <>
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -mt-1 -ml-1 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] transition-opacity duration-200 mix-blend-screen shadow-[0_0_8px_rgba(56,189,248,0.8)] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Lagging Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -mt-4 -ml-4 w-8 h-8 rounded-full border border-cyan-400/60 pointer-events-none z-[9998] transition-all duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'scale-175 border-cyan-300 bg-cyan-400/10 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
            : 'scale-100'
        }`}
      />
    </>
  )
}
