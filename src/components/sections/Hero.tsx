import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  ArrowRight,
  Download,
  Mail,
  Phone,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { Container } from '../common/Container'
import { Button } from '../common/Button'
import { Magnetic } from '../common/Magnetic'
import { GithubIcon, LinkedinIcon } from '../common/Icons'
import { PORTFOLIO_DATA } from '../../data/portfolio'
import { getAssetUrl } from '../../lib/asset'
import { useLenis } from '../layout/SmoothScrollProvider'

export function Hero() {
  const { identity } = PORTFOLIO_DATA
  const { scrollTo } = useLenis()
  const heroRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const resumeUrl = getAssetUrl(identity.resumePdf)
  const profileImageUrl = getAssetUrl(identity.profileImage)

  const headlineWords = identity.headline.split(' ')

  // Coordinated GSAP Hero Entrance Timeline
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })

      // 1. Status Pill entrance
      tl.fromTo(
        '.hero-status-pill',
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )

      // 2. Headline masked words staggered reveal
      tl.fromTo(
        '.hero-headline-word',
        { y: '110%', opacity: 0, rotateZ: 2 },
        { y: '0%', opacity: 1, rotateZ: 0, stagger: 0.05, duration: 0.75, ease: 'power4.out' },
        '-=0.3'
      )

      // 3. Intro description & tags
      tl.fromTo(
        '.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )

      tl.fromTo(
        '.hero-tag-item',
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.45 },
        '-=0.35'
      )

      // 4. CTA buttons & Socials
      tl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
        '-=0.25'
      )

      tl.fromTo(
        '.hero-social-bar',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // 5. Profile image mask clip reveal & scale down
      if (imageContainerRef.current && imageRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1, duration: 1.1, ease: 'power4.inOut' },
          0.3
        )

        tl.fromTo(
          imageRef.current,
          { scale: 1.2, filter: 'contrast(1.2) brightness(0.8)' },
          { scale: 1, filter: 'contrast(1.02) brightness(1)', duration: 1.2, ease: 'power3.out' },
          0.3
        )
      }

      // 6. Floating micro badges
      tl.fromTo(
        [badgeRef.current, terminalRef.current],
        { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.55 },
        '-=0.4'
      )
    },
    { scope: heroRef }
  )

  // Interactive mouse parallax on desktop
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { clientX, clientY } = e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const moveX = (clientX - centerX) / centerX
    const moveY = (clientY - centerY) / centerY

    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        x: moveX * 12,
        y: moveY * 12,
        duration: 0.6,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }

    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: -moveX * 16,
        y: -moveY * 16,
        duration: 0.5,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }

    if (terminalRef.current) {
      gsap.to(terminalRef.current, {
        x: -moveX * 10,
        y: -moveY * 10,
        duration: 0.5,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-[94vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Dynamic Ambient Blur Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-sky-500/10 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Technical Positioning */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status / Identity Pill */}
            <div className="hero-status-pill inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-slate-900/80 border border-slate-700/60 text-slate-300 shadow-sm mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-semibold">Available</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{identity.title}</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400">{identity.specialization}</span>
            </div>

            {/* Masked Headline Reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {headlineWords.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden pb-1 mr-2.5 sm:mr-3.5">
                  <span className="hero-headline-word inline-block">
                    {word === 'digital' || word === 'products' ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </span>
                </span>
              ))}
            </h1>

            {/* Introduction Paragraph */}
            <p className="hero-description text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
              {identity.introduction}
            </p>

            {/* Supporting Specializations Capsules */}
            <div className="flex flex-wrap gap-2 mb-10">
              {identity.supportingAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="hero-tag-item px-3 py-1 text-xs font-mono rounded-lg bg-slate-900/70 border border-slate-800 text-slate-400 flex items-center gap-1.5 hover:border-cyan-500/40 hover:text-slate-200 transition-colors"
                >
                  <span className="text-cyan-400">#</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>

            {/* Call To Actions with Magnetic Interactions */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Magnetic strength={0.25}>
                <div className="hero-cta-btn w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => scrollTo('#work')}
                    iconRight={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Explore Selected Work
                  </Button>
                </div>
              </Magnetic>

              <Magnetic strength={0.25}>
                <div className="hero-cta-btn w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    iconLeft={<Download className="w-4 h-4 text-cyan-400" />}
                    className="w-full sm:w-auto"
                  >
                    Download Resume
                  </Button>
                </div>
              </Magnetic>
            </div>

            {/* Social Connectivity & Quick Contact Bar */}
            <div className="hero-social-bar flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/80 text-sm text-slate-400 w-full">
              <div className="flex items-center gap-3">
                <Magnetic strength={0.35}>
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:text-white hover:border-cyan-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </Magnetic>

                <Magnetic strength={0.35}>
                  <a
                    href={identity.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </Magnetic>

                <Magnetic strength={0.35}>
                  <a
                    href={identity.emailSendHref}
                    aria-label={`Send email to ${identity.email}`}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </Magnetic>

                <Magnetic strength={0.35}>
                  <a
                    href={identity.phoneHref}
                    aria-label={`Call Yash Gawad: ${identity.phone}`}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Computer Engineering Scholar</span>
                <span className="text-slate-600">/</span>
                <a
                  href={identity.phoneHref}
                  className="text-slate-300 hover:text-cyan-300 transition-colors font-semibold"
                >
                  {identity.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Profile Frame with Mask Reveal & Parallax */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Glowing Border Card */}
              <div
                ref={imageContainerRef}
                className="relative rounded-3xl p-2.5 bg-gradient-to-b from-slate-700/50 via-slate-800/40 to-slate-900/80 border border-slate-700/60 backdrop-blur-xl shadow-2xl shadow-cyan-950/40"
              >
                {/* Image Aspect Box */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    ref={imageRef}
                    src={profileImageUrl}
                    alt="Yash Gawad - Software Developer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* High Legibility Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Bottom Overlay Pill */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-left shadow-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs font-bold text-white tracking-wide">
                        Yash Gawad
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Full-Stack &amp; AI
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                      Engineering web applications, scalable backend APIs &amp; cloud-integrated systems.
                    </p>
                  </div>
                </div>

                {/* Floating Technical Specs Tag */}
                <div
                  ref={badgeRef}
                  className="absolute -top-4 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-2xl backdrop-blur-lg"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>React • Node • Postgres • AWS</span>
                </div>

                {/* Floating Status Terminal Tag */}
                <div
                  ref={terminalRef}
                  className="absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700/90 text-[11px] font-mono text-slate-300 shadow-2xl backdrop-blur-lg"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>status: building_products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
