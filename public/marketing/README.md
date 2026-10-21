# Marketing images

This folder is the source of truth for the landing page images. **You never
have to edit a component or a list to add a picture.**

## How it works

The page reads this folder on every request. Drop a file in and it is live on
the next refresh. There is no build step and no import list.

| You drop in            | It becomes                        |
| ---------------------- | --------------------------------- |
| `hero-04.webp`         | the 4th slide in the hero carousel |
| `hero-05.jpg`          | the 5th slide in the hero carousel |
| `feature-08.webp`      | the 8th card in the feature band   |
| `feature-09.jpg`       | the 9th card in the feature band   |
| `app-01.png`           | the 1st screen in the phone frame  |
| `app-02.png`           | the 2nd screen in the phone frame  |

Rules:

- The filename prefix decides the band: `hero-` for the carousel,
  `feature-` for the card band, `app-` for the phone frame.
- The number in the filename decides the order. `hero-2` comes before
  `hero-10`, the way you would expect, not the way a plain sort would do it.
- `.webp`, `.jpg`, `.jpeg`, `.png` and `.avif` are all accepted.
- Files with any other name are ignored, so screenshots and logos can live
  here without showing up on the page.

## The phone frame

The features section has a phone frame on the right. Inside it, the screens
are the `app-*` files, one per screen, and a visitor can swipe between them.

While there are no `app-*` files, the frame shows the feature images instead,
one feature per screen, so it is never an empty box.

When the app is finished, drop the real screenshots in as `app-01.png`,
`app-02.png` and so on. They take over the frame on the next refresh. A
portrait screenshot at about 780 by 1680 fills the screen without cropping.

## Captions

`captions.json` holds the words for each image, keyed by filename:

```json
{
  "hero-04.webp": {
    "title": "Built for HR Leaders",
    "kicker": "Aggregated scores, never individual data",
    "alt": "Seegla dashboard for HR leaders",
    "cta": { "label": "See how it works", "href": "#how-it-works" }
  },
  "feature-08.webp": {
    "title": "Push Reminders",
    "kicker": "Only when it helps",
    "meta": "Movement and mindfulness | Non-intrusive",
    "alt": "Smart push reminders"
  }
}
```

An image with no entry still appears. It gets a sensible generic caption, so
adding a picture never breaks the page. `alt` should describe the photo for
someone who cannot see it.

## Notes

- **Hero images**: aim for roughly 1600x900 or wider. They fill the width of
  the page, and the text sits on top of a 60 percent navy scrim, so a
  brighter photo still keeps the headline readable.
- **Feature images**: roughly 900x675 (4:3) works best. They sit in a
  224px-wide frame.
- WebP is smaller for the same picture. A 1600x900 hero is around 20KB as
  WebP and 200KB or more as JPEG.
- The page is rendered per request so this stays live. In development a
  refresh is enough. In production the same is true, as long as the server
  is running the current build.
