import type { ReactNode } from 'react'

interface SectionHeadingProps {
  number?: string
  tag: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  children?: ReactNode
  className?: string
}

export function SectionHeading({
  number,
  tag,
  title,
  subtitle,
  align = 'left',
  children,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={`section-heading-container mb-12 md:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono tracking-wider uppercase border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {number && <span className="text-cyan-500/80">{number}</span>}
        <span>{tag}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}

