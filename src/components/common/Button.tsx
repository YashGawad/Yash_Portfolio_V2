import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react'

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  iconLeft?: ReactNode
  iconRight?: ReactNode
  children: ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-lg',
      md: 'px-5 py-2.5 text-sm font-medium gap-2 rounded-xl',
      lg: 'px-7 py-3.5 text-base font-semibold gap-2.5 rounded-xl',
    }[size]

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:scale-[1.02] active:scale-[0.98]',
      secondary:
        'bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-700/60 hover:border-cyan-400/50 hover:text-white backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-[0.98]',
      outline:
        'bg-transparent text-slate-300 border border-slate-700/80 hover:border-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-950/20 active:scale-[0.98]',
      ghost:
        'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 active:scale-[0.98]',
    }[variant]

    const baseClasses =
      'inline-flex items-center justify-center transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'

    const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`

    if ('href' in props && props.href !== undefined) {
      const { href, ...anchorProps } = props as ButtonAsAnchor
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClasses}
          {...anchorProps}
        >
          {iconLeft && <span className="shrink-0 transition-transform duration-300">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="shrink-0 transition-transform duration-300">{iconRight}</span>}
        </a>
      )
    }

    const buttonProps = props as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClasses}
        {...buttonProps}
      >
        {iconLeft && <span className="shrink-0 transition-transform duration-300">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="shrink-0 transition-transform duration-300">{iconRight}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

