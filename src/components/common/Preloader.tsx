import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setLoading(false)
      onComplete?.()
      return
    }

    // Snappy, realistic counter progression
    let current = 0
    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 8
      if (current >= 100) {
        current = 100
        setCount(100)
        clearInterval(timer)
        setTimeout(() => {
          setLoading(false)
          onComplete?.()
        }, 320)
      } else {
        setCount(current)
      }
    }, 45)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] text-slate-100 select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          {/* Monogram Box with Animated Glow Border */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(56,189,248,0.2)] overflow-hidden"
            >
              <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 tracking-tight">
                YG
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 to-transparent pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
            </motion.div>
          </div>

          {/* Developer Title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-base font-bold tracking-wider uppercase text-slate-200">
              Yash Gawad
            </h2>
            <p className="text-xs font-mono text-cyan-400/90 tracking-widest uppercase mt-0.5">
              Software Developer • Architecture &amp; Systems
            </p>
          </motion.div>

          {/* Digital Loading Gauge */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-56 h-1 bg-slate-800/90 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'easeOut', duration: 0.05 }}
              />
            </div>

            <div className="flex items-center justify-between w-56 text-[11px] font-mono text-slate-400">
              <span>SYSTEMS_INIT</span>
              <span className="text-cyan-300 font-bold">{count.toString().padStart(3, '0')}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
