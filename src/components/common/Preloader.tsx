import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { isReducedMotion } from '../../lib/animations'

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false
    // Skip if user prefers reduced motion or has visited during this session
    if (isReducedMotion()) return false
    return !sessionStorage.getItem('yash_portfolio_visited')
  })

  useEffect(() => {
    if (!loading) {
      onComplete?.()
      return
    }

    // Short, elegant, branded intro transition (600ms total)
    const timer = setTimeout(() => {
      sessionStorage.setItem('yash_portfolio_visited', 'true')
      setLoading(false)
      onComplete?.()
    }, 650)

    return () => clearTimeout(timer)
  }, [loading, onComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] text-slate-100 select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

          {/* Monogram Box with Animated Glow Border */}
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_35px_rgba(56,189,248,0.25)] overflow-hidden"
            >
              <span className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 tracking-tight">
                YG
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 to-transparent pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
            </motion.div>
          </div>

          {/* Developer Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-sm sm:text-base font-bold tracking-wider uppercase text-slate-100">
              Yash Gawad
            </h2>
            <p className="text-[11px] font-mono text-cyan-400 tracking-widest uppercase mt-1">
              Software Developer • Full-Stack Systems
            </p>
          </motion.div>

          {/* Elegant Status Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 140, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
            className="h-0.5 mt-5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
