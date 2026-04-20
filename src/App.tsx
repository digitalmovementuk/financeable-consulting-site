import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import {
  ArrowLeft,
  ArrowRight,
  BadgePoundSterling,
  Building2,
  CalendarClock,
  Landmark,
  LineChart,
  MapPin,
  Menu,
  NotebookTabs,
  Plus,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SplitType from 'split-type'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { gsap } from '@/lib/gsap'
import 'swiper/css'

const withBase = (file: string) => `${import.meta.env.BASE_URL}media/voxr/${file}`

const media = {
  hero: withBase('hero.avif'),
  processGlow: withBase('process-glow.avif'),
  frame: withBase('frame16.avif'),
  statLine: withBase('stat-line.svg'),
  illustrations: [
    withBase('illustration-0.avif'),
    withBase('illustration-1.avif'),
    withBase('illustration-2.avif'),
    withBase('illustration-3.avif'),
    withBase('illustration-4.avif'),
    withBase('illustration-5.avif'),
  ],
} as const

const navItems = [
  { label: 'Capabilities', href: '#features' },
  { label: 'Journey', href: '#journey' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
] as const

const trustChips = [
  'Senior Finance Support',
  'Management Reporting',
  'Cashflow Forecasting',
  'London-focused support',
] as const

const heroPoints = [
  ['Numbers', 'Monthly, decision-ready'],
  ['Cash insight', 'Forward-looking'],
  ['Support', 'Practical and commercially focused'],
] as const

const audienceStrip = [
  'Founder-led businesses',
  'Growing SMEs',
  'Senior finance support',
  'Management reporting',
  'Cashflow forecasting',
  'London-focused support',
  'Clear monthly decisions',
  'No commitment upfront',
] as const

type FeatureCardData = {
  tag: string
  title: string
  copy: string
  bullets: [string, string]
  icon: LucideIcon
  visual: 'routing' | 'cadence' | 'speed' | 'booking' | 'analytics' | 'local'
}

const featureCards: readonly FeatureCardData[] = [
  {
    tag: 'Senior Finance Support',
    title: 'Clarity, control and strong foundations',
    copy:
      'A recurring senior finance model for businesses that need clearer reporting, sharper decision support, and a dependable monthly operating rhythm.',
    bullets: ['Structured monthly reporting', 'Forward-looking financial insights'],
    icon: Landmark,
    visual: 'routing',
  },
  {
    tag: 'Management Reporting',
    title: 'Transforming your numbers into clear, decision-ready insight',
    copy:
      'Clear, accurate monthly reporting with focused commentary that leadership can use to make confident decisions.',
    bullets: ['Structured monthly management accounts', 'Variance analysis with clear explanations'],
    icon: NotebookTabs,
    visual: 'cadence',
  },
  {
    tag: 'Cashflow Forecasting',
    title: 'Forward cash visibility before pressure turns into risk',
    copy:
      'Rolling cash forecasting, structured planning cadence, and practical support give you a reliable view of liquidity and what is ahead.',
    bullets: ['Rolling cashflow forecast', 'Forward-looking decision support'],
    icon: Wallet,
    visual: 'speed',
  },
] as const

const processSteps = [
  {
    number: '01',
    title: 'Your current setup',
    copy:
      'Identify where clarity is being lost through a full review of your current finance setup.',
  },
  {
    number: '02',
    title: 'The build',
    copy:
      'Establish a structured reporting and review cadence, tailored to how your business operates and grows.',
  },
  {
    number: '03',
    title: 'Improve control',
    copy:
      'Tighten visibility across reporting, planning, and cash so finance is easier to manage and act on.',
  },
  {
    number: '04',
    title: 'Stronger support',
    copy:
      'Use finance as a guide for short-term priorities and long-term direction.',
  },
  {
    number: '05',
    title: 'Refine your finance as your business grows',
    copy:
      'Ensure your reporting and forecasts evolve with the business rather than lag behind it.',
  },
] as const

const benefitSlides = [
  {
    title: 'More than reporting, less than a full-time senior finance hire',
    copy:
      'Built for businesses that need recurring senior finance input, but are not ready for a full-time CFO.',
    impact: 'Impact: clear monthly visibility before a full-time hire is needed.',
    image: media.illustrations[0],
  },
  {
    title: 'Decision-ready reporting instead of delayed monthly admin',
    copy:
      'Management reporting is built around relevant and timely information, not historic packs sent after the moment has passed.',
    impact: 'Impact: leaders work from a clear, current view.',
    image: media.illustrations[1],
  },
  {
    title: 'Forward cash visibility before pressure turns into risk',
    copy:
      'Cash is managed as a live business issue, not a last-minute bank balance check.',
    impact: 'Impact: fewer surprises around cash and timing.',
    image: media.illustrations[2],
  },
  {
    title: 'A monthly review cadence leadership will actually use',
    copy:
      'Finance runs on a structured monthly rhythm, making it easier to manage and act on each cycle.',
    impact: 'Impact: finance discussions become regular, calmer, and more actionable.',
    image: media.illustrations[3],
  },
] as const

const caseStudies = [
  {
    tags: ['Founder-led', 'Monthly Senior Finance Support', 'London'],
    title: 'Timely, relevant reporting',
    challenge:
      'Reporting arrives late, with limited visibility for planning and decision-making. Everything starts to feel like guesswork.',
    focus:
      'Monthly senior finance support tightens the reporting pack and introduces a consistent monthly review rhythm.',
    change:
      'A clear, decision-ready monthly picture instead of a backward-looking admin document.',
    stats: [
      ['Monthly', 'Decision-ready reporting'],
      ['Leadership Focus', 'Commercially useful support'],
      ['Clarity', 'Sharper monthly control'],
    ],
    principleTitle: 'No fake proof layer',
    principleCopy:
      'Trust is built through clear services, defined process, and realistic expectations, not fabricated reviews or inflated claims.',
  },
  {
    tags: ['Growth-stage', 'Cashflow', 'Planning'],
    title: 'Cash visibility before pressure becomes risk',
    challenge:
      'When receipts, spend, and commitments are not clearly tracked, cash risk becomes harder to control.',
    focus:
      'Cashflow management builds a rolling forecast and a practical decision cadence around cash inflows and outflows.',
    change:
      'Cash becomes a forward-looking management discussion, not a late-stage surprise.',
    stats: [
      ['Cash Control', 'Forward visibility'],
      ['Planning', 'Efficient planning'],
      ['Decisions', 'Confident decisions'],
    ],
    principleTitle: 'A commercially useful finance lens',
    principleCopy:
      'The focus stays on cash visibility and forward planning that supports action and business priorities.',
  },
  {
    tags: ['Management', 'Reporting', 'Leadership'],
    title: 'Management reporting for businesses that have outgrown informal finance',
    challenge:
      'Bookkeeping and year-end compliance may exist, but the leadership team still lacks dependable monthly finance support.',
    focus:
      'Cuno works alongside your team to add structure, interpretation, and a consistent management rhythm.',
    change:
      'Finance becomes easier to manage, information becomes useful, and performance insight supports better decisions.',
    stats: [
      ['Value Add', 'Sharper finance support'],
      ['Planning', 'Forward planning'],
      ['Growth', 'Growth-driven structure'],
    ],
    principleTitle: 'Built for later growth',
    principleCopy:
      'Designed to support the next stage of the business, with structure and clarity that scales as complexity increases.',
  },
] as const

const faqItems = [
  {
    question: 'Who is Cuno best suited to?',
    answer:
      'Founder-led businesses, growing SMEs, and small leadership teams that need stronger reporting, cash visibility, and practical finance support without hiring a full-time senior leader too early.',
  },
  {
    question: 'What services does Cuno offer?',
    answer:
      'The core services are Senior Finance Support, Management Reporting, and Cashflow Forecasting. Together they cover recurring finance leadership, better monthly visibility, and stronger control over planning and liquidity.',
  },
  {
    question: 'Does this replace our current accountant?',
    answer:
      'Not necessarily. The support can sit alongside an existing accountant, bookkeeper, or finance manager to add structure, interpretation, and decision support.',
  },
  {
    question: 'Is the service only for businesses in trouble?',
    answer:
      'No. It is often most useful when a business is growing, hiring, or managing more complexity than the current finance setup can handle comfortably.',
  },
  {
    question: 'How do we start?',
    answer:
      'The first step is a consultation to understand how reporting, cash planning, and finance decisions are working today and where more clarity is needed.',
  },
] as const

const locations = ['London', 'City of London', 'Westminster', 'Southwark', 'London Bridge', "King's Cross", 'Farringdon', 'Manchester'] as const

const darkButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-white/14 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-[#ead5ff]'
const lightButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-white/14 bg-white/6 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10'
const sectionHeadingLight =
  'mt-6 font-display text-4xl font-bold leading-[0.94] tracking-[-0.06em] text-[#16091f] md:text-6xl'
const sectionHeadingDark =
  'mt-6 font-display text-4xl font-bold leading-[0.94] tracking-[-0.06em] text-white md:text-6xl'

function SectionPill({
  children,
  theme = 'dark',
}: {
  children: string
  theme?: 'dark' | 'light'
}) {
  return (
    <div
      className={
        theme === 'dark'
          ? 'inline-flex items-center rounded-pill border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-lilac backdrop-blur-md'
          : 'inline-flex items-center rounded-pill border border-[#dfccef] bg-white px-4 py-2 text-sm text-[#7f34a4]'
      }
    >
      {children}
    </div>
  )
}

function ControlButton({
  label,
  onClick,
  icon,
  theme = 'dark',
}: {
  label: string
  onClick: () => void
  icon: 'left' | 'right'
  theme?: 'dark' | 'light'
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={
        theme === 'dark'
          ? 'flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white text-black transition hover:scale-[1.03]'
          : 'flex h-12 w-12 items-center justify-center rounded-full border border-[#decdf0] bg-[#7f34a4] text-white transition hover:scale-[1.03]'
      }
    >
      {icon === 'left' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
    </button>
  )
}

function FeatureVisual({
  icon: Icon,
  visual,
}: {
  icon: LucideIcon
  visual: FeatureCardData['visual']
}) {
  return (
    <div className="relative h-40 overflow-hidden rounded-[26px] border border-[#eee2f9] bg-[linear-gradient(180deg,#fff,#f8efff)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,52,164,0.14),transparent_46%)]" />
      {visual === 'routing' ? (
        <>
          <div className="absolute left-0 top-[4.6rem] h-1 w-24 rounded-full bg-[#7f34a4]" />
          <div className="absolute left-24 top-[4.15rem] h-11 w-11 rounded-full border-[4px] border-[#7f34a4] border-l-transparent border-t-transparent" />
          <div className="absolute left-[8.2rem] top-[4.95rem] h-3 w-3 rounded-full bg-[#7f34a4]" />
          <div className="absolute left-[10.2rem] top-[4.1rem] h-[1px] w-24 border-t border-dashed border-[#d4c4e5]" />
          <div className="absolute left-[10.2rem] top-[6.2rem] h-[1px] w-32 border-t border-dashed border-[#d4c4e5]" />
          <div className="absolute left-[12.8rem] top-[3.55rem] h-3 w-3 rounded-full bg-[#e5e0ea]" />
          <div className="absolute left-[14.8rem] top-[5.65rem] h-3 w-3 rounded-full bg-[#e5e0ea]" />
        </>
      ) : null}
      {visual === 'cadence' ? (
        <>
          <div className="absolute left-6 top-14 h-[1px] w-[78%] border-t border-dashed border-[#dfd3ea]" />
          <div className="absolute left-[7.3rem] top-[3.25rem] h-12 w-[2px] bg-[linear-gradient(180deg,transparent,#d7b7eb,transparent)]" />
          <div className="absolute left-10 top-10 h-6 w-6 rounded-full bg-white shadow-[0_12px_26px_rgba(0,0,0,0.06)]" />
          <div className="absolute left-[8rem] top-10 h-7 w-7 rounded-full bg-[#eeddff]" />
        </>
      ) : null}
      {visual === 'speed' ? (
        <>
          <div className="absolute left-6 top-9 h-[2px] w-20 rounded-full bg-[#8f2fd6]" />
          <div className="absolute left-[8.5rem] top-[2.75rem] h-16 w-[2px] bg-[linear-gradient(180deg,transparent,#d8bbf2,transparent)]" />
        </>
      ) : null}
      {visual === 'booking' ? (
        <>
          <div className="absolute left-8 top-7 h-20 w-48 rounded-[18px] border border-[#efe3f8] bg-white shadow-[0_12px_24px_rgba(32,15,52,0.04)]" />
          <div className="absolute left-12 top-10 h-20 w-48 rounded-[18px] border border-[#efe3f8] bg-white/90 shadow-[0_12px_24px_rgba(32,15,52,0.04)]" />
          <div className="absolute left-16 top-14 h-20 w-52 rounded-[18px] border border-[#ecdaf8] bg-white shadow-[0_20px_34px_rgba(32,15,52,0.08)]" />
          <div className="absolute left-10 top-[4.85rem] h-12 w-44 rounded-[16px] border border-[#e9ddf4] bg-white px-4 py-3 text-sm font-medium text-[#261232] shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
            Monthly review scheduled
          </div>
        </>
      ) : null}
      {visual === 'analytics' ? (
        <>
          <img
            src={media.statLine}
            alt=""
            className="absolute inset-x-0 top-2 h-24 w-full object-cover opacity-85"
          />
          <div className="absolute right-5 top-6 rounded-[16px] border border-[#ebddf6] bg-white/95 px-4 py-3 text-sm text-[#4d3e61] shadow-[0_16px_30px_rgba(0,0,0,0.05)]">
            <div>Forecast: aligned</div>
            <div>Cash: visible</div>
            <div>Review: monthly</div>
          </div>
        </>
      ) : null}
      {visual === 'local' ? (
        <>
          <div className="absolute left-7 top-6 flex w-[76%] items-center justify-between rounded-[16px] border border-[#ebddf6] bg-[#f2e4ff] px-4 py-3 text-sm font-medium text-[#7f34a4]">
            <span>London-led support</span>
            <span>UK</span>
          </div>
          {[
            ['Founder-led teams', 'Ready'],
            ['Growing SMEs', 'Structured'],
            ['Selected hubs', 'Flexible'],
          ].map(([title, status], index) => (
            <div
              key={title}
              className="absolute left-8 flex w-[74%] items-center justify-between rounded-[14px] border border-[#efe5f7] bg-white px-4 py-2.5 text-sm text-[#261232]"
              style={{ top: `${4.6 + index * 2.4}rem` }}
            >
              <span>{title}</span>
              <span className="text-[#7f34a4]">{status}</span>
            </div>
          ))}
        </>
      ) : null}
      <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#efe0fc] text-[#7f34a4] shadow-[0_16px_24px_rgba(127,52,164,0.12)]">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  )
}

function FeatureCard({ feature }: { feature: FeatureCardData }) {
  return (
    <article
      data-reveal
      className="surface-light feature-card relative overflow-hidden rounded-[30px] border border-[#eadcf5] bg-white p-6 shadow-[0_24px_70px_rgba(97,31,146,0.1)] md:p-7"
    >
      <FeatureVisual icon={feature.icon} visual={feature.visual} />
      <div className="mt-6 text-sm uppercase tracking-[0.28em] text-[#7f34a4]">{feature.tag}</div>
      <h3 className="mt-4 font-display text-[2rem] font-medium leading-tight tracking-[-0.045em] text-[#16091f]">
        {feature.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#5a4c6b]">{feature.copy}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {feature.bullets.map((bullet) => (
          <div
            key={bullet}
            className="rounded-[16px] border border-[#efe3f8] bg-[#fbf8fe] px-4 py-3 text-sm text-[#2a1535]"
          >
            {bullet}
          </div>
        ))}
      </div>
    </article>
  )
}

function App() {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
  const journeyRef = useRef<HTMLElement | null>(null)
  const journeyTrackRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [activeFaq, setActiveFaq] = useState(0)
  const [activeCase, setActiveCase] = useState(0)
  const [isHeaderSolid, setIsHeaderSolid] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [featureSwiper, setFeatureSwiper] = useState<SwiperType | null>(null)
  const [journeySwiper, setJourneySwiper] = useState<SwiperType | null>(null)
  const [benefitSwiper, setBenefitSwiper] = useState<SwiperType | null>(null)
  const [activeBenefit, setActiveBenefit] = useState(0)
  const activeCaseItem = caseStudies[activeCase] ?? caseStudies[0]

  useEffect(() => {
    const updateHeaderState = () => {
      setIsHeaderSolid(window.scrollY > 40)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateHeaderState)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useGSAP(
    () => {
      if (shouldReduceMotion || !heroTitleRef.current || !heroRef.current) {
        return
      }

      const split = new SplitType(heroTitleRef.current, {
        types: 'lines,words',
        lineClass: 'split-line',
      })

      gsap.from(split.words, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.028,
        duration: 0.82,
        ease: 'power3.out',
      })

      gsap.to('[data-hero-art]', {
        yPercent: 12,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('[data-hero-copy-motion]', {
        yPercent: -12,
        xPercent: 3,
        rotate: -2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-hero-copy-layer]').forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 20)

        gsap.to(layer, {
          yPercent: -depth,
          xPercent: depth * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })

      return () => {
        split.revert()
      }
    },
    { scope: heroRef, dependencies: [shouldReduceMotion] },
  )

  useGSAP(
    () => {
      if (shouldReduceMotion || !pageRef.current) {
        return
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        if (element.offsetParent === null) {
          return
        }

        gsap.fromTo(
          element,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        if (element.offsetParent === null) {
          return
        }

        const amount = Number(element.dataset.parallax ?? 70)
        const trigger = element.closest('[data-parallax-section]') ?? element

        gsap.fromTo(
          element,
          { y: amount * 0.2 },
          {
            y: -amount,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
      })
    },
    { scope: pageRef, dependencies: [shouldReduceMotion] },
  )

  useGSAP(
    () => {
      if (shouldReduceMotion || !journeyRef.current || !journeyTrackRef.current) {
        return
      }

      const section = journeyRef.current
      const track = journeyTrackRef.current
      const mediaQuery = gsap.matchMedia()

      mediaQuery.add('(min-width: 1024px)', () => {
        const distance = Math.max(0, track.scrollWidth - section.clientWidth + 280)

        gsap.set(track, { x: 0 })
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + 900}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('.journey-logo', {
          yPercent: -10,
          rotate: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + 900}`,
            scrub: 1,
          },
        })

        gsap.utils.toArray<HTMLElement>('.journey-card-desktop').forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: index % 2 === 0 ? -16 : 36,
              opacity: 0.78,
            },
            {
              y: index % 2 === 0 ? 24 : -14,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${distance + 900}`,
                scrub: 1,
              },
            },
          )
        })
      })

      return () => {
        mediaQuery.revert()
      }
    },
    { scope: journeyRef, dependencies: [shouldReduceMotion] },
  )

  return (
    <div ref={pageRef} className="overflow-x-hidden bg-canvas text-ink">
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isHeaderSolid
            ? 'border-b border-[#eadcf5] bg-white/92 shadow-[0_18px_40px_rgba(20,10,30,0.08)] backdrop-blur-xl'
            : 'border-b border-white/10 bg-[#09020f]/28 backdrop-blur-xl'
        }`}
      >
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#20002d,#a30df5)] text-sm font-semibold text-white shadow-glow">
              CU
            </div>
            <div>
              <div
                className={`font-display text-sm uppercase tracking-[0.32em] ${
                  isHeaderSolid ? 'text-[#6e2794]' : 'text-lilac'
                }`}
              >
                Cuno
              </div>
              <div className={`text-xs ${isHeaderSolid ? 'text-[#6a5a7b]' : 'text-muted'}`}>Senior finance support</div>
            </div>
          </a>

          <nav
            className={`hidden items-center gap-8 text-sm lg:flex ${
              isHeaderSolid ? 'text-[#5b496d]' : 'text-muted'
            }`}
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-current">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#benefits" className={isHeaderSolid ? darkButton : lightButton}>
              Why Cuno
            </a>
            <a href="#contact" className={darkButton}>
              Book a consultation
            </a>
          </div>

          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => {
              setIsMobileMenuOpen(true)
            }}
            className={`flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              isHeaderSolid
                ? 'border-[#e6d7f4] bg-white text-[#16091f]'
                : 'border-white/12 bg-white/8 text-white'
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#09020f]/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="mx-auto mt-5 w-[calc(100%-2rem)] max-w-md rounded-[30px] border border-white/12 bg-[#0d0415] p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-sm uppercase tracking-[0.3em] text-lilac">
                    Cuno
                  </div>
                  <div className="text-sm text-muted">Senior finance support</div>
                </div>
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 grid gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                    }}
                    className="rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 text-base text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href="#benefits"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                  }}
                  className={lightButton}
                >
                  Why Cuno
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                  }}
                  className={darkButton}
                >
                  Book a consultation
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="top">
        <section
          ref={heroRef}
          data-parallax-section
          className="relative isolate overflow-hidden bg-aurora pt-32 md:pt-36"
        >
          <div className="hero-ambient">
            <div
              data-parallax="52"
              className="hero-orb hero-orb-one"
            />
            <div
              data-parallax="82"
              className="hero-orb hero-orb-two"
            />
            <div
              data-parallax="64"
              className="hero-orb hero-orb-three"
            />
            <div
              data-parallax="46"
              className="hero-conic hero-conic-one"
            />
            <div
              data-parallax="38"
              className="hero-conic hero-conic-two"
            />
            <div className="hero-grid" />
            <div className="hero-scanlines" />
            <div
              data-parallax="28"
              className="hero-ring hero-ring-one"
            />
            <div
              data-parallax="22"
              className="hero-ring hero-ring-two"
            />
            <div className="hero-beam hero-beam-left" />
            <div className="hero-beam hero-beam-right" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[52rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />
          <div className="pointer-events-none absolute left-[-8rem] top-[8rem] hidden h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(168,32,255,0.18),transparent_64%)] blur-3xl md:block" />
          <div className="pointer-events-none absolute right-[-9rem] top-[9rem] hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.26),transparent_60%)] blur-3xl lg:block" />

          <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 pb-20 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:pb-28">
            <div className="relative z-10 max-w-4xl">
              <div data-hero-copy-motion className="hero-copy-motion">
                <div
                  data-hero-copy-layer
                  data-depth="10"
                  className="hero-copy-layer hero-copy-grid"
                />
                <div
                  data-hero-copy-layer
                  data-depth="18"
                  className="hero-copy-layer hero-copy-glow hero-copy-glow-one"
                />
                <div
                  data-hero-copy-layer
                  data-depth="26"
                  className="hero-copy-layer hero-copy-glow hero-copy-glow-two"
                />
                <div
                  data-hero-copy-layer
                  data-depth="14"
                  className="hero-copy-layer hero-copy-band hero-copy-band-one"
                />
                <div
                  data-hero-copy-layer
                  data-depth="20"
                  className="hero-copy-layer hero-copy-band hero-copy-band-two"
                />
                <div
                  data-hero-copy-layer
                  data-depth="24"
                  className="hero-copy-layer hero-copy-ring hero-copy-ring-one"
                />
                <div
                  data-hero-copy-layer
                  data-depth="30"
                  className="hero-copy-layer hero-copy-ring hero-copy-ring-two"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionPill>Senior Finance Support</SectionPill>
              </motion.div>

              <h1
                ref={heroTitleRef}
                className="mt-7 max-w-5xl font-display text-[3.2rem] font-bold leading-[0.92] tracking-[-0.07em] text-ink md:text-[4.8rem] xl:text-[5.55rem]"
              >
                For businesses that need clearer monthly decisions.
              </h1>

              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl"
              >
                Cuno helps founder-led businesses and growing teams bring order to
                reporting, cash visibility, and finance leadership. Clear numbers.
                Better decisions. Stronger operating rhythm, without a full-time CFO
                hire too early.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                {trustChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-pill border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-lilac backdrop-blur-md"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {heroPoints.map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.22 + index * 0.08 }}
                    className="surface-glass rounded-[24px] p-4"
                  >
                    <div className="text-sm text-lilac">{label}</div>
                    <div className="mt-2 text-sm leading-6 text-ink">{value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-sm text-muted">
                No retainer commitment required to start a conversation.
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 20,
                scale: shouldReduceMotion ? 1 : 0.985,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.72, delay: 0.12 }}
              className="relative lg:pt-20"
            >
              <div className="absolute -inset-6 hidden rounded-[40px] bg-[radial-gradient(circle_at_top_right,rgba(176,20,255,0.34),transparent_40%)] blur-2xl md:block" />
              <div className="gradient-outline relative overflow-hidden rounded-[32px] bg-white/[0.06] p-6 shadow-glow backdrop-blur-xl md:p-8">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_65%)] blur-2xl" />
                <div className="relative">
                  <div className="text-sm uppercase tracking-[0.28em] text-lilac">
                    Let&apos;s talk
                  </div>
                  <h2 className="mt-5 max-w-md font-display text-4xl font-medium tracking-[-0.04em] text-ink">
                    Book a consultation
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                    Share your current set-up and we&apos;ll take it from there.
                  </p>

                  <form
                    id="contact"
                    className="mt-8 grid gap-4"
                    onSubmit={(event) => {
                      event.preventDefault()
                    }}
                  >
                    {['Your name', 'Work email', 'Company', 'What do you need support with?'].map(
                      (label) => (
                        <label key={label} className="grid gap-2 text-sm text-muted">
                          <span>{label}</span>
                          {label === 'What do you need support with?' ? (
                            <textarea
                              className="min-h-28 rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lilac/60 focus:bg-white/[0.07]"
                              placeholder="Outline your current set-up and where clarity feels missing."
                            />
                          ) : (
                            <input
                              className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lilac/60 focus:bg-white/[0.07]"
                              placeholder={label}
                            />
                          )}
                        </label>
                      ),
                    )}

                    <button type="submit" className={`${darkButton} mt-2 w-full`}>
                      Book a consultation
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="mt-4 text-sm leading-6 text-muted">
                    No retainer or commitment required. First conversation is exploratory.
                  </div>
                </div>
              </div>

              <img
                data-hero-art
                src={media.hero}
                alt=""
                className="pointer-events-none absolute -bottom-20 left-1/2 hidden w-[126%] max-w-none -translate-x-1/2 opacity-95 mix-blend-screen lg:block"
              />
            </motion.div>
          </div>

          <div className="border-y border-white/8 bg-[#0d0314]">
            <div className="marquee-track flex gap-3 px-6 py-4 md:px-10">
              {[...audienceStrip, ...audienceStrip].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="inline-flex shrink-0 items-center rounded-pill border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#e9d7fb]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#faf7fd] py-24 text-[#13071d] md:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <SectionPill theme="light">Core capabilities</SectionPill>
              <h2 data-reveal className={sectionHeadingLight}>
                Three finance support routes, built around the moments growing businesses lose clarity.
              </h2>
              <p
                data-reveal
                className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5a4c6b] md:text-lg"
              >
                Senior finance support, management reporting, and cashflow forecasting
                give leadership clearer monthly control without forcing an early
                full-time hire.
              </p>
            </div>

            <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-3">
              {featureCards.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>

            <div className="mt-12 lg:hidden">
              <Swiper
                onSwiper={setFeatureSwiper}
                slidesPerView={1.08}
                spaceBetween={18}
                breakpoints={{
                  700: {
                    slidesPerView: 1.45,
                  },
                }}
                className="feature-swiper !overflow-visible"
              >
                {featureCards.map((feature) => (
                  <SwiperSlide key={feature.title}>
                    <FeatureCard feature={feature} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-8 flex items-center justify-center gap-4">
                <ControlButton
                  label="Previous capability"
                  icon="left"
                  theme="light"
                  onClick={() => {
                    featureSwiper?.slidePrev()
                  }}
                />
                <ControlButton
                  label="Next capability"
                  icon="right"
                  theme="light"
                  onClick={() => {
                    featureSwiper?.slideNext()
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="journey"
          ref={journeyRef}
          className="relative overflow-hidden bg-[#0d0413] text-white lg:min-h-[100vh]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11,3,16,0.72), rgba(10,2,15,0.96)), url(${media.processGlow})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <img
            src={media.frame}
            alt=""
            className="journey-logo pointer-events-none absolute right-[-18vw] top-8 hidden h-[78vh] max-h-[980px] w-auto opacity-[0.9] lg:block"
          />

          <div className="lg:hidden">
            <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
              <img
                src={media.frame}
                alt=""
                className="pointer-events-none absolute right-[-12rem] top-28 h-[28rem] w-auto opacity-[0.78]"
              />

              <div className="relative max-w-xl">
                <SectionPill>How it works</SectionPill>
                <h2 className={sectionHeadingDark}>
                  Understand your finance setup, build the right routine, and use it to
                  support better decisions.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#c5b9d3] md:text-lg">
                  Cuno reviews what is happening now, builds the right monthly routine,
                  and helps finance become easier to manage as the business grows.
                </p>
              </div>

              <div className="relative mt-12">
                <Swiper
                  onSwiper={setJourneySwiper}
                  slidesPerView={1.08}
                  spaceBetween={18}
                  breakpoints={{
                    700: {
                      slidesPerView: 1.35,
                    },
                  }}
                  className="!overflow-visible"
                >
                  {processSteps.map((step) => (
                    <SwiperSlide key={step.number}>
                      <article className="gradient-outline relative min-h-[21rem] overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(40,27,51,0.92),rgba(21,13,30,0.96))] p-7 backdrop-blur-xl">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/8 font-display text-2xl text-white">
                          {step.number}
                        </div>
                        <h3 className="mt-8 font-display text-3xl font-medium tracking-[-0.04em] text-white">
                          {step.title}
                        </h3>
                        <p className="mt-5 text-base leading-8 text-[#ddd1ea]">{step.copy}</p>
                      </article>
                    </SwiperSlide>
                  ))}

                  <SwiperSlide>
                    <article className="gradient-outline relative min-h-[21rem] overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(40,27,51,0.92),rgba(21,13,30,0.96))] p-7 backdrop-blur-xl">
                      <SectionPill>Ready to start</SectionPill>
                      <h3 className="mt-6 font-display text-3xl font-medium tracking-[-0.04em] text-white">
                        Ready for clear monthly numbers, better decisions, and a more
                        controlled finance function?
                      </h3>
                      <p className="mt-5 text-base leading-8 text-[#ddd1ea]">
                        Cuno helps founder-led businesses and growing teams build a more
                        controlled finance function without forcing an early full-time
                        hire.
                      </p>
                      <a href="#contact" className={`${darkButton} mt-8`}>
                        Book a consultation
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </article>
                  </SwiperSlide>
                </Swiper>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <ControlButton
                    label="Previous journey step"
                    icon="left"
                    onClick={() => {
                      journeySwiper?.slidePrev()
                    }}
                  />
                  <ControlButton
                    label="Next journey step"
                    icon="right"
                    onClick={() => {
                      journeySwiper?.slideNext()
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div ref={journeyTrackRef} className="hidden lg:flex lg:w-max lg:items-center lg:gap-8 lg:px-[6vw] lg:py-20">
            <div className="w-[28rem] shrink-0">
              <SectionPill>How it works</SectionPill>
              <h2 className="mt-6 max-w-[24rem] font-display text-[4.2rem] font-bold leading-[0.93] tracking-[-0.06em] text-white">
                Understand your finance setup, build the right routine, and use it to
                support better decisions.
              </h2>
              <p className="mt-6 max-w-[28rem] text-lg leading-8 text-[#c5b9d3]">
                Cuno reviews what is happening now, builds the right monthly routine,
                and helps finance become easier to manage as the business grows.
              </p>
            </div>

            {processSteps.map((step, index) => (
              <article
                key={step.number}
                className={`journey-card-desktop gradient-outline relative min-h-[23rem] w-[24rem] shrink-0 overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(42,28,52,0.9),rgba(23,14,32,0.94))] p-8 backdrop-blur-xl ${
                  index % 2 === 0 ? 'translate-y-[-2rem]' : 'translate-y-[4.5rem]'
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/8 font-display text-3xl text-white">
                  {step.number}
                </div>
                <h3 className="mt-8 font-display text-[2.2rem] font-medium leading-tight tracking-[-0.045em] text-white">
                  {step.title}
                </h3>
                <p className="mt-5 text-[1.05rem] leading-8 text-[#ddd1ea]">{step.copy}</p>
              </article>
            ))}

            <article className="gradient-outline relative w-[28rem] shrink-0 overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,rgba(42,28,52,0.9),rgba(23,14,32,0.94))] p-8 backdrop-blur-xl">
              <SectionPill>Ready to start</SectionPill>
              <h3 className="mt-6 max-w-[22rem] font-display text-[2.6rem] font-medium leading-tight tracking-[-0.045em] text-white">
                Ready for clear monthly numbers, better decisions, and a more controlled finance function?
              </h3>
              <p className="mt-5 max-w-[23rem] text-[1.05rem] leading-8 text-[#ddd1ea]">
                Cuno helps growing businesses improve monthly visibility through Senior
                Finance Support, Management Reporting, and Cashflow Forecasting.
              </p>
              <a href="#contact" className={`${darkButton} mt-8`}>
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        <section
          id="benefits"
          className="relative overflow-hidden bg-[#0d0413] py-24 text-white md:py-32"
        >
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionPill>Why Cuno</SectionPill>
                <h2 data-reveal className={sectionHeadingDark}>
                  More than reporting, less than a full-time senior finance hire.
                </h2>
              </div>

              <div className="max-w-xl">
                <p data-reveal className="text-base leading-8 text-[#c7bbd4] md:text-lg">
                  The service is built around recurring senior finance input, clearer
                  reporting, forward cash visibility, and a monthly rhythm leadership
                  will actually use.
                </p>
                <a href="#contact" className={`${darkButton} mt-6`}>
                  Book a consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-14 flex items-center justify-end gap-4">
              <ControlButton
                label="Previous benefit"
                icon="left"
                onClick={() => {
                  benefitSwiper?.slidePrev()
                }}
              />
              <ControlButton
                label="Next benefit"
                icon="right"
                onClick={() => {
                  benefitSwiper?.slideNext()
                }}
              />
            </div>

            <div className="mt-8">
              <Swiper
                onSwiper={setBenefitSwiper}
                onSlideChange={(swiper) => {
                  setActiveBenefit(swiper.activeIndex)
                }}
                slidesPerView={1.08}
                centeredSlides
                spaceBetween={22}
                breakpoints={{
                  760: {
                    slidesPerView: 1.45,
                  },
                  1100: {
                    slidesPerView: 2.4,
                  },
                }}
                className="benefits-swiper !overflow-visible"
              >
                {benefitSlides.map((slide, index) => (
                  <SwiperSlide key={slide.title}>
                    <article
                      className={`gradient-outline relative flex h-full min-h-[34rem] flex-col justify-between overflow-hidden rounded-[34px] bg-white/[0.055] p-7 transition-all duration-500 md:p-8 ${
                        activeBenefit === index
                          ? 'translate-y-[-1rem] opacity-100'
                          : 'translate-y-[2.5rem] opacity-45'
                      }`}
                    >
                      <div>
                        <h3 className="font-display text-[2rem] font-medium leading-tight tracking-[-0.04em] text-white">
                          {slide.title}
                        </h3>
                        <p className="mt-5 text-[1.05rem] leading-8 text-[#ddd1ea]">{slide.copy}</p>
                      </div>
                      <div>
                        <div className="rounded-[18px] border border-white/8 bg-white/[0.05] px-4 py-3 text-sm text-[#efe3ff]">
                          {slide.impact}
                        </div>
                        <img
                          src={slide.image}
                          alt=""
                          className="mt-8 h-52 w-full object-contain object-center"
                        />
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#120419] py-24 text-white md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(148,72,214,0.22),transparent_62%)]" />
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <SectionPill>Operating outcomes</SectionPill>
              <h2 data-reveal className={sectionHeadingDark}>
                Finance support that delivers operating control.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.26fr_0.48fr_0.26fr] lg:items-start">
              <div className="grid gap-4">
                {activeCaseItem.stats.map(([title, copy]) => (
                  <div
                    key={title}
                    data-reveal
                    className="rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-6"
                  >
                    <div className="font-display text-4xl tracking-[-0.05em] text-[#e0bfff]">
                      {title}
                    </div>
                    <div className="mt-3 text-[1.05rem] leading-8 text-[#ddd1ea]">{copy}</div>
                  </div>
                ))}
              </div>

              <motion.article
                key={activeCaseItem.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="gradient-outline relative overflow-hidden rounded-[34px] bg-white/[0.06] p-7 md:p-8"
              >
                <div className="flex flex-wrap gap-2">
                  {activeCaseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-white/8 bg-white/[0.05] px-4 py-2 text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 font-display text-[2.2rem] font-medium leading-tight tracking-[-0.045em] text-white">
                  {activeCaseItem.title}
                </h3>

                <div className="mt-8 border-t border-white/8 pt-6">
                  <div className="text-sm uppercase tracking-[0.28em] text-lilac">Challenge</div>
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#ddd1ea]">{activeCaseItem.challenge}</p>
                </div>

                <div className="mt-6 border-t border-white/8 pt-6">
                  <div className="text-sm uppercase tracking-[0.28em] text-lilac">Support focus</div>
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#ddd1ea]">{activeCaseItem.focus}</p>
                </div>

                <div className="mt-6 border-t border-white/8 pt-6">
                  <div className="text-sm uppercase tracking-[0.28em] text-lilac">What improves</div>
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#ddd1ea]">{activeCaseItem.change}</p>
                </div>
              </motion.article>

              <motion.article
                key={activeCaseItem.principleTitle}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/8 font-display text-4xl text-[#d7bbf2]">
                  “
                </div>
                <h3 className="mt-8 font-display text-3xl font-medium leading-tight tracking-[-0.04em] text-white">
                  {activeCaseItem.principleTitle}
                </h3>
                <p className="mt-5 text-[1.05rem] leading-8 text-[#ddd1ea]">
                  {activeCaseItem.principleCopy}
                </p>
              </motion.article>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <ControlButton
                label="Previous operating scenario"
                icon="left"
                onClick={() => {
                  setActiveCase((current) => (current - 1 + caseStudies.length) % caseStudies.length)
                }}
              />
              <ControlButton
                label="Next operating scenario"
                icon="right"
                onClick={() => {
                  setActiveCase((current) => (current + 1) % caseStudies.length)
                }}
              />
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#fbf8fe] py-24 text-[#13071d] md:py-32">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <SectionPill theme="light">FAQ</SectionPill>
              <h2
                data-reveal
                className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl"
              >
                Questions that come up before a first finance support conversation.
              </h2>
            </div>

            <div className="mt-14 space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index

                return (
                  <div
                    key={item.question}
                    className="faq-card overflow-hidden rounded-[28px] border border-[#eadcf5] bg-white shadow-[0_18px_60px_rgba(97,31,146,0.06)]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFaq(isOpen ? -1 : index)
                      }}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
                    >
                      <span className="font-display text-2xl font-medium tracking-[-0.03em] text-[#16091f]">
                        {item.question}
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6effd] text-[#16091f]">
                        <Plus className={`h-5 w-5 transition ${isOpen ? 'rotate-45' : ''}`} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: 'easeOut' }}
                        >
                          <div className="px-6 pb-7 text-sm leading-7 text-[#5a4c6b] md:px-8">
                            {item.answer}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b0210] py-24 text-white md:py-32">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.46),transparent_68%)] blur-2xl" />
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center md:px-10">
            <SectionPill>Ready to start</SectionPill>
            <h2 data-reveal className={`max-w-4xl ${sectionHeadingDark}`}>
              Make the finance function easier to manage each month.
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-3xl text-base leading-8 text-[#c9bfd6] md:text-lg"
            >
              If reporting is delayed, cash visibility is weak, or finance decisions
              still rely too much on instinct, Cuno can help build a clearer monthly
              rhythm.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#contact" className={darkButton}>
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#features" className={lightButton}>
                Review capabilities
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {locations.map((location) => (
                <span
                  key={location}
                  className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#ece1f9]"
                >
                  <MapPin className="h-4 w-4 text-lilac" />
                  {location}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#09020f] py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[1fr_auto_auto] md:px-10">
          <div>
            <div className="font-display text-sm uppercase tracking-[0.32em] text-lilac">
              Cuno
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Cuno helps growing businesses improve monthly finance visibility through
              Senior Finance Support, Management Reporting, and Cashflow Forecasting.
            </p>
            <p className="mt-3 text-sm text-muted">
              London-focused support for founder-led businesses, SMEs, and selected UK
              growth hubs.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-muted">
            <a href="#features" className="transition hover:text-white">
              Capabilities
            </a>
            <a href="#journey" className="transition hover:text-white">
              Journey
            </a>
            <a href="#benefits" className="transition hover:text-white">
              Benefits
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </div>

          <div className="grid gap-3 text-sm text-muted">
            <div className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4 text-lilac" />
              Founder-led businesses and SMEs
            </div>
            <div className="inline-flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-lilac" />
              Monthly operating cadence
            </div>
            <div className="inline-flex items-center gap-2">
              <BadgePoundSterling className="h-4 w-4 text-lilac" />
              No retainer required to start
            </div>
            <div className="inline-flex items-center gap-2">
              <LineChart className="h-4 w-4 text-lilac" />
              Practical decision support
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
