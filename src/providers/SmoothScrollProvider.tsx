import { type PropsWithChildren, useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return children
}
