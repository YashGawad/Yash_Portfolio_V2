import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'motion/react'
import {
  Code,
  Server,
  Terminal,
  Database,
  Cloud,
  Wrench,
  Sparkles,
} from 'lucide-react'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { PORTFOLIO_DATA } from '../../data/portfolio'
import { isReducedMotion, MOTION_TIMING, MOTION_EASING } from '../../lib/animations'

export function TechArsenal() {
  const { techArsenal, marqueeSkills } = PORTFOLIO_DATA
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const sectionRef = useRef<HTMLElement>(null)

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Code className="w-4 h-4 text-cyan-400" />,
    Backend: <Server className="w-4 h-4 text-sky-400" />,
    'Programming Languages': <Terminal className="w-4 h-4 text-emerald-400" />,
    Databases: <Database className="w-4 h-4 text-indigo-400" />,
    'Cloud & Deployment': <Cloud className="w-4 h-4 text-blue-400" />,
    Tools: <Wrench className="w-4 h-4 text-amber-400" />,
  }

  const filteredCategories =
    selectedCategory === 'All'
      ? techArsenal
      : techArsenal.filter((cat) => cat.category === selectedCategory)

  // Staggered reveal for skill cards
  useGSAP(
    () => {
      if (isReducedMotion()) return

      const cards = gsap.utils.toArray<HTMLElement>('.tech-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: MOTION_TIMING.component,
          ease: MOTION_EASING.default,
        }
      )
    },
    { scope: sectionRef, dependencies: [selectedCategory] }
  )

  return (
    <section
      ref={sectionRef}
      id="tech-arsenal"
      className="py-24 md:py-36 relative scroll-mt-20 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-cyan-600/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Infinite Seamless Ticker Marquee with Pause on Hover */}
      <div className="relative w-full mb-16 py-3.5 border-y border-slate-800/80 bg-slate-950/70 backdrop-blur-md overflow-hidden select-none group/marquee">
        {/* Two identical sets translating -50% ensures a mathematically seamless infinite scroll */}
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] transition-all">
          {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 px-6 py-1 text-sm font-mono text-slate-300 tracking-wider hover:text-cyan-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-200">{skill}</span>
              <span className="text-slate-600">•</span>
            </div>
          ))}
        </div>
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            number="04"
            tag="Tech Arsenal"
            title="Tools, Frameworks & Languages"
            subtitle="Categorized technologies deployed across production platforms, backend services, cloud deployments and developer workflows."
            className="mb-0"
          />

          {/* Category Filter Pills with smooth sliding indicator */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md w-fit">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedCategory === 'All'
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {selectedCategory === 'All' && (
                <motion.div
                  layoutId="activeTechFilter"
                  className="absolute inset-0 rounded-xl bg-cyan-500 shadow-md shadow-cyan-500/25"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">All Categories</span>
            </button>
            {techArsenal.map((cat) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setSelectedCategory(cat.category)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  selectedCategory === cat.category
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {selectedCategory === cat.category && (
                  <motion.div
                    layoutId="activeTechFilter"
                    className="absolute inset-0 rounded-xl bg-cyan-500 shadow-md shadow-cyan-500/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="tech-card p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                    {categoryIcons[group.category] || (
                      <Terminal className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950/80 border border-slate-800/90 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-slate-500 font-sans">• {skill.tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{group.skills.length} Technologies</span>
                <span className="text-cyan-400">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
