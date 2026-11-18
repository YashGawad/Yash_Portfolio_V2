import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('yg-theme')
      return savedTheme === 'light'
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isLight) {
      root.classList.add('light')
      root.classList.remove('dark')
      localStorage.setItem('yg-theme', 'light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      localStorage.setItem('yg-theme', 'dark')
    }
  }, [isLight])

  const toggleTheme = () => {
    setIsLight((prev) => !prev)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {isLight ? (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-300" />
      )}
    </button>
  )
}

