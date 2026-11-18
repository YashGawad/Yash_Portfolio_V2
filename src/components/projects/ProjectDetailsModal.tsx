import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  ExternalLink,
  Layers,
  CheckCircle2,
  Workflow,
  Cpu,
  Database,
  Globe,
  ArrowRight,
} from 'lucide-react'
import type { Project } from '../../data/portfolio'
import { Button } from '../common/Button'
import { GithubIcon } from '../common/Icons'
import { getAssetUrl } from '../../lib/asset'

interface ProjectDetailsModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  if (!project) return null

  const imageUrl = getAssetUrl(project.image)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-y-auto text-left z-10 my-auto"
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-cyan-400">
                // PROJECT {project.number}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">{project.category}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {project.title}
                </h3>
                {project.isInProgress && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    Real Client Project — In Progress
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-medium text-cyan-300/90 mb-4">
                {project.subtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.fullOverview}
              </p>
            </div>

            {/* Media preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] max-h-[380px]">
              <img
                src={imageUrl}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
            </div>

            {/* High-Level Architecture Flowchart */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white tracking-wide">
                  High-Level System Architecture
                </h4>
              </div>

              {/* Architecture diagram nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                    <Globe className="w-4 h-4" />
                    <span>CLIENT LAYER</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {project.architecture.frontend}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-mono mb-2">
                    <Cpu className="w-4 h-4" />
                    <span>APPLICATION &amp; API</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {project.architecture.backend}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-2">
                    <Database className="w-4 h-4" />
                    <span>PERSISTENCE &amp; STORAGE</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {project.architecture.database}
                  </div>
                </div>
              </div>

              {/* Flow pipeline */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                  Data &amp; Request Execution Flow:
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 text-xs font-mono text-slate-300">
                  {project.architecture.flow.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700/80">
                        {step}
                      </span>
                      {idx < project.architecture.flow.length - 1 && (
                        <ArrowRight className="hidden md:inline w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workflows if present */}
            {project.workflows && project.workflows.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-white tracking-wide">
                    Core Operational Workflows
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.workflows.map((wf, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80"
                    >
                      <h5 className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {wf.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {wf.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Highlights list */}
            <div>
              <h4 className="text-base font-bold text-white mb-3">Key Technical Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies pills */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons footer */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
              <Button
                variant="primary"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                iconRight={<ExternalLink className="w-4 h-4" />}
              >
                Open Live Website
              </Button>

              {project.githubUrl && (
                <Button
                  variant="secondary"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  iconLeft={<GithubIcon className="w-4 h-4" />}
                >
                  View GitHub Repository
                </Button>
              )}

              <Button variant="ghost" onClick={onClose} className="ml-auto">
                Close Case Study
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
