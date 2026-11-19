import { createContext, useContext } from 'react'

export interface LenisActionsContextValue {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void
}

export const LenisActionsContext = createContext<LenisActionsContextValue>({
  scrollTo: () => {},
})

export const ScrollProgressContext = createContext<number>(0)

/**
 * Stable scroll actions hook (scrollTo function).
 * DOES NOT cause component re-renders when scrolling.
 */
export function useLenis() {
  return useContext(LenisActionsContext)
}

/**
 * Dynamic scroll progress hook (0 to 1).
 * Subscribe to this ONLY in components that visually display scroll progress.
 */
export function useScrollProgress() {
  return useContext(ScrollProgressContext)
}
