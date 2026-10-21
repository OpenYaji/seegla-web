import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

/**
 * The marketing image folders are the source of truth.
 *
 * Drop a file into `public/marketing/` and it appears on the page. There is
 * no import list to edit and no rebuild to run: the server re-reads the
 * folder on every request, so a refresh is enough.
 *
 *   public/marketing/hero-04.webp     -> the next hero slide
 *   public/marketing/feature-08.jpg   -> the next feature card
 *
 * Captions live beside the images in `public/marketing/captions.json`, keyed
 * by filename. A file with no caption entry still appears, with a generic
 * caption, so adding an image never breaks the page.
 */

const IMAGE_EXTENSION = /\.(webp|jpe?g|png|avif)$/i
const MARKETING_DIR = path.join(process.cwd(), 'public', 'marketing')

export type HeroCaption = {
  title: string
  kicker: string
  alt: string
  cta: { label: string; href: string }
}

export type FeatureCaption = {
  title: string
  kicker: string
  meta: string
  alt: string
}

export type HeroSlide = {
  file: string
  src: string
  title: string
  kicker: string
  alt: string
  cta: { label: string; href: string }
}

export type FeatureCard = {
  file: string
  src: string
  title: string
  kicker: string
  meta: string
  alt: string
}

/** One screen inside the phone frame in the features section. */
export type AppSlide = {
  key: string
  src: string
  alt: string
  title?: string
  kicker?: string
  meta?: string
}

/** Sorts "hero-2" before "hero-10" the way a person expects, not "10" before "2". */
function naturalSort(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

function listFiles(prefix: string): string[] {
  let entries: string[]
  try {
    entries = fs.readdirSync(MARKETING_DIR)
  } catch {
    return []
  }
  return entries
    .filter((name) => name.toLowerCase().startsWith(prefix))
    .filter((name) => IMAGE_EXTENSION.test(name))
    .filter((name) => !name.startsWith('.'))
    .sort(naturalSort)
}

/**
 * A cache-busting token derived from the file's last-modified time.
 *
 * The image `src` is the filename, and both the browser and the Next.js
 * image optimizer cache by URL. If the bytes behind `hero-01.webp` change but
 * the name does not, nothing re-fetches. Appending `?v=<mtime>` changes the
 * URL whenever the file changes, so a new picture shows without clearing any
 * cache. If the file cannot be stat-ed, the token is omitted.
 */
function versionToken(file: string): string {
  try {
    return `?v=${Math.floor(fs.statSync(path.join(MARKETING_DIR, file)).mtimeMs)}`
  } catch {
    return ''
  }
}

function readCaptions(): Record<string, Partial<HeroCaption & FeatureCaption>> {
  try {
    const raw = fs.readFileSync(path.join(MARKETING_DIR, 'captions.json'), 'utf8')
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

const DEFAULT_HERO_CTA = { label: 'Schedule a Quick Intro', href: '/book-a-demo' }

/** Every hero image in the folder, in filename order. */
export function getHeroSlides(): HeroSlide[] {
  const captions = readCaptions()
  return listFiles('hero-').map((file) => {
    const caption = captions[file] ?? {}
    const title = caption.title ?? 'Seegla for your team'
    return {
      file,
      src: `/marketing/${file}${versionToken(file)}`,
      title,
      kicker: caption.kicker ?? 'Corporate wellness for the Filipino workforce',
      alt: caption.alt ?? title,
      cta: caption.cta ?? DEFAULT_HERO_CTA,
    }
  })
}

/**
 * Every feature image in the folder, in filename order.
 *
 * These are the screens the phone frame slides through, one feature per
 * screen. The card band that used to sit under the section header is gone.
 */
export function getFeatureCards(): FeatureCard[] {
  const captions = readCaptions()
  return listFiles('feature-').map((file) => {
    const caption = captions[file] ?? {}
    const title = caption.title ?? 'Seegla'
    return {
      file,
      src: `/marketing/${file}${versionToken(file)}`,
      title,
      kicker: caption.kicker ?? 'Built for the Filipino workforce',
      meta: caption.meta ?? 'iOS and Android | No wearable required',
      alt: caption.alt ?? title,
    }
  })
}

/**
 * The screens inside the phone frame.
 *
 * Real app screenshots win: every file named `app-*` in the folder becomes a
 * screen, in filename order, so the phone slides through the app the way a
 * visitor will see it. Drop `app-01.png` into `public/marketing/` and it
 * appears on the next refresh, with no code change.
 *
 * Until there are any, the frame shows the feature set, one feature per
 * screen. That is the content the section is about anyway, so the frame
 * says something true instead of standing empty.
 */
export function getAppSlides(): AppSlide[] {
  const captions = readCaptions()
  const appFiles = listFiles('app-')

  if (appFiles.length > 0) {
    return appFiles.map((file) => {
      const caption = captions[file] ?? {}
      return {
        key: file,
        src: `/marketing/${file}${versionToken(file)}`,
        alt: caption.alt ?? 'The Seegla app',
        title: caption.title,
        kicker: caption.kicker,
        meta: caption.meta,
      }
    })
  }

  return getFeatureCards().map((card) => ({
    key: card.file,
    src: card.src,
    alt: card.alt,
    title: card.title,
    kicker: card.kicker,
    meta: card.meta,
  }))
}
