import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  LenisActionsContext,
  ScrollProgressContext,
} from './scrollContext'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      let ticking = false
      const handleNativeScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const total = document.documentElement.scrollHeight - window.innerHeight
            if (total > 0) {
              setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)))
            }
            ticking = false
          })
          ticking = true
        }
      }
      window.addEventListener('scroll', handleNativeScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleNativeScroll)
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    })

    lenisRef.current = lenis

    // Synchronize Lenis scroll with ScrollTrigger and throttle progress state updates
    let lastProgress = 0
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      const currentProgress = e.progress
      if (Math.abs(currentProgress - lastProgress) > 0.004 || currentProgress === 0 || currentProgress === 1) {
        lastProgress = currentProgress
        setScrollProgress(currentProgress)
      }
    })

    // Unified animation frame using GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)

    return () => {
      clearTimeout(timeout)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: { offset?: number; duration?: number; immediate?: boolean }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.2,
          immediate: options?.immediate ?? false,
        })
      } else {
        if (typeof target === 'string') {
          const el = document.querySelector(target)
          el?.scrollIntoView({ behavior: 'smooth' })
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' })
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    []
  )

  const actionsValue = useMemo(
    () => ({
      scrollTo,
    }),
    [scrollTo]
  )

  return (
    <LenisActionsContext.Provider value={actionsValue}>
      <ScrollProgressContext.Provider value={scrollProgress}>
        {children}
      </ScrollProgressContext.Provider>
    </LenisActionsContext.Provider>
  )
}
