import { ArrowUp, Sparkles, Mail, Phone } from 'lucide-react'
import { Container } from '../common/Container'
import { useLenis, useScrollProgress } from './scrollContext'
import { Magnetic } from '../common/Magnetic'
import { GithubIcon, LinkedinIcon } from '../common/Icons'
import { PORTFOLIO_DATA } from '../../data/portfolio'

export function Footer() {
  const { identity } = PORTFOLIO_DATA
  const { scrollTo } = useLenis()
  const scrollProgress = useScrollProgress()

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.4 })
  }

  const currentYear = new Date().getFullYear()

  // Calculate circular SVG progress values
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - scrollProgress * circumference
  const percentNumber = Math.round(scrollProgress * 100)

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs relative">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Colophon */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-sm">
                YG
              </span>
              <span className="font-semibold text-slate-200">Yash Gawad</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-400">Software Developer</span>
            </div>
          </div>

          {/* Center: Direct Contact Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a
              href={identity.emailSendHref}
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{identity.email}</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <a
              href={identity.phoneHref}
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{identity.phone}</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-3">
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Copyright, Tech Stack credit & Interactive Back-to-Top Button */}
          <div className="flex items-center gap-5">
            <div className="text-center lg:text-right">
              <div className="font-mono text-slate-400">
                © {currentYear} Yash Gawad
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 mt-0.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>React 19 • TypeScript • Tailwind v4 • GSAP • Lenis</span>
              </div>
            </div>

            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label={`Back to top of page (scrolled ${percentNumber}%)`}
                className="relative p-2 rounded-2xl border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center group"
              >
                {/* SVG Circular Progress Track */}
                <svg className="w-10 h-10 -rotate-90 pointer-events-none" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    className="stroke-slate-800"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    className="stroke-cyan-400 transition-all duration-150 ease-out"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Arrow Icon in center */}
                <ArrowUp className="w-4 h-4 absolute text-slate-400 group-hover:text-cyan-300 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Magnetic>
          </div>
        </div>
      </Container>
    </footer>
  )
}
