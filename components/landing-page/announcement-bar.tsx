'use client'

import { useState } from 'react'
import { ANNOUNCEMENT } from './content'

/**
 * Announcement strip.
 *
 * The reference design opens with a full-width utility band above the
 * navigation. It carries three zones: a short status line, one large
 * statement, and a link through to the section it points at.
 *
 * The close control is a real control. It removes the band and the layout
 * closes the gap behind it.
 */
export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-navy text-on-navy">
      <div className="mx-auto flex max-w-shell items-center gap-4 px-6 py-3 sm:px-8 lg:px-12">
        <p className="hidden text-label-md font-bold uppercase tracking-[0.16em] text-on-navy-muted sm:block">
          {ANNOUNCEMENT.left}
        </p>

        <p className="flex-1 text-center font-headline text-sm font-extrabold uppercase tracking-[0.1em] sm:text-base">
          {ANNOUNCEMENT.center}
        </p>

        <a
          href={ANNOUNCEMENT.right.href}
          className="focus-ring hidden text-label-md font-bold uppercase tracking-[0.16em] underline underline-offset-4 hover:text-eucalyptus sm:block"
        >
          {ANNOUNCEMENT.right.label}
        </a>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="focus-ring ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-on-navy-muted transition-colors hover:text-on-navy sm:ml-0"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
