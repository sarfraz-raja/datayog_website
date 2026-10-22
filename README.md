# DATAYOG Website

Company website for DATAYOG, built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4.
It is a fully static site: `npm run build` exports plain HTML, CSS and JS into `out/`, which is
hosted on Cloudflare Pages (free plan). There is no server code.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `out/` (also type-checks) |
| `npm run preview` | Serve `out/` exactly like Cloudflare Pages (redirects and 404 page included) on http://localhost:3100. Run `npm run build` first. |
| `npm run deploy` | Build and upload to Cloudflare Pages (see [Deploy](#deploy)) |
| `npm run lint` | ESLint |

## Project structure

```
src/
  app/                 Pages (one folder per URL)
  components/          UI building blocks (header, footer, cards, forms, page templates)
  content/             All website text and data, edited here (no CMS)
    site.ts            Company details, phone numbers, emails, navigation menu
    offerings.ts       Solutions & services (each entry becomes a page)
    company.ts         About, principles, careers, client logos
    posts.ts           Insights / blog articles
  lib/forms.ts         Form validation and the mailto: link for the forms
public/
  images/              Logos and photos (WebP / SVG)
  _redirects           Old WordPress URLs → new pages (Cloudflare Pages)
scripts/               Build helpers (illustrations, prefetch files)
wrangler.toml          Cloudflare Pages settings
```

## Editing content

- **Phone, email, address or menu:** edit `src/content/site.ts`.
- **Add a solution or service:** add an entry to `offerings` in `src/content/offerings.ts`
  with `kind: "solutions"` or `kind: "services"`. Its page, card and related links are created
  automatically. To show it in the header dropdown as well, add it to `nav` in `site.ts`.
- **Add a blog article:** add an entry to `posts` in `src/content/posts.ts`.
- **Images:** use WebP, about 1200px wide at most. `next/image` resizes them for each device.

## Illustrations

The solution, service, blog and careers visuals are original brand illustrations drawn as code in
`src/components/art/scenes.tsx` (navy background, brand orange/blue lines). `npm run art`, which
runs automatically before `dev` and `build`, turns them into static files in `public/art/`.
Pages load them as normal images, which keeps the pages fast.

- **Use one:** set `art: "ran"` (or any name from `scenes`) on an offering, feature or post.
- **Add one:** add a new scene function to `scenes.tsx` and register it in the `scenes` map.

The home hero dashboard (`src/components/art/hero-dashboard.tsx`) is a static drawing with a thin
HTML animation layer on top: data packets, a pulse on the alert node and the "AI RCA" notification.
That layer animates only `transform` and `opacity`, which the GPU handles. Avoid adding animations
inside the SVG scenes, because the browser then redraws the whole image on the main thread every
frame.

TypeScript checks every content entry, so `npm run build` fails if a required field is missing.

## Hero globe

By default the home hero shows an original animated earth (`src/components/motion/hero-globe.tsx`).
It is drawn on a canvas with dotted continents and glowing network arcs between DATAYOG's markets.
The hubs and routes are set in `HUBS` and `ROUTES` at the top of that file. The continent outline is a
~3 KB land bitmap (`src/components/motion/land-mask.ts`) built from Natural Earth 1:110m land data (public domain).

## Hero video

The home hero can show a background video, with the headline on the left and the video (the earth)
on the right. When the files are missing, the hero shows the original animated globe instead. The check
runs at build time.

1. Download the **licensed** clip in HD (1920×1080). The Shutterstock preview has a watermark and
   must not be used.
2. Convert it into a short, small loop (needs [ffmpeg](https://ffmpeg.org); `winget install ffmpeg`):

   ```bash
   # 1280px wide, no audio, ~12 s loop
   ffmpeg -i clip.mov -t 12 -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 public/video/hero-earth.webm
   ffmpeg -i clip.mov -t 12 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/video/hero-earth.mp4
   ffmpeg -i clip.mov -frames:v 1 -vf "scale=1280:-2" -q:v 70 public/video/hero-earth-poster.webp
   ```

   Aim for about 2–4 MB per file. The poster is shown while the video loads, and stays visible for
   people who prefer reduced motion or have Data Saver on.
3. Run `npm run build`. If the earth is not where it should be, adjust `object-[75%_50%]` on the
   `<HeroVideo>` in `src/app/page.tsx`. The first value moves it left or right.

File names and order are set in `src/content/hero.ts`. The video plays only while it is on screen.

## Contact forms

The "Book a consultation", "Meet our experts" and "Request a call-back" buttons all open one
shared popup. The Contact page has the full enquiry form.

The website does not send any email itself. When a form is valid, it opens the visitor's own email
app (Outlook, Gmail, Apple Mail…) with a `mailto:` link that already contains the subject and the
details. The visitor then presses **Send**. If no email app opens, the page shows the address with
"Open email app" and "Copy email address" buttons.

- **Recipient:** `site.emails.info` in `src/content/site.ts` (currently info@datayog.com).
- **Subject and body format:** `mailtoFor()` in `src/lib/forms.ts`.
- No server code, API keys or `.env` file are needed.

## Old URLs

The old WordPress URLs (`/agency/`, `/meet-our-team/`, `/our_services/...` and others) redirect
permanently (301) to the new pages. The list is in `public/_redirects`, which Cloudflare Pages
applies. Avoid generic placeholder rules such as `/:a/:b/:c/:d`: they also match the site's own
`/_next/static/...` files and break the site.

## Deploy

The site is hosted on **Cloudflare Pages** (free plan). Unknown URLs get the site's 404 page with a
real 404 status automatically.

**Option A: deploy from this computer**

```bash
npx wrangler login     # once: opens the browser to sign in to Cloudflare
npm run deploy         # builds and uploads out/ to the "datayog" Pages project
```

The first deploy creates the project. Every later `npm run deploy` publishes a new version.

**Option B: automatic deploys from GitHub** (after the code is on GitHub)

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git, then:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |

The Node version comes from `.nvmrc`. After that, every push to `main` goes live, and pull requests
get their own preview URL.

**Custom domain:** Pages project → Custom domains → add `datayog.com` (and `www.datayog.com`).
Because the domain's DNS is already on Cloudflare, the records are created automatically. Existing
email (MX) records are not touched.

**Why a postbuild step?** The App Router prefetches linked pages as small segment files and asks for
them by dot-joined names, while the static export writes them in nested folders.
`scripts/flatten-prefetch.mjs` copies each one to the name the browser requests, so link
prefetching works on a static host.
