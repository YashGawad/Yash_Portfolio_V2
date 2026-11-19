import { useRef, useEffect, type MouseEvent } from 'react'
import { ExternalLink, Layers, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/portfolio'
import { Button } from '../common/Button'
import { Magnetic } from '../common/Magnetic'
import { GithubIcon } from '../common/Icons'
import { getAssetUrl } from '../../lib/asset'
import { isReducedMotion, isFinePointer, MOTION_EASING } from '../../lib/animations'
import gsap from 'gsap'

interface ProjectCardProps {
  project: Project
  onOpenDetails: (project: Project) => void
  priority?: boolean
  index?: number
}

export function ProjectCard({
  project,
  onOpenDetails,
  priority = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const quickToTiltX = useRef<((val: number) => void) | null>(null)
  const quickToTiltY = useRef<((val: number) => void) | null>(null)

  // Initialize GSAP quickTo handlers once on mount for ultra-efficient 60fps tilt
  useEffect(() => {
    if (!isFinePointer() || isReducedMotion() || !cardRef.current) return

    quickToTiltX.current = gsap.quickTo(cardRef.current, 'rotationX', {
      duration: 0.35,
      ease: MOTION_EASING.smooth,
    })
    quickToTiltY.current = gsap.quickTo(cardRef.current, 'rotationY', {
      duration: 0.35,
      ease: MOTION_EASING.smooth,
    })

    gsap.set(cardRef.current, {
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
    })

    return () => {
      quickToTiltX.current = null
      quickToTiltY.current = null
    }
  }, [])

  // High-performance pointer tracking without triggering any React re-renders
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer() || isReducedMotion() || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update spotlight via direct DOM manipulation
    if (spotlightRef.current) {
      const xPct = (x / rect.width) * 100
      const yPct = (y / rect.height) * 100
      spotlightRef.current.style.background = `radial-gradient(650px circle at ${xPct.toFixed(1)}% ${yPct.toFixed(1)}%, rgba(56, 189, 248, 0.12), transparent 45%)`
    }

    // Calculate subtle 3D tilt angles (bounded between -3.5 and +3.5 degrees)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = -((y - centerY) / centerY) * 3.5
    const tiltY = ((x - centerX) / centerX) * 3.5

    quickToTiltX.current?.(tiltX)
    quickToTiltY.current?.(tiltY)
  }

  const handleMouseEnter = () => {
    if (!isFinePointer() || isReducedMotion()) return
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    if (!isFinePointer() || isReducedMotion() || !cardRef.current) return

    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0'
    }

    // Smooth return to baseline resting position
    quickToTiltX.current?.(0)
    quickToTiltY.current?.(0)
  }

  const imageUrl = getAssetUrl(project.image)

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card-item group relative rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl transition-all duration-300 overflow-hidden shadow-2xl will-change-transform"
    >
      {/* Dynamic Cursor Spotlight Effect (Updated via DOM styles, zero React re-render) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-3xl"
      />

      {/* Subtle Animated Gradient Border Sweep */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-cyan-500/8 via-transparent to-blue-500/8" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full text-left order-2 lg:order-1">
          <div>
            {/* Top metadata badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                // {project.number}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {project.category}
              </span>

              {project.isInProgress && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 ml-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Real Client Project
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300 mb-2">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-cyan-400/90 mb-4">
              {project.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            {/* Feature Highlights (first 3) */}
            <div className="space-y-2 mb-6">
              {project.highlights.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-cyan-400 font-bold mt-0.5">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-950/90 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            <Magnetic strength={0.15}>
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  Live Demo
                </Button>
              </div>
            </Magnetic>

            {project.githubUrl && (
              <Magnetic strength={0.15}>
                <div>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    iconLeft={<GithubIcon className="w-3.5 h-3.5" />}
                  >
                    Code
                  </Button>
                </div>
              </Magnetic>
            )}

            <Magnetic strength={0.15}>
              <div className="ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenDetails(project)}
                  iconLeft={<Layers className="w-3.5 h-3.5 text-cyan-400" />}
                >
                  Architecture &amp; Specs
                </Button>
              </div>
            </Magnetic>
          </div>
        </div>

        {/* Right Preview Media Column */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div
            ref={imageContainerRef}
            onClick={() => onOpenDetails(project)}
            className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-cyan-500/50 shadow-2xl cursor-pointer aspect-[16/10] transition-all duration-300"
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`${project.title} Application Preview`}
              loading={priority ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Click to inspect badge overlay */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:border-cyan-400 transition-all shadow-lg">
              <ExternalLink className="w-3 h-3 text-cyan-400" />
              <span>Inspect Case Study</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
