import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Award, GraduationCap, Calendar, CheckCircle2, BookmarkCheck } from 'lucide-react'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { PORTFOLIO_DATA } from '../../data/portfolio'

export function Certifications() {
  const { education, certifications } = PORTFOLIO_DATA
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      // Scroll-driven dynamic timeline line drawing
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: '.timeline-container',
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.6,
            },
          }
        )
      }

      // Staggered education entries reveal
      const eduCards = gsap.utils.toArray<HTMLElement>('.edu-card')
      gsap.fromTo(
        eduCards,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Staggered certification cards reveal
      const certCards = gsap.utils.toArray<HTMLElement>('.cert-card')
      gsap.fromTo(
        certCards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-24 md:py-36 relative scroll-mt-20 border-t border-slate-800/60"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[300px] bg-blue-600/5 blur-[130px] pointer-events-none rounded-full" />

      <Container size="wide" className="relative z-10">
        <SectionHeading
          number="05"
          tag="Credentials"
          title="Education & Technical Certifications"
          subtitle="Rigorous foundational computer engineering curriculum coupled with verified certifications in modern software architecture, database management, and emerging tech."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Academic Education Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC TIMELINE</span>
            </div>

            <div className="timeline-container relative pl-7 sm:pl-9 space-y-8">
              {/* Background inactive line */}
              <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-4 w-0.5 bg-slate-800" />
              
              {/* Scroll-driven active glowing line */}
              <div
                ref={lineRef}
                className="absolute left-[7px] sm:left-[11px] top-2 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
              />

              {education.map((item, index) => (
                <div key={index} className="edu-card relative group">
                  {/* Timeline node */}
                  <span className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(56,189,248,0.6)] z-10" />

                  <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </span>
                      {item.aggregate && (
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Score: {item.aggregate}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                      {item.degree}
                    </h3>
                    <div className="text-xs text-slate-400 font-medium mb-3">
                      {item.institution}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certification Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>

            <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="cert-card p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/20"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                        <BookmarkCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        // CERT 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-cyan-300/80 mb-4">
                      {cert.issuer}
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-800/60 mb-4">
                      {cert.skillsCovered.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/40 flex items-center justify-between">
                    <span>Credential Program</span>
                    <span className="text-emerald-400 font-medium">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
