import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Standardized Motion Timing & Easing Design Tokens
 */
export const MOTION_TIMING = {
  micro: 0.22,      // 220ms for button hover, icons, tags
  component: 0.38,  // 380ms for cards, filter transitions, small dialogs
  entrance: 0.75,   // 750ms for section headings & content reveals
  signature: 0.95,  // 950ms for hero reveals and large image masks
} as const

export const MOTION_EASING = {
  default: 'power3.out',
  smooth: 'power2.out',
  entrance: 'power4.out',
  springLike: 'power1.out',
  cubicBezier: [0.16, 1, 0.3, 1] as const,
} as const

/**
 * Check whether user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check whether device has a fine pointer (desktop mouse)
 */
export function isFinePointer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}

/**
 * Initializes subtle scroll-triggered reveals for section containers.
 * Cleans up on return for robust React lifecycle adherence.
 */
export function initScrollAnimations(): () => void {
  if (isReducedMotion()) return () => {}

  const ctx = gsap.context(() => {
    // Subtle staggered entrance for sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      // Find heading elements if present
      const heading = section.querySelector('.section-heading-container')
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION_TIMING.entrance,
            ease: MOTION_EASING.entrance,
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    })
  })

  return () => {
    ctx.revert()
  }
}
