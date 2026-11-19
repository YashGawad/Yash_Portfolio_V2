import { useRef, type ReactNode, type MouseEvent } from 'react'
import gsap from 'gsap'
import { isReducedMotion, isFinePointer, MOTION_TIMING, MOTION_EASING } from '../../lib/animations'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.2, className = '' }: MagneticProps) {
  const elementRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Only execute on desktop with fine mouse pointer and when reduced motion is not requested
    if (!isFinePointer() || isReducedMotion()) return

    const el = elementRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Bounded subtle displacement
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: MOTION_TIMING.micro,
      ease: MOTION_EASING.springLike,
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    const el = elementRef.current
    if (!el) return

    // Smooth return to resting state without artificial jitter
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: MOTION_TIMING.component,
      ease: MOTION_EASING.default,
      overwrite: 'auto',
    })
  }

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  )
}
