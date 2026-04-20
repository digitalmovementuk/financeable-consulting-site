import { useEffect, useState } from 'react'
import {
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

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Challenges', href: '#challenges' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
] as const

const trustChips = [
  'Monthly CFO',
  'Financial Reporting',
  'Cashflow Management',
  'London-focused support',
] as const

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

type ServiceItem = {
  label: string
  title: string
  copy: string
  benefit: string
  bullets: readonly string[]
  icon: LucideIcon
}

const services: readonly ServiceItem[] = [
  {
    label: 'Monthly CFO',
    title: 'Senior finance support without a full-time CFO hire',
    copy:
      'A recurring finance leadership model for businesses that need clearer reporting, sharper decision support, and a dependable monthly finance rhythm.',
    benefit:
      'Bring monthly clarity and financial leadership into the business before a permanent senior hire is justified.',
    bullets: ['Monthly finance cadence', 'Leadership decision support', 'Reporting and forecast review'],
    icon: Landmark,
  },
  {
    label: 'Financial Reporting',
    title: 'Management reporting that is built for decisions',
    copy:
      'Clearer monthly reporting, management accounts, and budget-versus-actual visibility for teams that need reliable numbers and sharper commentary.',
    benefit:
      'Turn reports into a management tool instead of a delayed monthly admin task.',
    bullets: ['Management accounts', 'Variance analysis', 'Monthly visibility'],
    icon: NotebookTabs,
  },
  {
    label: 'Cashflow Management',
    title: 'Forward cash visibility before pressure turns into risk',
    copy:
      'Cash forecasting, planning cadence, and practical finance support for growing businesses that need control over liquidity and near-term decisions.',
    benefit:
      'Reduce cash surprises and make growth decisions with better forward visibility.',
    bullets: ['Rolling cash forecast', 'Decision support', 'Growth-stage planning'],
    icon: Wallet,
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

const signatureHighlights = [
  'Monthly review cadence',
  'Management interpretation',
  'Forecast and cash discussion',
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

type TrustItem = {
  title: string
  copy: string
  icon: LucideIcon
}

const trustItems: readonly TrustItem[] = [
  {
    title: 'No fake proof layer',
    copy:
      'The site avoids invented testimonials, ratings, and credentials. Trust is built through specific services, clear process, and realistic expectations.',
    icon: Building2,
  },
  {
    title: 'A commercially useful finance lens',
    copy:
      'The emphasis is on management visibility, budget versus actual understanding, and cash planning that supports action.',
    icon: LineChart,
  },
  {
    title: 'Structured for later SEO expansion',
    copy:
      'The live site is the core six-page brand layer, while the 450-page keyword matrix remains ready for later rollout.',
    icon: CalendarClock,
  },
] as const

const whyChoose = [
  'Built around finance clarity, not generic advisory language',
  'Designed for businesses that are too complex for informal finance handling but too early for a full-time senior hire',
  'Focused on decision usefulness, not just historic reporting output',
  'Low-friction enquiry route with no invented proof or inflated claims',
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
    question: 'Who is cunos consulting best suited to?',
    answer:
      'It is best suited to founder-led businesses, growing SMEs, and small leadership teams that need stronger reporting, cash visibility, and practical finance support without hiring a full-time senior leader too early.',
  },
  {
    question: 'What services does cunos consulting offer?',
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

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.v4-reveal'))

    if (reduce) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}

function SectionEyebrow({
  children,
  tone = 'light',
}: {
  children: string
  tone?: 'light' | 'dark'
}) {
  return (
    <span className={`v4-eyebrow ${tone === 'dark' ? 'v4-eyebrow-dark' : ''}`}>
      {children}
    </span>
  )
}

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon

  return (
    <article className="v4-service-card v4-reveal">
      <div className="v4-service-topline">
        <SectionEyebrow tone="dark">{item.label}</SectionEyebrow>
        <span className="v4-icon-chip">
          <Icon size={18} />
        </span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
      <div className="v4-service-benefit">{item.benefit}</div>
      <ul>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <a href="#contact" className="v4-text-link">
        View service
        <ArrowRight size={16} />
      </a>
    </article>
  )
}

function AppV4() {
  useReveal()

  const [isHeaderSolid, setIsHeaderSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)

  useEffect(() => {
    const onScroll = () => setIsHeaderSolid(window.scrollY > 18)
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
    <div className="v4-page">
      <div className="v4-background">
        <div className="v4-grid" />
        <div className="v4-orb v4-orb-one" />
        <div className="v4-orb v4-orb-two" />
        <div className="v4-orb v4-orb-three" />
      </div>

      <header className={`v4-header ${isHeaderSolid ? 'is-solid' : ''}`}>
        <div className="v4-shell v4-header-inner">
          <a href="#top" className="v4-brand">
            <span className="v4-brand-mark">CC</span>
            <span className="v4-brand-copy">
              <strong>cunos consulting</strong>
              <em>Design version 04</em>
            </span>
          </a>

          <nav className="v4-nav">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="v4-header-actions">
            <a href="../" className="v4-button v4-button-secondary">
              View v1.2
            </a>
            <a href="#contact" className="v4-button v4-button-primary">
              Book a consultation
            </a>
          </div>

          <button
            type="button"
            className="v4-menu-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="v4-mobile-sheet">
          <div className="v4-mobile-card">
            <div className="v4-mobile-head">
              <div className="v4-brand-copy">
                <strong>cunos consulting</strong>
                <em>Design version 04</em>
              </div>
              <button
                type="button"
                className="v4-menu-button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <nav className="v4-mobile-nav">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="v4-mobile-actions">
              <a href="../" className="v4-button v4-button-secondary" onClick={() => setMenuOpen(false)}>
                View v1.2
              </a>
              <a href="#contact" className="v4-button v4-button-primary" onClick={() => setMenuOpen(false)}>
                Book a consultation
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <main id="top">
        <section className="v4-hero">
          <div className="v4-shell v4-hero-grid">
            <div className="v4-hero-copy v4-reveal">
              <SectionEyebrow>London Finance Support</SectionEyebrow>
              <h1>Senior finance support for businesses that need clearer monthly decisions.</h1>
              <p className="v4-hero-body">
                Cunos Consulting helps founder-led businesses and growing teams bring
                order to reporting, cash visibility, and finance leadership. The focus
                is practical: clearer monthly numbers, stronger decision support, and a
                better operating rhythm without the cost of a full-time finance
                director or CFO too early.
              </p>

              <div className="v4-chip-row">
                {trustChips.map((chip) => (
                  <span key={chip} className="v4-chip">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="v4-point-grid">
                {heroPoints.map(([title, copy]) => (
                  <article key={title} className="v4-point-card">
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </article>
                ))}
              </div>

              <div className="v4-hero-actions">
                <a href="#contact" className="v4-button v4-button-primary">
                  Start a brief
                </a>
                <a href="#services" className="v4-button v4-button-secondary">
                  Explore services
                </a>
              </div>

              <p className="v4-meta-note">No retainer commitment required to start a conversation.</p>
            </div>

            <div className="v4-stage v4-reveal">
              <div className="v4-stage-slashes" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="v4-stage-intro">
                <SectionEyebrow>Start with a brief</SectionEyebrow>
                <h2>Book a consultation</h2>
                <p>Share the finance challenge that feels hardest to manage right now.</p>
              </div>

              <form
                id="contact"
                className="v4-form"
                onSubmit={(event) => {
                  event.preventDefault()
                }}
              >
                {['Your name', 'Work email', 'Company', 'What do you need support with?'].map(
                  (field) => (
                    <label key={field}>
                      <span>{field}</span>
                      {field === 'What do you need support with?' ? (
                        <textarea placeholder="Outline the finance challenge you want to fix first." />
                      ) : (
                        <input placeholder={field} />
                      )}
                    </label>
                  ),
                )}

                <button type="submit" className="v4-button v4-button-primary v4-form-button">
                  Book a consultation
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="v4-form-note">
                No retainer or commitment required. First conversation is exploratory.
              </div>

              <div className="v4-floater v4-floater-one">
                <strong>Monthly</strong>
                <span>Operating rhythm</span>
              </div>
              <div className="v4-floater v4-floater-two">
                <strong>£0</strong>
                <span>Retainer to start</span>
              </div>
              <div className="v4-floater v4-floater-three">
                <strong>London-led</strong>
                <span>Support for growth hubs</span>
              </div>
            </div>
          </div>
        </section>

        <section className="v4-stats">
          <div className="v4-shell v4-stats-grid">
            {stats.map(([value, label]) => (
              <article key={value} className="v4-stat-card v4-reveal">
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="v4-section v4-section-light" id="services">
          <div className="v4-shell">
            <div className="v4-section-head v4-reveal">
              <SectionEyebrow tone="dark">Core services</SectionEyebrow>
              <h2>Three finance support routes, built around the moments growing businesses lose clarity.</h2>
            </div>

            <div className="v4-service-grid">
              {services.map((item) => (
                <ServiceCard key={item.label} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="v4-section v4-section-dark" id="challenges">
          <div className="v4-shell">
            <div className="v4-section-head v4-reveal">
              <SectionEyebrow>Why businesses seek this support</SectionEyebrow>
              <h2>The issue is rarely a missing spreadsheet. It is the absence of a reliable finance rhythm.</h2>
            </div>

            <div className="v4-challenge-list">
              {challenges.map((item, index) => (
                <article key={item.title} className="v4-challenge-card v4-reveal">
                  <span className="v4-challenge-index">{`0${index + 1}`}</span>
                  <div>
                    <SectionEyebrow>Challenge</SectionEyebrow>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-section v4-section-signature">
          <div className="v4-shell v4-signature-panel v4-reveal">
            <div className="v4-signature-copy">
              <SectionEyebrow>Signature Offer</SectionEyebrow>
              <h2>Monthly CFO support that connects reporting, cash visibility, and leadership decisions.</h2>
              <p>
                The Monthly CFO service is the clearest entry point for businesses that
                need more than reporting and less than a full-time senior finance hire.
                It combines recurring finance leadership, management discussion,
                reporting review, and practical decision support.
              </p>
              <p>
                That makes it especially useful when growth has outpaced the current
                finance setup. Instead of reacting to numbers after the fact,
                leadership gets a clearer monthly rhythm around what happened, what is
                changing, and what deserves action next.
              </p>
              <a href="#contact" className="v4-button v4-button-primary">
                Explore Monthly CFO
              </a>
            </div>

            <div className="v4-signature-side">
              <div className="v4-signature-list">
                {signatureHighlights.map((item) => (
                  <div key={item} className="v4-signature-item">
                    {item}
                  </div>
                ))}
              </div>
              <div className="v4-signature-stat">
                <span>Monthly CFO</span>
                <strong>Reporting, cash visibility, and leadership decisions in one clear rhythm.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="v4-section v4-section-light" id="process">
          <div className="v4-shell">
            <div className="v4-section-head v4-reveal">
              <SectionEyebrow tone="dark">How it works</SectionEyebrow>
              <h2>Understand the finance setup, build the right cadence, and use it to support better decisions.</h2>
            </div>

            <div className="v4-process-grid">
              {processSteps.map((step) => (
                <article key={step.number} className="v4-process-card v4-reveal">
                  <span className="v4-process-index">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-section v4-section-dark">
          <div className="v4-shell">
            <div className="v4-section-head v4-reveal">
              <SectionEyebrow>Trust and transparency</SectionEyebrow>
              <h2>The site earns trust through specificity, not inflated claims.</h2>
            </div>

            <div className="v4-trust-grid">
              {trustItems.map((item) => {
                const Icon = item.icon

                return (
                  <article key={item.title} className="v4-trust-card v4-reveal">
                    <span className="v4-icon-chip v4-icon-chip-dark">
                      <Icon size={18} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="v4-section v4-section-light">
          <div className="v4-shell v4-split-grid">
            <article className="v4-about-card v4-reveal">
              <SectionEyebrow tone="dark">About the business</SectionEyebrow>
              <h2>Cunos Consulting is built around useful monthly control.</h2>
              <p>
                Cunos Consulting is positioned as a practical finance partner for
                founder-led businesses, startups, and growing SMEs that need clearer
                monthly control. The approach is designed to fit before a full-time
                senior finance hire is justified.
              </p>
              <a href="#contact" className="v4-text-link">
                Learn more about the approach
                <ArrowRight size={16} />
              </a>
            </article>

            <article className="v4-why-card v4-reveal">
              <SectionEyebrow tone="dark">Why choose cunos consulting</SectionEyebrow>
              <h2>A calm, commercially useful finance layer for growth-stage decisions.</h2>
              <ul className="v4-why-list">
                {whyChoose.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="v4-section v4-section-dark">
          <div className="v4-shell v4-area-layout">
            <div className="v4-section-head v4-reveal">
              <SectionEyebrow>Service area</SectionEyebrow>
              <h2>London-led. Built for growth hubs across the UK.</h2>
              <p>
                Primary focus is London and its key business districts, with support
                extending to selected UK growth markets.
              </p>
            </div>

            <div className="v4-area-cloud v4-reveal">
              {locations.map((item) => (
                <span key={item} className="v4-location-chip">
                  <MapPin size={14} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-section v4-section-light" id="faq">
          <div className="v4-shell">
            <div className="v4-section-head v4-reveal">
              <SectionEyebrow tone="dark">FAQ</SectionEyebrow>
              <h2>Questions that come up before a first finance support conversation.</h2>
            </div>

            <div className="v4-faq-list">
              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index

                return (
                  <div key={item.question} className={`v4-faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="v4-faq-trigger"
                      onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    >
                      <span>{item.question}</span>
                      <Plus size={18} />
                    </button>
                    <div className="v4-faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="v4-section v4-final-cta">
          <div className="v4-shell v4-final-panel v4-reveal">
            <div className="v4-final-copy">
              <SectionEyebrow>Ready to start</SectionEyebrow>
              <h2>Make the finance function easier to manage each month.</h2>
              <p>
                If reporting is delayed, cash visibility is weak, or finance decisions
                still rely too much on instinct, Cunos Consulting can help build a
                clearer monthly rhythm.
              </p>
              <div className="v4-hero-actions">
                <a href="#contact" className="v4-button v4-button-primary">
                  Book a consultation
                </a>
                <a href="#services" className="v4-button v4-button-secondary">
                  Review services
                </a>
              </div>
            </div>

            <div className="v4-final-aside">
              <div className="v4-final-item">
                <BadgePoundSterling size={18} />
                <span>No retainer required to begin</span>
              </div>
              <div className="v4-final-item">
                <CalendarClock size={18} />
                <span>Monthly finance rhythm</span>
              </div>
              <div className="v4-final-item">
                <Building2 size={18} />
                <span>Support for founder-led businesses and SMEs</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="v4-footer">
        <div className="v4-shell v4-footer-grid">
          <div>
            <div className="v4-brand v4-brand-footer">
              <span className="v4-brand-mark">CC</span>
              <span className="v4-brand-copy">
                <strong>cunos consulting</strong>
                <em>Finance support</em>
              </span>
            </div>
            <p className="v4-footer-copy">
              Cunos Consulting helps growing businesses improve monthly finance
              visibility through Monthly CFO, Financial Reporting, and Cashflow
              Management support.
            </p>
            <p className="v4-footer-copy">
              London-focused support for founder-led businesses, SMEs, and selected UK
              growth hubs.
            </p>
          </div>

          <div className="v4-footer-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="v4-footer-points">
            <div>
              <Building2 size={16} />
              Founder-led businesses and SMEs
            </div>
            <div>
              <CalendarClock size={16} />
              Monthly operating cadence
            </div>
            <div>
              <BadgePoundSterling size={16} />
              No retainer required to start
            </div>
            <div>
              <LineChart size={16} />
              Practical decision support
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppV4
