import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
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

// -----------------------------------------------------------------------------
// Content — identical copy to v1 (App.tsx). Only presentation is redesigned.
// -----------------------------------------------------------------------------

const navItems = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How it works', href: '#process' },
  { label: 'Why Cuno', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
] as const

const trustChips = [
  'Senior Finance Support',
  'Management Reporting',
  'Cashflow Forecasting',
  'London-focused support',
] as const

type Capability = {
  tag: string
  title: string
  copy: string
  bullets: readonly [string, string]
  icon: LucideIcon
}

const capabilities: readonly Capability[] = [
  {
    tag: 'Senior Finance Support',
    title: 'Clarity, control and strong foundations',
    copy: 'A recurring senior finance model for businesses that need clearer reporting, sharper decision support, and a dependable monthly operating rhythm.',
    bullets: ['Structured monthly reporting', 'Forward-looking financial insights'],
    icon: Landmark,
  },
  {
    tag: 'Management Reporting',
    title: 'Numbers that are decision-ready',
    copy: 'Clear, accurate monthly reporting with focused commentary that leadership can use to make confident decisions.',
    bullets: ['Structured monthly accounts', 'Variance analysis with commentary'],
    icon: NotebookTabs,
  },
  {
    tag: 'Cashflow Forecasting',
    title: 'Forward cash visibility, before pressure',
    copy: 'Rolling cash forecasting, structured planning cadence, and practical support give you a reliable view of liquidity and what is ahead.',
    bullets: ['Rolling cashflow forecast', 'Forward-looking decision support'],
    icon: Wallet,
  },
] as const

const processSteps = [
  {
    number: '01',
    title: 'Your current setup',
    copy: 'Identify where clarity is being lost through a full review of your current finance setup.',
  },
  {
    number: '02',
    title: 'The build',
    copy: 'Establish a structured reporting and review cadence, tailored to how your business operates and grows.',
  },
  {
    number: '03',
    title: 'Improve control',
    copy: 'Tighten visibility across reporting, planning, and cash so finance is easier to manage and act on.',
  },
  {
    number: '04',
    title: 'Stronger support',
    copy: 'Use finance as a guide for short-term priorities and long-term direction.',
  },
  {
    number: '05',
    title: 'Refine as the business grows',
    copy: 'Ensure your reporting and forecasts evolve with the business rather than lag behind it.',
  },
] as const

const benefits = [
  {
    kicker: 'Recurring senior input',
    title: 'More than reporting, less than a full-time senior finance hire',
    copy: 'Built for businesses that need recurring senior finance input, but are not ready for a full-time CFO.',
    impact: 'Clear monthly visibility before a full-time hire is needed.',
  },
  {
    kicker: 'Decision-ready pack',
    title: 'Reporting that arrives in time to matter',
    copy: 'Management reporting is built around relevant and timely information, not historic packs sent after the moment has passed.',
    impact: 'Leaders work from a clear, current view.',
  },
  {
    kicker: 'Forward cash view',
    title: 'Cash visibility before pressure turns into risk',
    copy: 'Cash is managed as a live business issue, not a last-minute bank balance check.',
    impact: 'Fewer surprises around cash and timing.',
  },
  {
    kicker: 'Monthly rhythm',
    title: 'A monthly review cadence leadership will actually use',
    copy: 'Finance runs on a structured monthly rhythm, making it easier to manage and act on each cycle.',
    impact: 'Regular, calmer, more actionable finance discussions.',
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

const locations = [
  'London',
  'City of London',
  'Westminster',
  'Southwark',
  'London Bridge',
  "King's Cross",
  'Farringdon',
  'Manchester',
] as const

// -----------------------------------------------------------------------------
// Reveal hook — subtle rise + fade on scroll, honours reduced motion.
// -----------------------------------------------------------------------------

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.v3-reveal'))

    if (reduce) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

function Nav({
  solid,
  onOpenMenu,
}: {
  solid: boolean
  onOpenMenu: () => void
}) {
  return (
    <div className={`v3-nav ${solid ? 'v3-nav-solid' : ''}`}>
      <div className="v3-container v3-container-wide">
        <div className="v3-nav-inner">
          <a href="#top" className="v3-brand">
            <span className="v3-brand-mark">CU</span>
            <span>Cuno</span>
          </a>

          <nav className="v3-nav-desktop">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="v3-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="v3-nav-cta-wrap">
            <a href="#contact" className="v3-btn v3-btn-primary">
              Book a consultation
            </a>
          </div>

          <button
            type="button"
            className="v3-nav-toggle"
            aria-label="Open menu"
            onClick={onOpenMenu}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function MobileSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="v3-mobile-sheet" role="dialog" aria-modal="true">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}
      >
        <div className="v3-brand">
          <span className="v3-brand-mark">CU</span>
          <span>Cuno</span>
        </div>
        <button
          type="button"
          className="v3-nav-toggle"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ flex: 1 }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="v3-mobile-link"
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
      </div>

      <a href="#contact" className="v3-btn v3-btn-primary" onClick={onClose}>
        Book a consultation
      </a>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="v3-mock" aria-hidden="true">
      <div
        className="v3-mock-panel"
        style={{ gridRow: 'span 2', gap: '1rem' }}
      >
        <div className="v3-mock-row">
          <span className="v3-mock-label">Monthly pack</span>
          <span style={{ color: 'var(--v3-accent)', fontWeight: 500 }}>April</span>
        </div>
        <div className="v3-mock-chart">
          <svg viewBox="0 0 280 110" preserveAspectRatio="none">
            <defs>
              <linearGradient id="v3chart-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7f34a4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#7f34a4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 L28,72 L56,68 L84,58 L112,52 L140,46 L168,40 L196,34 L224,30 L252,24 L280,20 L280,110 L0,110 Z"
              fill="url(#v3chart-fill)"
            />
            <path
              d="M0,80 L28,72 L56,68 L84,58 L112,52 L140,46 L168,40 L196,34 L224,30 L252,24 L280,20"
              fill="none"
              stroke="#7f34a4"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [28, 72],
              [84, 58],
              [140, 46],
              [196, 34],
              [252, 24],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="#fff" stroke="#7f34a4" strokeWidth="1.5" />
            ))}
          </svg>
        </div>
        <div>
          <div className="v3-mock-label">Net cash position</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span className="v3-mock-stat">£412k</span>
            <span className="v3-mock-stat-up">+8.4%</span>
          </div>
        </div>
      </div>

      <div className="v3-mock-panel">
        <div className="v3-mock-label">Forecast vs actual</div>
        <div className="v3-stack-sm">
          <div className="v3-mock-row">
            <strong>Revenue</strong>
            <span>98%</span>
          </div>
          <div className="v3-mock-bar is-full" />
          <div className="v3-mock-row">
            <strong>Gross margin</strong>
            <span>72%</span>
          </div>
          <div className="v3-mock-bar is-mid" />
          <div className="v3-mock-row">
            <strong>Opex</strong>
            <span>45%</span>
          </div>
          <div className="v3-mock-bar" />
        </div>
      </div>

      <div className="v3-mock-panel">
        <div className="v3-mock-label">Next review</div>
        <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--v3-ink)' }}>
          Monthly leadership
        </div>
        <div className="v3-mock-row">
          <span>Thu, 2 May</span>
          <span style={{ color: 'var(--v3-accent)' }}>Scheduled</span>
        </div>
        <hr className="v3-divider" />
        <div className="v3-mock-label">Liquidity runway</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span className="v3-mock-stat" style={{ fontSize: '1.4rem' }}>
            14 months
          </span>
        </div>
      </div>
    </div>
  )
}

function CapabilityCard({ item }: { item: Capability }) {
  const Icon = item.icon
  return (
    <article className="v3-cap-card v3-reveal">
      <div className="v3-cap-card-visual">
        <div className="v3-cap-icon">
          <Icon size={20} />
        </div>
      </div>
      <span className="v3-cap-chip">{item.tag}</span>
      <h3 className="v3-display-sm">{item.title}</h3>
      <p className="v3-body" style={{ fontSize: '0.9375rem' }}>
        {item.copy}
      </p>
      <div style={{ marginTop: 'auto', display: 'grid', gap: '0.5rem' }}>
        {item.bullets.map((b) => (
          <div
            key={b}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--v3-ink-soft)',
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 999,
                background: 'var(--v3-accent)',
                flexShrink: 0,
              }}
            />
            {b}
          </div>
        ))}
      </div>
    </article>
  )
}

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof faqItems)[number]
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={`v3-faq-item ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="v3-faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className="v3-faq-plus">
          <Plus size={20} />
        </span>
      </button>
      <div className="v3-faq-panel">
        <div className="v3-faq-panel-inner">{item.answer}</div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

function AppV3() {
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number>(0)
  const rootRef = useRef<HTMLDivElement>(null)

  useReveal()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div ref={rootRef} className="v3-root" id="top">
      <Nav solid={navSolid} onOpenMenu={() => setMenuOpen(true)} />
      <MobileSheet open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* HERO */}
        <section className="v3-hero">
          <div className="v3-container">
            <div className="v3-stack-lg">
              <div className="v3-reveal">
                <span className="v3-eyebrow">Senior Finance Support</span>
              </div>
              <h1 className="v3-display-xl v3-reveal">
                Clearer monthly
                <br />
                finance decisions.
              </h1>
              <p
                className="v3-lede v3-reveal"
                style={{ maxWidth: '640px', margin: '0 auto' }}
              >
                Cuno helps founder-led businesses and growing teams bring order to
                reporting, cash visibility, and finance leadership. Clear numbers.
                Better decisions. A stronger operating rhythm — without a full-time
                CFO hire too early.
              </p>
              <div
                className="v3-reveal"
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  paddingTop: '0.5rem',
                }}
              >
                <a href="#contact" className="v3-btn v3-btn-primary">
                  Book a consultation
                  <ArrowRight size={16} />
                </a>
                <a href="#capabilities" className="v3-btn v3-btn-ghost">
                  See capabilities
                </a>
              </div>
              <div
                className="v3-small v3-reveal"
                style={{ color: 'var(--v3-ink-muted)' }}
              >
                No retainer commitment required to start a conversation.
              </div>
            </div>
          </div>

          <div className="v3-container v3-container-wide">
            <div className="v3-hero-product v3-reveal">
              <HeroMockup />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section>
          <div className="v3-container">
            <div className="v3-strip">
              {[
                ['Monthly', 'Decision-ready reporting'],
                ['Forward-looking', 'Cash visibility and planning'],
                ['Recurring', 'Senior finance input'],
                ['London-led', 'Support across UK hubs'],
              ].map(([value, label]) => (
                <div key={label} className="v3-strip-item v3-reveal">
                  <div className="v3-strip-value">{value}</div>
                  <div className="v3-strip-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="v3-section">
          <div className="v3-container">
            <div
              className="v3-center v3-stack-md"
              style={{ maxWidth: 720, margin: '0 auto 3.5rem' }}
            >
              <div className="v3-reveal">
                <span className="v3-eyebrow">Core capabilities</span>
              </div>
              <h2 className="v3-display-lg v3-reveal">
                Three routes, built around the moments growing businesses lose
                clarity.
              </h2>
              <p className="v3-lede v3-reveal">
                Senior finance support, management reporting, and cashflow
                forecasting give leadership clearer monthly control without forcing
                an early full-time hire.
              </p>
            </div>

            <div className="v3-cap-grid">
              {capabilities.map((item) => (
                <CapabilityCard key={item.tag} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS — vertical editorial */}
        <section id="process" className="v3-section" style={{ background: 'var(--v3-bg-alt)' }}>
          <div className="v3-container">
            <div className="v3-grid-2" style={{ alignItems: 'end', marginBottom: '3rem' }}>
              <div className="v3-stack-md">
                <div className="v3-reveal">
                  <span className="v3-eyebrow">How it works</span>
                </div>
                <h2 className="v3-display-lg v3-reveal">
                  Understand your setup. Build the right routine. Use it to make
                  better decisions.
                </h2>
              </div>
              <p className="v3-lede v3-reveal">
                Cuno reviews what is happening now, builds the right monthly
                routine, and helps finance become easier to manage as the business
                grows.
              </p>
            </div>

            <div>
              {processSteps.map((step) => (
                <div key={step.number} className="v3-step v3-reveal">
                  <div className="v3-step-num">{step.number}</div>
                  <h3 className="v3-display-sm">{step.title}</h3>
                  <p className="v3-body" style={{ maxWidth: 520 }}>
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CUNO — dark editorial */}
        <section id="benefits" className="v3-section v3-dark">
          <div className="v3-container">
            <div
              className="v3-grid-2"
              style={{ alignItems: 'end', marginBottom: '3rem' }}
            >
              <div className="v3-stack-md">
                <div className="v3-reveal">
                  <span className="v3-eyebrow">Why Cuno</span>
                </div>
                <h2 className="v3-display-lg v3-reveal">
                  More than reporting. Less than a full-time senior finance hire.
                </h2>
              </div>
              <div className="v3-stack-md">
                <p className="v3-lede v3-reveal">
                  The service is built around recurring senior finance input,
                  clearer reporting, forward cash visibility, and a monthly rhythm
                  leadership will actually use.
                </p>
                <a
                  href="#contact"
                  className="v3-btn v3-btn-on-dark v3-reveal"
                  style={{ alignSelf: 'start' }}
                >
                  Book a consultation
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="v3-grid-outcomes">
              {benefits.map((b) => (
                <article
                  key={b.title}
                  className="v3-card-ghost-dark v3-reveal"
                  style={{ padding: '2rem', borderRadius: 22 }}
                >
                  <div className="v3-outcome-kicker" style={{ color: '#d7b7f2' }}>
                    {b.kicker}
                  </div>
                  <h3 className="v3-display-sm" style={{ marginTop: '0.75rem' }}>
                    {b.title}
                  </h3>
                  <p
                    className="v3-body"
                    style={{ marginTop: '0.85rem', color: 'var(--v3-on-dark-soft)' }}
                  >
                    {b.copy}
                  </p>
                  <div
                    style={{
                      marginTop: '1.5rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.875rem',
                      color: '#d7b7f2',
                    }}
                  >
                    Impact — {b.impact}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="v3-section-compact">
          <div className="v3-container v3-center v3-stack-md">
            <div className="v3-reveal">
              <span className="v3-eyebrow">Where we work</span>
            </div>
            <h2 className="v3-display-md v3-reveal">
              London-led, across UK growth hubs.
            </h2>
            <div className="v3-locations v3-reveal" style={{ marginTop: '1.5rem' }}>
              {locations.map((loc) => (
                <span key={loc} className="v3-location-pill">
                  <MapPin size={14} color="var(--v3-accent)" />
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="v3-section" style={{ background: 'var(--v3-bg-alt)' }}>
          <div className="v3-container v3-container-narrow">
            <div className="v3-center v3-stack-md" style={{ marginBottom: '3rem' }}>
              <div className="v3-reveal">
                <span className="v3-eyebrow">FAQ</span>
              </div>
              <h2 className="v3-display-lg v3-reveal">
                Common questions before a first conversation.
              </h2>
            </div>

            <div className="v3-reveal">
              {faqItems.map((item, i) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section id="contact" className="v3-section v3-dark">
          <div className="v3-container">
            <div className="v3-grid-2" style={{ alignItems: 'start' }}>
              <div className="v3-stack-md">
                <div className="v3-reveal">
                  <span className="v3-eyebrow">Ready to start</span>
                </div>
                <h2 className="v3-display-lg v3-reveal">
                  Make the finance function easier to manage each month.
                </h2>
                <p className="v3-lede v3-reveal">
                  If reporting is delayed, cash visibility is weak, or finance
                  decisions still rely too much on instinct, Cuno can help build a
                  clearer monthly rhythm.
                </p>
                <div
                  className="v3-reveal"
                  style={{
                    marginTop: '1.5rem',
                    display: 'grid',
                    gap: '1rem',
                    maxWidth: 420,
                  }}
                >
                  {[
                    { icon: Building2, text: 'Founder-led businesses and SMEs' },
                    { icon: CalendarClock, text: 'Monthly operating cadence' },
                    { icon: BadgePoundSterling, text: 'No retainer required to start' },
                    { icon: LineChart, text: 'Practical decision support' },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9375rem',
                        color: 'var(--v3-on-dark-soft)',
                      }}
                    >
                      <Icon size={18} color="#d7b7f2" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form
                className="v3-card-ghost-dark v3-reveal"
                style={{ padding: '2rem' }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div className="v3-field">
                    <label className="v3-field-label" htmlFor="v3-name">
                      Your name
                    </label>
                    <input id="v3-name" className="v3-input" placeholder="Full name" />
                  </div>
                  <div className="v3-field">
                    <label className="v3-field-label" htmlFor="v3-email">
                      Work email
                    </label>
                    <input
                      id="v3-email"
                      type="email"
                      className="v3-input"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="v3-field">
                    <label className="v3-field-label" htmlFor="v3-company">
                      Company
                    </label>
                    <input id="v3-company" className="v3-input" placeholder="Company name" />
                  </div>
                  <div className="v3-field">
                    <label className="v3-field-label" htmlFor="v3-msg">
                      What do you need support with?
                    </label>
                    <textarea
                      id="v3-msg"
                      className="v3-textarea"
                      placeholder="Outline your current set-up and where clarity feels missing."
                    />
                  </div>
                  <button
                    type="submit"
                    className="v3-btn v3-btn-primary"
                    style={{ marginTop: '0.5rem', height: '3rem' }}
                  >
                    Book a consultation
                    <ArrowRight size={16} />
                  </button>
                  <p
                    className="v3-small"
                    style={{ color: 'rgba(245,245,247,0.56)' }}
                  >
                    No retainer or commitment required. First conversation is
                    exploratory.
                  </p>
                </div>
              </form>
            </div>

            <div
              className="v3-reveal"
              style={{
                marginTop: '3.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {trustChips.map((chip) => (
                <span
                  key={chip}
                  className="v3-location-pill"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#d7b7f2',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="v3-footer">
        <div className="v3-container">
          <div className="v3-footer-grid">
            <div>
              <div className="v3-brand" style={{ marginBottom: '0.85rem' }}>
                <span className="v3-brand-mark">CU</span>
                <span>Cuno</span>
              </div>
              <p style={{ maxWidth: 340 }}>
                Cuno helps growing businesses improve monthly finance visibility
                through Senior Finance Support, Management Reporting, and Cashflow
                Forecasting.
              </p>
            </div>

            <div>
              <div className="v3-footer-title">Explore</div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <a href="#capabilities">Capabilities</a>
                <a href="#process">How it works</a>
                <a href="#benefits">Why Cuno</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>

            <div>
              <div className="v3-footer-title">Services</div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <span>Senior Finance Support</span>
                <span>Management Reporting</span>
                <span>Cashflow Forecasting</span>
              </div>
            </div>

            <div>
              <div className="v3-footer-title">Start</div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Book a consultation
                  <ArrowUpRight size={14} />
                </a>
                <span>London-led, UK-wide</span>
              </div>
            </div>
          </div>

          <div className="v3-footer-legal">
            <span>© {new Date().getFullYear()} Cuno. All rights reserved.</span>
            <span>Senior finance support for founder-led businesses.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppV3
