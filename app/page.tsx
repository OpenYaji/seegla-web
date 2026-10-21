import MarketingNav from '@/components/marketing/navbar'
import AnnouncementBar from '@/components/landing-page/announcement-bar'
import BusinessImpact from '@/components/landing-page/business-impact'
import Faq from '@/components/landing-page/faq'
import Features from '@/components/landing-page/features'
import Footer from '@/components/landing-page/footer'
import HeroCarousel from '@/components/landing-page/hero-carousel'
import HowItWorks from '@/components/landing-page/how-it-works'
import Problem from '@/components/landing-page/problem'
import ScrollToTop from '@/components/landing-page/scroll-to-top'
import Waitlist from '@/components/landing-page/waitlist'

/**
 * Rendered per request so the hero slides and the app screens are read from
 * the `public/marketing/` folder on every visit. Drop a photograph in that
 * folder and it is on the page on the next refresh, with no build and no code
 * change.
 *
 * The trade-off is that this route is no longer prerendered to a static file.
 * For a marketing page with a client-side form, that is the right way round.
 */
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-5 focus:py-3 focus:text-on-navy"
      >
        Skip to content
      </a>

      <AnnouncementBar />
      <MarketingNav />

      <main id="main">
        <HeroCarousel />
        <Problem />
        <HowItWorks />
        <Features />
        <BusinessImpact />
        <Faq />
        <Waitlist />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
