import { useEffect, useRef, useState } from 'react'
import App from '@/App.tsx'

const idleBackground = { x: 0.46, y: 0.24 }
const lightSurfaceSelector = '#features, #benefits, #faq'
const toDataUri = (markup: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`
const benefitVisuals = [
  toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <circle cx="92" cy="74" r="34" fill="#EFF8F7"/>
    <path d="M42 140H178" stroke="#73DDD3" stroke-width="8" stroke-linecap="round"/>
    <path d="M198 118C226 118 248 140 248 168" stroke="#2B8D88" stroke-width="10" stroke-linecap="round"/>
    <circle cx="248" cy="168" r="9" fill="#2B8D88"/>
    <path d="M294 114H432" stroke="#C2D3DB" stroke-width="4" stroke-dasharray="10 12"/>
    <path d="M294 168H474" stroke="#C2D3DB" stroke-width="4" stroke-dasharray="10 12"/>
    <circle cx="454" cy="114" r="9" fill="#E5EEF1"/>
    <circle cx="506" cy="168" r="9" fill="#E5EEF1"/>
  </svg>`),
  toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <path d="M70 126H520" stroke="#C7D7DE" stroke-width="4" stroke-dasharray="10 12"/>
    <path d="M236 62V198" stroke="url(#lineA)" stroke-width="5"/>
    <path d="M382 72V190" stroke="url(#lineB)" stroke-width="5"/>
    <circle cx="126" cy="86" r="28" fill="#F6FBFA"/>
    <circle cx="282" cy="80" r="24" fill="#BDEFE8"/>
    <circle cx="432" cy="148" r="18" fill="#DCE9EE"/>
    <defs>
      <linearGradient id="lineA" x1="236" y1="62" x2="236" y2="198" gradientUnits="userSpaceOnUse">
        <stop stop-color="transparent"/><stop offset=".5" stop-color="#9FDCD8"/><stop offset="1" stop-color="transparent"/>
      </linearGradient>
      <linearGradient id="lineB" x1="382" y1="72" x2="382" y2="190" gradientUnits="userSpaceOnUse">
        <stop stop-color="transparent"/><stop offset=".5" stop-color="#79B7C6"/><stop offset="1" stop-color="transparent"/>
      </linearGradient>
    </defs>
  </svg>`),
  toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <path d="M74 82H210" stroke="#7BE3D9" stroke-width="8" stroke-linecap="round"/>
    <path d="M266 68V190" stroke="url(#speed)" stroke-width="5"/>
    <path d="M356 92H532" stroke="#B9CCD6" stroke-width="4" stroke-dasharray="10 12"/>
    <circle cx="126" cy="64" r="26" fill="#F5FBFB"/>
    <circle cx="478" cy="92" r="10" fill="#DDE7EB"/>
    <path d="M332 132H566" stroke="#C5D6DE" stroke-width="4" stroke-dasharray="10 12"/>
    <circle cx="552" cy="132" r="10" fill="#DDE7EB"/>
    <defs>
      <linearGradient id="speed" x1="266" y1="68" x2="266" y2="190" gradientUnits="userSpaceOnUse">
        <stop stop-color="transparent"/><stop offset=".52" stop-color="#CFE6EC"/><stop offset="1" stop-color="transparent"/>
      </linearGradient>
    </defs>
  </svg>`),
  toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <rect x="70" y="46" width="222" height="108" rx="22" fill="#F8FCFC" stroke="#D7E5EA"/>
    <rect x="112" y="78" width="222" height="108" rx="22" fill="#FFFFFF" fill-opacity=".92" stroke="#D7E5EA"/>
    <rect x="154" y="108" width="246" height="112" rx="24" fill="#FFFFFF" stroke="#D1E1E7"/>
    <rect x="118" y="132" width="206" height="50" rx="18" fill="#FFFFFF" stroke="#D7E5EA"/>
    <path d="M144 156H272" stroke="#2B8D88" stroke-width="6" stroke-linecap="round"/>
    <circle cx="492" cy="82" r="22" fill="#E4F6F4"/>
    <circle cx="542" cy="146" r="16" fill="#D8E7EC"/>
  </svg>`),
]

function AnimatedCursor({ themeRef }: { themeRef: { current: HTMLDivElement | null } }) {
  const ringRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const currentRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const backgroundCurrentRef = useRef(idleBackground)
  const backgroundTargetRef = useRef(idleBackground)
  const lightSurfaceRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isOnLightSurface, setIsOnLightSurface] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches) {
      return
    }

    let frame = 0

    const writeBackgroundMotion = (x: number, y: number) => {
      const theme = themeRef.current

      if (!theme) {
        return
      }

      const clampedX = Math.min(Math.max(x, 0.08), 0.92)
      const clampedY = Math.min(Math.max(y, 0.08), 0.88)
      const accentX = 78 - (clampedX - 0.5) * 28
      const accentY = 72 - (clampedY - 0.32) * 24
      const shiftX = (clampedX - 0.5) * 72
      const shiftY = (clampedY - 0.34) * 56

      theme.style.setProperty('--v5-mouse-x', `${(clampedX * 100).toFixed(2)}%`)
      theme.style.setProperty('--v5-mouse-y', `${(clampedY * 100).toFixed(2)}%`)
      theme.style.setProperty('--v5-mouse-accent-x', `${accentX.toFixed(2)}%`)
      theme.style.setProperty('--v5-mouse-accent-y', `${accentY.toFixed(2)}%`)
      theme.style.setProperty('--v5-mouse-shift-x', `${shiftX.toFixed(2)}px`)
      theme.style.setProperty('--v5-mouse-shift-y', `${shiftY.toFixed(2)}px`)
    }

    const updateCursor = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.16
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.16

      if (!reduceMotion.matches) {
        backgroundCurrentRef.current.x +=
          (backgroundTargetRef.current.x - backgroundCurrentRef.current.x) * 0.075
        backgroundCurrentRef.current.y +=
          (backgroundTargetRef.current.y - backgroundCurrentRef.current.y) * 0.075

        writeBackgroundMotion(backgroundCurrentRef.current.x, backgroundCurrentRef.current.y)
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`
      }

      frame = window.requestAnimationFrame(updateCursor)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY }
      backgroundTargetRef.current = {
        x: event.clientX / Math.max(window.innerWidth, 1),
        y: event.clientY / Math.max(window.innerHeight, 1),
      }

      setIsVisible(true)

      const elementUnderPointer = document.elementFromPoint(event.clientX, event.clientY)
      const nextOnLightSurface = Boolean(elementUnderPointer?.closest(lightSurfaceSelector))

      if (lightSurfaceRef.current !== nextOnLightSurface) {
        lightSurfaceRef.current = nextOnLightSurface
        setIsOnLightSurface(nextOnLightSurface)
      }

      const target = event.target

      if (target instanceof Element) {
        const nextInteractive = Boolean(
          target.closest('a, button, input, textarea, select, label, [role="button"]'),
        )

        setIsInteractive((current) => (current === nextInteractive ? current : nextInteractive))
      }
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
      lightSurfaceRef.current = false
      setIsOnLightSurface(false)
      backgroundTargetRef.current = idleBackground
    }
    const handlePointerDown = () => setIsPressed(true)
    const handlePointerUp = () => setIsPressed(false)

    writeBackgroundMotion(idleBackground.x, idleBackground.y)
    frame = window.requestAnimationFrame(updateCursor)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [themeRef])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`v5-cursor-ring${isVisible ? ' is-visible' : ''}${isInteractive ? ' is-interactive' : ''}${isOnLightSurface ? ' on-light' : ''}${isPressed ? ' is-pressed' : ''}`}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`v5-cursor-dot${isVisible ? ' is-visible' : ''}${isInteractive ? ' is-interactive' : ''}${isOnLightSurface ? ' on-light' : ''}${isPressed ? ' is-pressed' : ''}`}
      />
    </>
  )
}

function AppV5() {
  const themeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const theme = themeRef.current

    if (!theme) {
      return
    }

    const applyV5Enhancements = () => {
      theme.querySelectorAll<HTMLElement>(lightSurfaceSelector).forEach((section) => {
        section.classList.add('v5-light-surface')
      })

      const headerBrand = theme.querySelector<HTMLElement>('header a[href="#top"]')

      if (headerBrand) {
        headerBrand.classList.add('v5-brand-lockup')
        headerBrand.querySelector<HTMLElement>(':scope > div:first-child')?.classList.add('v5-brand-icon')

        const brandText = headerBrand.querySelector<HTMLElement>(':scope > div:last-child')
        const primary = brandText?.querySelector<HTMLElement>(':scope > div:first-child')
        const secondary = brandText?.querySelector<HTMLElement>(':scope > div:last-child')

        brandText?.classList.add('v5-brand-text')

        if (primary && primary.textContent !== 'Cuno Consulting') {
          primary.textContent = 'Cuno Consulting'
        }

        if (secondary?.textContent) {
          secondary.textContent = ''
        }
      }

      theme.querySelectorAll<HTMLElement>('div').forEach((element) => {
        if (element.textContent?.trim() !== 'Cuno') {
          return
        }

        const next = element.nextElementSibling

        if (!(next instanceof HTMLElement) || next.textContent?.trim() !== 'Senior finance support') {
          return
        }

        element.textContent = 'Cuno Consulting'
        element.classList.add('v5-mobile-brand-title')
        next.textContent = ''
      })

      theme.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
        const rawSource = image.getAttribute('src')

        if (rawSource?.startsWith('./media/voxr/')) {
          image.setAttribute('src', rawSource.replace('./media/voxr/', '../media/voxr/'))
        }
      })

      theme.querySelectorAll<HTMLElement>('[style]').forEach((element) => {
        const currentBackground = element.style.backgroundImage

        if (currentBackground.includes('./media/voxr/')) {
          element.style.backgroundImage = currentBackground.replaceAll('./media/voxr/', '../media/voxr/')
        }
      })

      const heroMetricLabel = theme.querySelector<HTMLElement>(
        'main section:first-of-type .surface-glass .text-sm.text-lilac',
      )

      theme
        .querySelector<HTMLElement>('main section:first-of-type .rounded-pill')
        ?.classList.add('v5-hero-pill')

      if (heroMetricLabel && heroMetricLabel.textContent !== 'Reporting') {
        heroMetricLabel.textContent = 'Reporting'
      }

      theme
        .querySelector<HTMLElement>('#contact')
        ?.closest<HTMLElement>('.gradient-outline')
        ?.classList.add('v5-hero-consultation-card')
      theme
        .querySelector<HTMLElement>('#contact')
        ?.closest<HTMLElement>('.relative')
        ?.classList.add('v5-hero-consultation-wrap')

      theme.querySelector<HTMLElement>('.marquee-track')?.parentElement?.classList.add('v5-hero-marquee-shell')

      theme.querySelectorAll<HTMLElement>('#features article.feature-card').forEach((card) => {
        card.classList.add('v5-feature-card')
      })

      const desktopJourneyTrack = theme.querySelector<HTMLElement>('#journey .hidden.lg\\:flex')
      desktopJourneyTrack?.firstElementChild?.classList.add('v5-journey-intro')

      const journeySection = theme.querySelector<HTMLElement>('#journey')

      if (journeySection) {
        journeySection.classList.add('v5-journey-section')

        if (!journeySection.querySelector('.v5-journey-mark')) {
          const journeyMark = document.createElement('div')
          journeyMark.className = 'v5-journey-mark'
          journeyMark.setAttribute('aria-hidden', 'true')
          journeySection.prepend(journeyMark)
        }
      }

      theme.querySelectorAll<HTMLElement>('#journey article').forEach((card) => {
        if (card.textContent?.includes('Ready for clear monthly numbers')) {
          card.classList.add('v5-journey-ready-card')
        }
      })

      const outcomesSection = Array.from(theme.querySelectorAll<HTMLElement>('main section')).find(
        (section) => section.textContent?.includes('Finance support that delivers operating control.'),
      )

      if (outcomesSection) {
        outcomesSection.classList.add('v5-outcomes-section')
        outcomesSection
          .querySelector<HTMLElement>(':scope > .pointer-events-none.absolute')
          ?.classList.add('v5-outcomes-glow')
      }

      theme.querySelectorAll<HTMLElement>('#benefits article').forEach((card, index) => {
        card.classList.add('v5-benefit-card')
        const image = card.querySelector<HTMLImageElement>('img')

        image?.classList.add('v5-benefit-art')

        if (image && benefitVisuals[index]) {
          image.setAttribute('src', benefitVisuals[index])
        }
      })

      const finalCtaSection = Array.from(theme.querySelectorAll<HTMLElement>('main section')).find(
        (section) => section.textContent?.includes('Make the finance function easier to manage each month.'),
      )

      if (finalCtaSection) {
        finalCtaSection.classList.add('v5-final-cta-section')
        finalCtaSection.querySelector<HTMLElement>('a[href="#contact"]')?.classList.add('v5-final-cta-primary')
        finalCtaSection.querySelector<HTMLElement>('a[href="#features"]')?.classList.add('v5-final-cta-secondary')

        Array.from(finalCtaSection.querySelectorAll<HTMLElement>('div')).forEach((element) => {
          if (element.textContent?.includes('City of London')) {
            element.classList.add('v5-location-chips')
          }
        })
      }
    }

    applyV5Enhancements()

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(applyV5Enhancements)
    })

    observer.observe(theme, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <AnimatedCursor themeRef={themeRef} />
      <div ref={themeRef} className="v5-theme">
        <App />
      </div>
    </>
  )
}

export default AppV5
