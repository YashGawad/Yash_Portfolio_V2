import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { GraduationCap, Code2, Compass, CheckCircle } from 'lucide-react'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { PORTFOLIO_DATA } from '../../data/portfolio'
import { getAssetUrl } from '../../lib/asset'
import { isReducedMotion, MOTION_TIMING, MOTION_EASING } from '../../lib/animations'

export function About() {
  const { identity } = PORTFOLIO_DATA
  const profileImageUrl = getAssetUrl(identity.profileImage)
  const sectionRef = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const [displayedScore, setDisplayedScore] = useState('00.00%')

  const coreFocusAreas = [
    'Full-stack architecture from UI components to relational databases',
    'Robust backend API design with Node.js and Express',
    'Data modeling and query optimization in PostgreSQL & MySQL',
    'Practical machine learning deployment with Python, TensorFlow & Docker',
    'Cloud infrastructure deployments on AWS, Vercel & Render',
  ]

  useGSAP(
    () => {
      if (isReducedMotion()) {
        setDisplayedScore('83.09%')
        return
      }

      // Profile image reveal with smooth mask
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: MOTION_TIMING.signature,
            ease: MOTION_EASING.entrance,
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Staggered section element reveals
      gsap.fromTo(
        '.about-reveal-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: MOTION_TIMING.entrance,
          ease: MOTION_EASING.default,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // Animate 83.09% score counter once with natural deceleration
      const scoreObj = { val: 0 }
      gsap.to(scoreObj, {
        val: 83.09,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
        onUpdate: () => {
          setDisplayedScore(`${scoreObj.val.toFixed(2)}%`)
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 relative scroll-mt-20 border-t border-slate-800/60"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[350px] bg-blue-500/5 blur-[130px] pointer-events-none rounded-full" />

      <Container size="wide">
        <SectionHeading
          number="02"
          tag="About Me"
          title="Engineering Pragmatic Digital Products"
          subtitle="A focused overview of my developer journey, academic foundation, and engineering philosophy."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Portrait & Key Credentials Bento */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="about-reveal-item relative rounded-3xl p-3 bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl shadow-xl overflow-hidden group">
              <div
                ref={imageWrapperRef}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800"
              >
                <img
                  src={profileImageUrl}
                  alt="Yash Gawad in working environment"
                  className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-lg">
                  <div className="text-xs font-mono text-cyan-400 font-semibold">Yash Gawad</div>
                  <div className="text-xs text-slate-300">Software Developer • Computer Engineering</div>
                </div>
              </div>
            </div>

            {/* Academic Snapshot Card */}
            <div className="about-reveal-item p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-bold text-slate-100">
                    B.E. in Computer Engineering (2024–2027)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    St. John Institute of Technology and Management
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800/60">
                  <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                    <span>Diploma in Computer Engineering (2021–2024)</span>
                    <span
                      ref={counterRef}
                      className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                    >
                      {displayedScore}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Pravin Patil Polytechnic College • Distinction
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Development Interests */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Primary Bio Card */}
            <div className="about-reveal-item p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-xl shadow-xl flex-1 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-4">
                <Compass className="w-4 h-4" />
                <span>BACKGROUND &amp; PHILOSOPHY</span>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed mb-6 border-l-2 border-cyan-400 pl-4 py-1">
                "{identity.aboutBio}"
              </blockquote>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                My approach to software engineering centers around practical utility: translating real-world operational challenges into dependable software systems. Rather than viewing frontend and backend as isolated disciplines, I design applications with cohesive end-to-end data flow—from responsive interactive interfaces to structured relational databases and cloud APIs.
              </p>

              <div className="pt-6 border-t border-slate-800/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Key Development Proficiencies</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {coreFocusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="about-reveal-item grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/70">
              <div className="text-center p-2">
                <div className="text-xs font-mono text-slate-400">FOCUS</div>
                <div className="text-sm font-bold text-white mt-1">Full-Stack</div>
              </div>
              <div className="text-center p-2 border-l border-slate-800">
                <div className="text-xs font-mono text-slate-400">DATABASE</div>
                <div className="text-sm font-bold text-cyan-300 mt-1">Postgres &amp; MySQL</div>
              </div>
              <div className="text-center p-2 border-l border-slate-800">
                <div className="text-xs font-mono text-slate-400">INTELLIGENCE</div>
                <div className="text-sm font-bold text-sky-400 mt-1">AI &amp; Models</div>
              </div>
              <div className="text-center p-2 border-l border-slate-800">
                <div className="text-xs font-mono text-slate-400">EXPERIENCE</div>
                <div className="text-sm font-bold text-slate-300 mt-1">Projects &amp; Education</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
