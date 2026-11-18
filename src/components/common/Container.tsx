import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', size = 'default', ...props }, ref) => {
    const sizeClasses = {
      narrow: 'max-w-4xl',
      default: 'max-w-6xl',
      wide: 'max-w-7xl',
    }[size]

    return (
      <div
        ref={ref}
        className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

