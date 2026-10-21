import { getAppSlides } from '@/lib/marketing-images'
import AppPreview from './app-preview'

/**
 * The phone frame that holds the app preview.
 *
 * The right half of the features section used to be empty, and the product
 * was only ever described in words. The frame gives that space a job and puts
 * the app where a visitor looks for it.
 *
 * The screens inside are the feature images, one per screen, and the frame
 * slides through them. Drop a file named `app-01.png` (or any `app-*`
 * image) into `public/marketing/` and those screens take over, on the next
 * refresh.
 *
 * The bezel is the page's dark tone rather than a shadow. DESIGN.md allows
 * two elevations, and the second one belongs to the navigation bar.
 */
export default function AppFrame() {
  const slides = getAppSlides()

  return (
    <div className="relative mx-auto w-[11.5rem] sm:w-[13rem] lg:mx-0 lg:w-[16.5rem]">
      <div className="relative rounded-[2.25rem] bg-navy p-2.5 sm:rounded-[2.75rem] sm:p-3">
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.75rem] bg-navy-lift sm:rounded-[2.25rem]">
          <AppPreview slides={slides} />
        </div>
      </div>
    </div>
  )
}
