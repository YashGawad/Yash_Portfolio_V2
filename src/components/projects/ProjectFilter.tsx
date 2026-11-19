import { motion } from 'motion/react'

export type FilterCategory = 'All' | 'Client Work' | 'AI & Cloud' | 'Full-Stack Platform'

interface ProjectFilterProps {
  categories: FilterCategory[]
  activeCategory: FilterCategory
  onSelectCategory: (category: FilterCategory) => void
}

export function ProjectFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md w-fit">
      {categories.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isActive
                ? 'text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-xl bg-cyan-500 shadow-md shadow-cyan-500/25"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </div>
  )
}
