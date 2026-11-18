import { useRef, useState, type MouseEvent } from 'react'
import { ExternalLink, Layers, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/portfolio'
import { Button } from '../common/Button'
import { Magnetic } from '../common/Magnetic'
import { GithubIcon } from '../common/Icons'
import { getAssetUrl } from '../../lib/asset'

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
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate spotlight position percentages
    const xPct = Math.round((x / rect.width) * 100)
    const yPct = Math.round((y / rect.height) * 100)
    setSpotlightPos({ x: xPct, y: yPct })

    // Calculate subtle 3D tilt angles (bounded between -4 and +4 degrees)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = -((y - centerY) / centerY) * 3.5
    const tiltY = ((x - centerX) / centerX) * 3.5

    setRotateX(tiltX)
    setRotateY(tiltY)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  const imageUrl = getAssetUrl(project.image)

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl transition-all duration-300 overflow-hidden shadow-2xl project-card-item`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(650px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(56, 189, 248, 0.12), transparent 45%)`,
        }}
      />

      {/* Subtle Animated Gradient Border Sweep */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />

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
                  Real Client Project — In Progress
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
            <Magnetic strength={0.2}>
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
              <Magnetic strength={0.2}>
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

            <Magnetic strength={0.2}>
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
            onClick={() => onOpenDetails(project)}
            className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 group-hover:border-cyan-500/50 shadow-2xl cursor-pointer aspect-[16/10] transition-all duration-300"
          >
            <img
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
