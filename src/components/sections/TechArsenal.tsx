import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
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
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const cards = gsap.utils.toArray<HTMLElement>('.tech-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
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
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] transition-all">
          {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map(
            (skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-3 px-6 py-1 text-sm font-mono text-slate-300 tracking-wider hover:text-cyan-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-200">{skill}</span>
                <span className="text-slate-600">•</span>
              </div>
            )
          )}
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

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md w-fit">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              All Categories
            </button>
            {techArsenal.map((cat) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.category
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{cat.category}</span>
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
                    {categoryIcons[group.category] || <Code className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{group.category}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {group.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200"
                    >
                      <span className="text-xs font-medium text-slate-200 group-hover/item:text-cyan-300">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800/60 text-slate-400 group-hover/item:text-cyan-400/80">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{group.skills.length} core competencies</span>
                <span className="text-cyan-400">active</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
