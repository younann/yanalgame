# يلا نحكي — Toddler Animal Video Explorer

A distraction-free animal video player for ~2-year-olds: a text-free 2-column photo grid →
tap an animal → a real-animal YouTube video, a big "فيديو تاني" button (never the same video
twice in a row), the animal's real sound, and a co-play tip for the parent.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Devices & install

- **Layouts:** phone portrait (2 columns), tablet portrait (2 big columns), and any landscape
  screen — iPad, desktop, phone sideways — (4 columns, video beside the controls). The home
  grid is sized so all 8 animals fit without scrolling. `Esc` returns to the grid on desktop.
- **Install (PWA):** iPad/iPhone Safari → Share → *Add to Home Screen*; Chrome/Edge (Android,
  desktop) → *Install app*. Opens full-screen with no browser bars.
- **Offline:** the grid, photos and animal sounds work offline; videos need internet (a friendly
  message shows, and the player reconnects automatically).
- Icons are generated from `public/logo.svg`: `npx pwa-assets-generator --override`.

## Editing the content

Everything lives in `src/data/animals.ts`. To add a video, append its YouTube ID to the
animal's `videos` list. Before adding one, check it exists and allows embedding:

```bash
curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json"
```

(A JSON title means OK; `Unauthorized`/`Not Found` means it can't be used.)

## Deploying

Netlify is configured in `netlify.toml` (build command, `dist/` publish dir, SPA redirect so
`/video/cow` works on refresh, and cache headers). Connect the repo in Netlify, or deploy from
the CLI:

```bash
npx netlify-cli deploy --build          # draft URL to check first
npx netlify-cli deploy --build --prod   # go live
```

Media credits: see `CREDITS.md`.
