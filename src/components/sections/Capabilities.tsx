import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Layout, Server, Database, Cpu, ArrowUpRight } from 'lucide-react'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { PORTFOLIO_DATA } from '../../data/portfolio'
import { isReducedMotion, MOTION_TIMING, MOTION_EASING } from '../../lib/animations'

export function Capabilities() {
  const { capabilities } = PORTFOLIO_DATA
  const sectionRef = useRef<HTMLElement>(null)

  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-6 h-6 text-cyan-400" />,
    Server: <Server className="w-6 h-6 text-sky-400" />,
    Database: <Database className="w-6 h-6 text-blue-400" />,
    Cpu: <Cpu className="w-6 h-6 text-indigo-400" />,
  }

  useGSAP(
    () => {
      if (isReducedMotion()) return

      const cards = gsap.utils.toArray<HTMLElement>('.capability-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: MOTION_TIMING.entrance,
          ease: MOTION_EASING.entrance,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-24 md:py-36 relative scroll-mt-20 border-t border-slate-800/60"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[350px] bg-cyan-600/5 blur-[150px] pointer-events-none rounded-full" />

      <Container size="wide" className="relative z-10">
        <SectionHeading
          number="03"
          tag="Core Capabilities"
          title="Technical Specializations & Architecture"
          subtitle="Focused engineering competencies across the software stack, from intuitive client interfaces to distributed backend workflows and intelligent inference pipelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="capability-card group relative p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 hover:-translate-y-1 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle hover gradient sweep */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-cyan-500/6 via-transparent to-blue-500/6" />

              <div className="relative z-10">
                {/* Top Row: Index number & Category Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300">
                    {iconMap[cap.iconName] || <Layout className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    // 0{cap.number}
                  </span>
                </div>

                {/* Capability Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-3">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Technical Execution Details */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
                  {cap.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span className="text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status footer pill */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-slate-800/50">
                <span className="text-slate-400">Applied in Production Projects</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
