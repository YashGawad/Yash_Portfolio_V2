import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes subtle scroll-triggered reveals for section containers.
 * Cleans up on return for robust React lifecycle adherence.
 */
export function initScrollAnimations(): () => void {
  // Check prefers-reduced-motion
  if (typeof window === 'undefined') return () => {}
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return () => {}

  const ctx = gsap.context(() => {
    // Subtle fade and upward translation for sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.88, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    })
  })

  return () => {
    ctx.revert()
  }
}

