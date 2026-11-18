import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectFilter, type FilterCategory } from '../projects/ProjectFilter'
import { ProjectDetailsModal } from '../projects/ProjectDetailsModal'
import { PORTFOLIO_DATA, type Project } from '../../data/portfolio'

export function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const categories: FilterCategory[] = [
    'All',
    'Client Work',
    'AI & Cloud',
    'Full-Stack Platform',
  ]

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter(
          (project) => project.category === activeCategory
        )

  // GSAP ScrollTrigger staggered card reveals
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const cards = gsap.utils.toArray<HTMLElement>('.project-card-item')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  )

  return (
    <section ref={sectionRef} id="work" className="py-24 md:py-36 relative scroll-mt-20">
      {/* Dynamic Ambient Background Highlights */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <Container size="wide" className="relative z-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            number="01"
            tag="Selected Work"
            title="Engineered Products & Applications"
            subtitle="Explore software systems built to solve practical business and engineering problems, featuring clean client-server architectures and production deployments."
            className="mb-0"
          />

          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Project List */}
        <div className="space-y-12 lg:space-y-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={index === 0}
              index={index}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </Container>

      {/* Case Study Deep-Dive Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
