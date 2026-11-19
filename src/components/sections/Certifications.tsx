import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Award, GraduationCap, Calendar, CheckCircle2, BookmarkCheck } from 'lucide-react'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { PORTFOLIO_DATA } from '../../data/portfolio'
import { isReducedMotion, MOTION_TIMING, MOTION_EASING } from '../../lib/animations'

export function Certifications() {
  const { education, certifications } = PORTFOLIO_DATA
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (isReducedMotion()) return

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
              scrub: 0.5,
            },
          }
        )
      }

      // Staggered education entries reveal
      const eduCards = gsap.utils.toArray<HTMLElement>('.edu-card')
      gsap.fromTo(
        eduCards,
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: MOTION_TIMING.entrance,
          ease: MOTION_EASING.entrance,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // Staggered certification cards reveal
      const certCards = gsap.utils.toArray<HTMLElement>('.cert-card')
      gsap.fromTo(
        certCards,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: MOTION_TIMING.entrance,
          ease: MOTION_EASING.default,
          scrollTrigger: {
            trigger: '.cert-grid',
            start: 'top 82%',
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

          {/* Right Column: Industry Certifications Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
              <Award className="w-4 h-4" />
              <span>VERIFIED CREDENTIALS</span>
            </div>

            <div className="cert-grid grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="cert-card p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl hover:shadow-xl hover:shadow-cyan-950/20"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                        <BookmarkCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {cert.title}
                        </h3>
                        <div className="text-xs text-cyan-300/90 font-mono mt-0.5">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-cyan-400/90 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20 shrink-0">
                      Verified
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pl-12 pt-3 border-t border-slate-800/60">
                    <span className="text-[11px] font-mono text-slate-400">Key Competencies:</span>
                    {cert.skillsCovered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
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
