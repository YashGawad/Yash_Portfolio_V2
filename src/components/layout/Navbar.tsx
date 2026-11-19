import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react'
import { Container } from '../common/Container'
import { ThemeToggle } from '../common/ThemeToggle'
import { Magnetic } from '../common/Magnetic'
import { getAssetUrl } from '../../lib/asset'
import { PORTFOLIO_DATA } from '../../data/portfolio'
import { useLenis } from './scrollContext'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Tech Arsenal', href: '#tech-arsenal' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [headerHeight, setHeaderHeight] = useState<number>(72)
  const headerRef = useRef<HTMLElement>(null)
  const { scrollTo } = useLenis()

  // Track real header height dynamically
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight, { passive: true })
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [isScrolled])

  // Scroll spy for active section and header background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = NAV_ITEMS.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i]
        const element = document.getElementById(sectionId)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    scrollTo(href, { offset: -30 })
  }

  const resumeUrl = getAssetUrl(PORTFOLIO_DATA.identity.resumePdf)

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-800/70 shadow-lg shadow-black/25'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <Container size="wide">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo / Monogram */}
          <Magnetic strength={0.25}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#home')
              }}
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/60 transition-colors shadow-inner overflow-hidden">
                <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 text-lg">
                  YG
                </span>
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-bold tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
                  Yash Gawad
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Software Developer
                </div>
              </div>
            </a>
          </Magnetic>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-lg shadow-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <Magnetic key={item.href} strength={0.15}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive
                        ? 'text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/35 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                </Magnetic>
              )
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Resume button (Desktop) with Magnetic effect */}
            <Magnetic strength={0.2}>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-700/60 hover:border-cyan-400/50 hover:text-cyan-300 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </Magnetic>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: `${headerHeight}px`, maxHeight: `calc(100vh - ${headerHeight}px)` }}
            className="lg:hidden fixed inset-x-0 bg-[#07090e]/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-8 shadow-2xl flex flex-col gap-4 overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume (PDF)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="text-center text-xs font-mono text-slate-400 pt-2">
                <a href={PORTFOLIO_DATA.identity.phoneHref} className="text-slate-300 hover:text-cyan-300">
                  {PORTFOLIO_DATA.identity.phone}
                </a>{' '}
                • {PORTFOLIO_DATA.identity.status}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
