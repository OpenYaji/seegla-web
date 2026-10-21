/**
 * Every string on the landing page lives here, except the image captions.
 *
 * The copy is the owner&apos;s. Where the source carried a specific
 * statistic, that statistic is preserved as written, and no claim was added.
 * Three edits were made on the owner&apos;s instruction: the em dashes are
 * gone, the section label now matches the navigation, and the reserve FAQ
 * questions are the ones the page renders.
 *
 * The layout follows the reference design supplied in
 * public/youaligned-1024x829.avif: an announcement strip, a two-tier
 * navigation, a photographic hero carousel, and a horizontally scrolling band
 * of alternating image-and-text cards. Palette and typography stay with
 * DESIGN.md (Deep Navy and Eucalyptus, Plus Jakarta Sans and Inter).
 *
 * The hero slides and feature cards are not listed here. They are read from
 * the `public/marketing/` folder at request time, so dropping a photograph in
 * that folder adds it to the page without touching any code. Their captions
 * live in `public/marketing/captions.json`.
 */

export const ANNOUNCEMENT = {
  left: 'Now onboarding partner companies',
  center: 'Free during beta',
  right: { label: 'See how it works', href: '#how-it-works' },
}

export const SITE_NAV = {
  note: 'Corporate wellness for the Filipino workforce',
  stat: {
    lead: 'Partner pricing',
    figure: '₱199',
    tail: 'per employee, per month',
  },
  cta: { label: 'Schedule a Quick Intro', href: '/book-a-demo' },
  login: { label: 'Log In', href: '/admin/login' },
  categories: [
    { label: 'The Problem', href: '#the-problem' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Benefits', href: '#roi' },
    { label: 'FAQ', href: '#faq' },
  ],
}

export const PROBLEM = {
  label: 'The Problem',
  headline: 'Most companies only notice when it’s too late.',
  body: 'After someone has already left, there’s no system to see it coming.',
  lead: {
    figure: '68%',
    text: 'Filipino employees report feeling burned out',
  },
  points: [
    { title: 'High Turnover', body: 'in Philippine companies' },
    { title: 'Lost Productivity', body: 'when top performers disengage or resign' },
  ],
}

export const STEPS = [
  {
    title: '1. Daily Challenges',
    description:
      'Employees complete short, engaging wellness challenges that build healthy habits without disrupting work. Designed for the high-performance professional.',
  },
  {
    title: '2. Company-Funded Rewards',
    description:
      'Points earned can be redeemed for perks or cash, motivating participation and rewarding healthy behavior.',
  },
  {
    title: '3. Measurable Impact',
    description:
      'Track team performance, monitor burnout risk, and measure ROI with clean dashboards built for HR leaders and executives.',
  },
]

export const HOW_IT_WORKS = {
  label: 'How It Works',
  headline: 'Simple, measurable, and impactful wellness.',
  day: {
    label: 'A day on Seegla',
    moments: [
      { time: 'Morning', body: 'The 60-second burnout check-in. Three questions, anonymous by design.' },
      { time: 'Midday', body: 'Bonus points keep healthy habits alive outside office hours.' },
      { time: '8PM', body: 'Promo Hour puts the day’s points back in play before the day ends.' },
    ],
  },
}

export const FEATURES = {
  label: 'What your team gets',
  headline: 'Everything your employees need. In their pocket',
  lead: 'Built natively with React Native via Expo for a premium experience on iOS and Android. Under 60 seconds to complete a full day.',
  cta: { label: 'Schedule a Quick Intro', href: '/book-a-demo' },
}

export const ROI = {
  label: 'Business Impact',
  headline: 'Invest in wellness.',
  headlineSecond: 'See measurable results.',
  body: 'Seegla turns employee wellness into a strategic business advantage. We move beyond “perks” into real-world HR data that impacts the bottom line, specifically targeting the Philippine workforce’s unique challenges.',
  points: [
    'Reduce absenteeism and improve overall team productivity',
    'Boost engagement and retention through gamified daily wellness habits',
    'Company-funded rewards make wellness tangible and motivating',
    'Real-time HR dashboard built for people decisions based on data',
  ],
  figure: {
    label: 'Projected Value',
    value: '42x',
    caption: 'Return on Investment',
    note: 'Calculated for a 200-person company at only ₱199/employee/month.',
  },
}

export const FAQS = [
  {
    q: 'What is Seegla and who is it for?',
    a: 'Seegla is the first gamified corporate wellness platform specifically built for the Filipino workforce. It is designed for HR managers and CEOs at Philippine companies: BPOs, SMEs, and mid-size corporations with 20 to 500 employees who want to reduce burnout, improve productivity, and retain their people.',
  },
  {
    q: 'How does the pricing work?',
    a: 'Seegla is currently in beta and free for our partner companies. Our beta program is now closed to new applicants, but you can join the waitlist to be first in line when we open to new companies.',
  },
  {
    q: 'How do employees join?',
    a: 'HR managers receive a unique 6-character company code when they onboard. Employees download the Seegla app on their personal phone, iOS or Android, enter the company code, and are live within minutes. No IT setup required.',
  },
  {
    q: 'Can employers see individual employee health data?',
    a: 'No. Individual employee responses are completely private. HR managers and CEOs only see aggregated, anonymized team and department-level wellness scores. Seegla is fully compliant with the Philippine Data Privacy Act (Republic Act 10173).',
  },
  {
    q: 'How does the rewards system work?',
    a: 'Companies fund their own rewards budget through the Seegla platform. HR sets the rewards table (e.g., 1,000 points = ₱50 via GCash). Employees earn points through verified daily activities and redeem them based on their company’s table. Seegla processes the redemption automatically.',
  },
  {
    q: 'Is Seegla available on iOS and Android?',
    a: 'Yes. Seegla is built for both iOS and Android. No wearable device is required.',
  },
]

/*
 * The FAQ above was the author&apos;s own reserve copy. It was parked because
 * the section was rendering four feature claims instead of questions, and a
 * visitor looking for an FAQ expects questions. The wording is the author&apos;s.
 */

export const WAITLIST = {
  headline: 'Be first.',
  headlineSecond: 'Get ahead.',
  body: 'Seegla’s beta program is underway. Join the waitlist and be first in line when we open to new companies, with priority onboarding and early adopter benefits.',
  points: [
    'First to know when Seegla opens to new companies',
    'Priority onboarding, skip the queue',
    'Free access locked in before public pricing goes live',
    'Exclusive early adopter status for your team',
  ],
  footnote: 'No credit card required',
}

export const FOOTER = {
  tagline:
    '© 2026 Seegla. Philippines. The first gamified corporate wellness platform for the Filipino workforce. Healthy People. Growing Business.',
  columns: [
    {
      heading: 'Platform',
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'Benefits', href: '#roi' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'Schedule a Quick Intro', href: '/book-a-demo' },
        { label: 'Join the Waitlist', href: '#waitlist' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ],
  left: 'Built for the future of work.',
  right: 'Philippines · B2B Corporate Wellness',
}
