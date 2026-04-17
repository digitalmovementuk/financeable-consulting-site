import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  BadgePoundSterling,
  Building2,
  CalendarClock,
  ChevronDown,
  CircleCheckBig,
  Landmark,
  LineChart,
  MapPin,
  NotebookTabs,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SplitType from 'split-type'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { gsap } from '@/lib/gsap'
import 'swiper/css'
import 'swiper/css/pagination'

const brandPill =
  'inline-flex items-center gap-2 rounded-pill border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-lilac backdrop-blur-md'
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-lilac'
const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-ink transition hover:bg-white/10'
const darkPanel = 'surface-glass rounded-[28px] p-6 md:p-8'
const lightPanel =
  'surface-light rounded-[28px] border border-[#d9c9ea] bg-white/90 p-6 shadow-[0_24px_80px_rgba(97,31,146,0.08)] md:p-8'

const remoteAssets = {
  hero:
    'https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/698e24ece3d5d57d91021658_c6d9ce9cba95d2c649eb238398457b5f_Hero%20section.avif',
  processGlow:
    'https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/6915aee8f8ed7c9911786143_4a1f102d490fd8ab1876081e8ac15e82_horizontal-scroll-bg-gr.avif',
  chain:
    'https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/6986187fde4ce5ae02bdf023_07d22fec57b2fc4089079e3f2ee72517_3D-Spline-Chain.png',
  laptop:
    'https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/6977abcad0ab5af7d3fe829e_MacBook%20Pro%2016_%20-%202.avif',
  frame:
    'https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/6986455b4feab896f4c9bfa1_Frame%2016.avif',
  illustration:
    'https://cdn.prod.website-files.com/690b5a39d269efd72421ec15/698607a77b09111ccba532c5_184d59b7d101acdb4a4ac9ec1db6ab80_Illustration.avif',
} as const

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Monthly CFO', href: '#monthly-cfo' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
] as const

const trustChips = ['Monthly CFO', 'Financial Reporting', 'Cashflow Management', 'London-focused support'] as const

const heroPoints = [
  ['Monthly visibility', 'Structured and decision-ready'],
  ['Cash outlook', 'More useful than a bank-balance guess'],
  ['Working style', 'Practical, calm, and commercially useful'],
] as const

const stats = [
  ['3', 'Core service lines'],
  ['£0', 'Setup or retainer commitment'],
  ['Monthly', 'Operating cadence'],
  ['London', 'Primary market focus'],
] as const

const services = [
  {
    icon: Landmark,
    title: 'Monthly CFO',
    subtitle: 'Senior finance support without a full-time CFO hire',
    benefit:
      'Bring monthly clarity and financial leadership into the business before a permanent senior hire is justified.',
    bullets: ['Monthly finance cadence', 'Leadership decision support', 'Reporting and forecast review'],
  },
  {
    icon: NotebookTabs,
    title: 'Financial Reporting',
    subtitle: 'Management reporting that is built for decisions',
    benefit:
      'Turn reports into a management tool instead of a delayed monthly admin task.',
    bullets: ['Management accounts', 'Variance analysis', 'Monthly visibility'],
  },
  {
    icon: Wallet,
    title: 'Cashflow Management',
    subtitle: 'Forward cash visibility before pressure turns into risk',
    benefit:
      'Reduce cash surprises and make growth decisions with better forward visibility.',
    bullets: ['Rolling cash forecast', 'Decision support', 'Growth-stage planning'],
  },
] as const

const challenges = [
  {
    title: 'Reporting arrives too late to guide decisions',
    copy:
      'Leadership keeps moving, but the financial picture lands after decisions have already been made.',
  },
  {
    title: 'Cash feels harder to read than it should',
    copy:
      'Even profitable businesses can feel exposed when receipts, spend, and growth commitments are not visible in one clear rhythm.',
  },
  {
    title: 'The business has outgrown informal finance handling',
    copy:
      'Bookkeeping and year-end compliance may exist, but the leadership team still lacks dependable monthly finance support.',
  },
] as const

const processSteps = [
  {
    number: '01',
    title: 'Understand the current finance setup',
    copy:
      'Review how reporting, forecasting, and decision ownership work today, and identify where clarity is being lost.',
  },
  {
    number: '02',
    title: 'Build a practical monthly rhythm',
    copy:
      'Create a reporting and review cadence that leadership can actually use rather than another finance document nobody trusts.',
  },
  {
    number: '03',
    title: 'Improve interpretation and control',
    copy:
      'Connect management numbers, budget movement, and cash visibility to the decisions that matter most.',
  },
  {
    number: '04',
    title: 'Support better monthly decisions',
    copy:
      'Use finance as a management tool for hiring, growth pacing, pricing, spend control, and short-term priorities.',
  },
] as const

const trustCards = [
  {
    title: 'No fake proof layer',
    copy:
      'The site avoids invented testimonials, ratings, and credentials. Trust is built through service clarity, process detail, and realistic expectations.',
  },
  {
    title: 'A commercially useful finance lens',
    copy:
      'The emphasis is on management visibility, budget-versus-actual understanding, and cash planning that supports action.',
  },
  {
    title: 'Structured for later SEO expansion',
    copy:
      'The live site is the core six-page brand layer, while the 450-page keyword matrix remains ready for a later rollout.',
  },
] as const

const whyChooseSlides = [
  'Built around finance clarity, not generic advisory language.',
  'Designed for businesses that are too complex for informal finance handling but too early for a full-time senior hire.',
  'Focused on decision usefulness, not just historic reporting output.',
  'Low-friction enquiry route with no invented proof or inflated claims.',
] as const

const locations = [
  'London',
  'City of London',
  'Westminster',
  'Southwark',
  'London Bridge',
  "King's Cross",
  'Farringdon',
  'East London',
  'South East London',
  'Manchester',
] as const

const faqItems = [
  {
    question: 'Who is Financeable Consulting best suited to?',
    answer:
      'It is best suited to founder-led businesses, growing SMEs, and small leadership teams that need stronger reporting, cash visibility, and practical finance support without hiring a full-time senior leader too early.',
  },
  {
    question: 'What services does Financeable Consulting offer?',
    answer:
      'The core services are Monthly CFO, Financial Reporting, and Cashflow Management. Together they cover recurring finance leadership, better monthly visibility, and stronger control over planning and liquidity.',
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
  {
    question: 'Are public reviews available?',
    answer:
      'No safely attributable public Google reviews were found during research, so the site uses service clarity and process detail instead of a fabricated review section.',
  },
] as const

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
  const processRef = useRef<HTMLDivElement | null>(null)
  const processTrackRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [openFaq, setOpenFaq] = useState(0)

  useGSAP(
    () => {
      if (shouldReduceMotion || !heroTitleRef.current) {
        return
      }

      const split = new SplitType(heroTitleRef.current, {
        types: 'lines,words',
        lineClass: 'split-line',
      })

      gsap.from(split.words, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.03,
        duration: 0.85,
        ease: 'power3.out',
      })

      return () => {
        split.revert()
      }
    },
    { scope: heroRef, dependencies: [shouldReduceMotion] },
  )

  useGSAP(
    () => {
      if (shouldReduceMotion || !processRef.current || !processTrackRef.current) {
        return
      }

      const section = processRef.current
      const track = processTrackRef.current
      const media = gsap.matchMedia()

      media.add('(min-width: 1024px)', () => {
        const distance = Math.max(0, track.scrollWidth - section.clientWidth + 120)

        gsap.set(track, { x: 0 })
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + 720}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => {
        media.revert()
      }
    },
    { scope: processRef, dependencies: [shouldReduceMotion] },
  )

  return (
    <div className="overflow-x-hidden bg-canvas text-ink">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#09020f]/75 backdrop-blur-xl">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#20002d,#a30df5)] text-sm font-semibold text-white shadow-glow">
              FC
            </div>
            <div>
              <div className="font-display text-sm uppercase tracking-[0.32em] text-lilac">
                Financeable
              </div>
              <div className="text-xs text-muted">Consulting</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="#about" className={secondaryButton}>
              About
            </a>
            <a href="#contact" className={primaryButton}>
              Book a consultation
            </a>
          </div>
        </header>
      </div>

      <main id="top">
        <section
          ref={heroRef}
          className="relative isolate overflow-hidden bg-aurora pt-32 md:pt-36"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%)]" />
          <div className="pointer-events-none absolute right-[-8rem] top-[10rem] hidden h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.35),transparent_62%)] blur-3xl lg:block" />
          <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 pb-20 md:px-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-start lg:pb-28">
            <div className="relative z-10 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={brandPill}
              >
                London Finance Support
              </motion.div>
              <h1
                ref={heroTitleRef}
                className="mt-7 max-w-5xl font-display text-[3.2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-ink md:text-[4.8rem] xl:text-[5.4rem]"
              >
                Senior finance support for businesses that need clearer monthly
                decisions.
              </h1>
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl"
              >
                Financeable Consulting helps founder-led businesses and growing teams
                bring order to reporting, cash visibility, and finance leadership.
                The focus is practical: clearer monthly numbers, stronger decision
                support, and a better operating rhythm without the cost of a full-time
                finance director or CFO too early.
              </motion.p>
              <div className="mt-8 flex flex-wrap gap-3">
                {trustChips.map((chip) => (
                  <span key={chip} className={brandPill}>
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
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.72, delay: 0.12 }}
              className="relative"
            >
              <div className="absolute -inset-6 hidden rounded-[40px] bg-[radial-gradient(circle_at_top_right,rgba(176,20,255,0.4),transparent_40%)] blur-2xl md:block" />
              <div className="surface-glass relative overflow-hidden rounded-[32px] border border-white/12 p-6 shadow-glow md:p-8">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_65%)] blur-2xl" />
                <div className="relative">
                  <div className="text-sm uppercase tracking-[0.28em] text-lilac">
                    Start with a brief
                  </div>
                  <h2 className="mt-5 max-w-md font-display text-4xl font-medium tracking-[-0.04em] text-ink">
                    Book a consultation
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                    Share the finance challenge that feels hardest to manage right now.
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
                              placeholder="Tell us where reporting, cash visibility, or decision support is falling short."
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
                    <button type="submit" className={`${primaryButton} mt-2 w-full`}>
                      Book a consultation
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                  <div className="mt-4 text-sm leading-6 text-muted">
                    No retainer or commitment required. First conversation is exploratory.
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-14 left-1/2 hidden w-[120%] -translate-x-1/2 lg:block">
                <img
                  src={remoteAssets.hero}
                  alt=""
                  className="w-full opacity-95 mix-blend-screen"
                />
              </div>
            </motion.div>
          </div>

          <div className="mx-auto -mt-6 w-full max-w-7xl px-6 pb-20 md:px-10">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="surface-glass rounded-[26px] px-6 py-5"
                >
                  <div className="font-display text-4xl tracking-[-0.05em] text-ink">{value}</div>
                  <div className="mt-2 text-sm text-muted">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#f7f2fb] py-24 text-[#13071d] md:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-pill border border-[#d6bee9] bg-white px-4 py-2 text-sm text-[#7f34a4]">
                Core services
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                Three finance support routes, built around the moments growing
                businesses lose clarity.
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`${lightPanel} relative overflow-hidden`}
                  >
                    <div className="absolute right-5 top-5 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.14),transparent_66%)]" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#260034,#b014ff)] text-white shadow-[0_12px_30px_rgba(176,20,255,0.22)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-7 text-sm uppercase tracking-[0.26em] text-[#7f34a4]">
                      {service.title}
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.04em]">
                      {service.subtitle}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-[#514364]">{service.benefit}</p>
                    <ul className="mt-6 space-y-3">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-[#23152f]">
                          <CircleCheckBig className="mt-0.5 h-4 w-4 text-[#7f34a4]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#7f34a4]"
                    >
                      View service
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-24 text-[#12071d] md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-20 text-center font-display text-[22vw] font-semibold leading-none tracking-[-0.08em] text-[#eadff5]">
            Rhythm
          </div>
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex rounded-pill border border-[#d6bee9] bg-white px-4 py-2 text-sm text-[#7f34a4]">
                Why businesses seek this support
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                The issue is rarely a missing spreadsheet. It is the absence of a
                reliable finance rhythm.
              </h2>
            </div>
            <div className="relative z-10 grid gap-5">
              {challenges.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`${lightPanel} bg-white/95`}
                >
                  <div className="text-sm uppercase tracking-[0.26em] text-[#7f34a4]">
                    Challenge
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#514364]">{item.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="monthly-cfo" className="relative overflow-hidden bg-aurora py-24 md:py-32">
          <div className="absolute inset-y-0 left-0 hidden w-1/2 lg:block">
            <img src={remoteAssets.illustration} alt="" className="h-full w-full object-cover opacity-90" />
          </div>
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="hidden lg:block" />
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className={`${darkPanel} relative overflow-hidden`}
            >
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.28),transparent_68%)] blur-2xl" />
              <div className="relative">
                <div className={brandPill}>Signature Offer</div>
                <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] text-ink md:text-6xl">
                  Monthly CFO support that connects reporting, cash visibility, and
                  leadership decisions.
                </h2>
                <p className="mt-6 text-base leading-8 text-muted md:text-lg">
                  The Monthly CFO service is the clearest entry point for businesses
                  that need more than reporting and less than a full-time senior
                  finance hire. It combines recurring finance leadership, management
                  discussion, reporting review, and practical decision support.
                </p>
                <p className="mt-5 text-base leading-8 text-muted md:text-lg">
                  That makes it especially useful when growth has outpaced the current
                  finance setup. Instead of reacting to numbers after the fact,
                  leadership gets a clearer monthly rhythm around what happened, what
                  is changing, and what deserves action next.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className={brandPill}>Monthly review cadence</span>
                  <span className={brandPill}>Management interpretation</span>
                  <span className={brandPill}>Forecast and cash discussion</span>
                </div>
                <a href="#contact" className={`${primaryButton} mt-10`}>
                  Explore Monthly CFO
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="process"
          ref={processRef}
          className="relative overflow-hidden bg-canvas py-24 lg:min-h-[100vh] lg:py-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(14,3,20,0.78), rgba(7,1,13,0.94)), url(${remoteAssets.processGlow})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 pt-0 md:px-10 lg:pt-24">
            <div className="max-w-3xl">
              <div className={brandPill}>How it works</div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] text-ink md:text-6xl">
                Understand the finance setup, build the right cadence, and use it to
                support better decisions.
              </h2>
            </div>
          </div>

          <div
            ref={processTrackRef}
            className="mx-auto mt-16 flex w-full max-w-[1700px] flex-col gap-6 px-6 pb-8 lg:mt-24 lg:flex-row lg:items-center lg:gap-20 lg:px-10 lg:pb-24"
          >
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative shrink-0 lg:w-[420px]"
              >
                <div className="pointer-events-none absolute left-0 top-1/2 hidden h-[180px] w-[110vw] -translate-y-1/2 lg:block">
                  <img
                    src={remoteAssets.chain}
                    alt=""
                    className={`h-full w-full object-cover object-center opacity-70 ${index === 0 ? '' : 'hidden'}`}
                  />
                </div>
                <motion.article
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="surface-glass relative z-10 rounded-[30px] p-7 md:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/8 font-display text-2xl text-ink">
                    {step.number}
                  </div>
                  <h3 className="mt-8 font-display text-3xl font-medium tracking-[-0.04em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted">{step.copy}</p>
                </motion.article>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f7f2fb] py-24 text-[#13071d] md:py-32">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="max-w-xl">
              <div className="inline-flex rounded-pill border border-[#d6bee9] bg-white px-4 py-2 text-sm text-[#7f34a4]">
                Trust and transparency
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                The site earns trust through specificity, not inflated claims.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#514364] md:text-lg">
                Financeable Consulting is built around useful monthly control. The
                positioning is practical finance support for founder-led businesses,
                startups, and growing SMEs that need clearer monthly control before a
                full-time senior hire makes sense.
              </p>
              <a href="#about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#7f34a4]">
                Learn more about the approach
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-5">
              <div className={`${lightPanel} overflow-hidden p-3 md:p-4`}>
                <img
                  src={remoteAssets.laptop}
                  alt="Finance dashboard visual"
                  className="w-full rounded-[24px] object-cover"
                />
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {trustCards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className={lightPanel}
                  >
                    <div className="text-sm uppercase tracking-[0.24em] text-[#7f34a4]">
                      Trust
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.04em]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#514364]">{card.copy}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden bg-aurora py-24 md:py-32">
          <div className="absolute right-[-8rem] top-16 hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.32),transparent_62%)] blur-3xl lg:block" />
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="max-w-2xl">
              <div className={brandPill}>Why choose Financeable</div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] text-ink md:text-6xl">
                A calm, commercially useful finance layer for growth-stage decisions.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted md:text-lg">
                Financeable Consulting helps growing businesses improve monthly
                finance visibility through Monthly CFO, Financial Reporting, and
                Cashflow Management support. The emphasis is on calmer decisions,
                stronger visibility, and finance structures leadership will actually
                use.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(176,20,255,0.28),transparent_60%)] blur-2xl" />
              <div className="surface-glass relative overflow-hidden rounded-[34px] p-4 md:p-6">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={1}
                  spaceBetween={20}
                  breakpoints={{
                    900: {
                      slidesPerView: 1.45,
                    },
                  }}
                  className="financeable-benefits-swiper"
                >
                  {whyChooseSlides.map((slide) => (
                    <SwiperSlide key={slide}>
                      <article className="flex h-full min-h-[260px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/5 p-7">
                        <ShieldCheck className="h-8 w-8 text-lilac" />
                        <p className="mt-10 font-display text-3xl leading-tight tracking-[-0.04em] text-ink">
                          {slide}
                        </p>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 text-[#12071d] md:py-32">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-xl">
              <div className="inline-flex rounded-pill border border-[#d6bee9] bg-white px-4 py-2 text-sm text-[#7f34a4]">
                Service area
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                London-led. Built for growth hubs across the UK.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#514364] md:text-lg">
                Primary focus is London and its key business districts, with support
                extending to selected UK growth markets.
              </p>
            </div>
            <div className={`${lightPanel} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-25">
                <img src={remoteAssets.frame} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative flex flex-wrap gap-3">
                {locations.map((location) => (
                  <span
                    key={location}
                    className="inline-flex items-center gap-2 rounded-pill border border-[#d6bee9] bg-white px-4 py-2 text-sm text-[#34174a]"
                  >
                    <MapPin className="h-4 w-4 text-[#7f34a4]" />
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#faf7fd] py-24 text-[#12071d] md:py-32">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex rounded-pill border border-[#d6bee9] bg-white px-4 py-2 text-sm text-[#7f34a4]">
                FAQ
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                Questions that come up before a first finance support conversation.
              </h2>
            </div>
            <div className="mt-14 space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <div key={item.question} className="overflow-hidden rounded-[28px] border border-[#eadcf4] bg-white">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenFaq(isOpen ? -1 : index)
                      }}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
                    >
                      <span className="font-display text-2xl font-medium tracking-[-0.03em]">
                        {item.question}
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5effb] text-[#12071d]">
                        <ChevronDown
                          className={`h-5 w-5 transition ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                        >
                          <div className="px-6 pb-7 text-sm leading-7 text-[#514364] md:px-8">
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

        <section className="relative overflow-hidden bg-aurora py-24 md:py-32">
          <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,20,255,0.46),transparent_68%)] blur-2xl" />
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center md:px-10">
            <div className={brandPill}>Ready to start</div>
            <h2 className="mt-6 max-w-4xl font-display text-4xl font-medium tracking-[-0.05em] text-ink md:text-6xl">
              Make the finance function easier to manage each month.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
              If reporting is delayed, cash visibility is weak, or finance decisions
              still rely too much on instinct, Financeable Consulting can help build a
              clearer monthly rhythm.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#contact" className={primaryButton}>
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className={secondaryButton}>
                Review services
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#09020f] py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[1fr_auto_auto] md:px-10">
          <div>
            <div className="font-display text-sm uppercase tracking-[0.32em] text-lilac">
              Financeable Consulting
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Financeable Consulting helps growing businesses improve monthly finance
              visibility through Monthly CFO, Financial Reporting, and Cashflow
              Management support.
            </p>
            <p className="mt-3 text-sm text-muted">
              London-focused support for founder-led businesses, SMEs, and selected UK
              growth hubs.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#monthly-cfo" className="transition hover:text-white">
              Monthly CFO
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
