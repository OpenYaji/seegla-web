import { getHeroSlides } from '@/lib/marketing-images'
import HeroCarouselClient from './hero-carousel-client'

/**
 * The hero carousel reads its slides from `public/marketing/`.
 *
 * Every file named `hero-*` becomes a slide, in filename order. Drop a new
 * photograph in that folder and it is the next slide, on the next refresh.
 * The captions come from `public/marketing/captions.json`.
 */
export default function HeroCarousel() {
  const slides = getHeroSlides()
  return <HeroCarouselClient slides={slides} />
}
