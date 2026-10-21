import Image from 'next/image'
import Link from 'next/link'
import { FOOTER } from './content'

/**
 * Footer.
 *
 * Only two link groups, because the site has two link groups. The legal links
 * point at pages that exist.
 *
 * The small bottom labels run at 50 percent white on navy, which measures
 * 4.97:1. They were previously at 30 percent, which measures 2.30:1 and
 * failed the AA bar for text.
 */
export default function Footer() {
  return (
    <footer className="bg-navy pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:gap-20">
          <div>
            <Image
              src="/SEEGLA-LOGO-VARIATIONPRIMARY.png"
              alt="Seegla"
              width={110}
              height={30}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-navy-subtle">
              {FOOTER.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {FOOTER.columns.map((column) => (
              <div key={column.heading} className="flex flex-col gap-1">
                <h2 className="font-headline text-label-md font-bold uppercase tracking-[0.16em] text-on-navy">
                  {column.heading}
                </h2>
                <ul className="mt-3 flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="focus-ring inline-flex min-h-11 items-center rounded-md text-sm text-on-navy-subtle transition-colors hover:text-eucalyptus"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-on-navy/20 pt-8 md:flex-row md:items-center">
          <p className="text-label-md font-bold uppercase tracking-[0.16em] text-on-navy-subtle">
            {FOOTER.left}
          </p>
          <p className="text-label-md font-bold uppercase tracking-[0.16em] text-on-navy-subtle">
            {FOOTER.right}
          </p>
        </div>
      </div>
    </footer>
  )
}
