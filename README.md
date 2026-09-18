# AGS — Africa Geophysical Services

A concept redesign of **ag-services.org**, built as a Next.js App Router site with eleven WebGL scenes,
generated video, a scroll-driven programme timeline and CSS 3D layering. Nine routes, a white-and-green identity, and
AGS's own field photography.

Every fact and every line of copy comes from the current ag-services.org. Nothing is invented; the two
places that show modelled rather than measured data are labelled "illustrative model" on the page.

## Run it

```bash
npm install
npm run dev              # http://localhost:3000
```

A single-file version of the whole site — no bundler, no install — is at `public/preview.html`:

```bash
npm run preview:static   # then open http://localhost:3000/preview.html
```

That file is what to send a client or drop on any static host while the Next.js app is in review. It
carries the same eight pages behind a hash router (`#/about`, `#/services`, …).

## Routes

| Route | What it carries |
|---|---|
| `/` | Video hero with a live wavefield overlay, positioning, stats, capability cards, the scroll-driven survey build, the globe, closing CTA |
| `/about` | History, position, the rotating core column, six commitments, leadership, IMC GSL |
| `/services` | Six services, the ray-path scene, and the synthetic-trace resolution lab |
| `/technology` | Recording systems, source, drilling, processing and survey equipment, beside the migrated-volume scene |
| `/projects` | Three programme types, the seven-phase programme timeline with per-phase footage, and the mixed video/photo media library |
| `/operations` | The scroll-scrubbed terrain sequence, the morphing terrain model, and the field gallery |
| `/qhse` | Zero-harm targets, the assembling-zero scene, the four leadership practices, the policy framework |
| `/careers` | How AGS recruits, the career-route network, and the roles it recruits into |
| `/contact` | The RTK-fix scene, enquiry form and every office |
## The motion system

Everything below lives in `lib/scenes.js`, is vanilla three.js or canvas 2D, and no-ops when its
element is not on the mounted route.

**Eleven WebGL scenes, one per page and one per idea.**

| Scene | Page | What it shows |
|---|---|---|
| Hero wavefield | `/` | A Ricker wavelet propagating through seven strata, additively over the convoy footage. Bright green is a peak, warm ochre a trough — the amplitude convention of a seismic section. |
| Survey build | `/` | Scroll-driven. Receiver lines lay in, source lines cross them, a source ring pulses, midpoints accumulate into a fold map. The five captions advance with the geometry. |
| Globe | `/` | The eight AGS locations at their real coordinates on a dark sphere, linked to Muscat by great-circle routes carrying a travelling pulse. |
| Core column | `/about` | Eleven stacked layers with a horizon scanning up and down, lighting each in turn. |
| Ray paths | `/services` | Source to reflector to receiver, a pulse running each path, and the common-midpoint fan on the reflector. |
| Synthetic trace | `/services` | Canvas 2D. A zero-phase Ricker wavelet convolved with a layered reflectivity model, drawn as a variable-area wiggle; the frequency slider demonstrates tuning thickness (500/f ms) correctly. |
| Migrated volume | `/technology` | A volume with an anticline cut by a normal fault, an inline slice sweeping through. Drag to rotate. |
| Fold build | `/projects` | Bound to the timeline: the volume assembles as the programme reaches phase 07. |
| Terrain morph | `/operations` | One surface blending between dune field, forested ridge, cultivated flat and shoreline, with a survey line draped over it. |
| Assembling zero | `/qhse` | 4,200 particles gathering into a zero, holding, dispersing. |
| Career routes | `/careers` | The seven roles in a crew and the ten routes between them, with pulses running the links. |
| RTK fix | `/contact` | A station on a survey grid acquiring a fix, rings expanding, satellites overhead. |

**Video.** Eleven WebM loops, generated with ffmpeg from AGS's own field photography — slow push-ins
and pans, 25fps, VP9, 90KB to 570KB each, with a poster frame for every one. Five are background
loops (hero, CTA bands, page heads); six are the per-phase clips on the programme timeline. Every
video is muted, looping, `playsInline`, paused when off-screen or on a hidden route, and stopped
entirely under `prefers-reduced-motion`.

**Scroll-scrubbed sequence** (`/operations`): six photographs cross-faded and scaled by scroll
position in a pinned frame, with the caption, terrain ticks and progress rail moving in step. It
behaves like a scrubbed video without shipping one.

**Programme timeline** (`/projects`): seven phases pinned over 620vh. The focused phase opens its
description, its marker fills, the progress rail advances and its clip crossfades in and plays;
everything else recedes. Phase 07 hands over to the fold-build WebGL scene.

**Scroll-focus reveal.** In any `.rows` list or the QHSE principles, the item nearest 46% of the
viewport reads at full opacity while its neighbours dim, blur and shrink with distance. The effect is
driven per frame from `updateFocus()`.

**Reveal-on-scroll motion.** `primeMotion()` tags eligible elements with `data-motion` (`up`, `scale`,
`mask`, `left`), leaves anything already on the first screen at rest, and reveals the rest through an
`IntersectionObserver` with a 70ms stagger and a `cubic-bezier(.16,1,.3,1)` spring curve. A per-frame
sweep catches anything the observer misses, so nothing is ever left parked invisible.

**3D layering.** `.deck` sets a CSS `perspective`; `.plate` children get a scroll-driven `translateZ`
and `rotateX`. Add `plate` to any block inside a `deck` to opt in.

All of it collapses under `prefers-reduced-motion`: pinned sections unpin, videos pause, scenes render
a static frame and the render loop stops.

## Framer Motion

The app build uses Framer Motion for everything that enters, exits or responds
to a pointer. The scroll-driven pieces — the hero slider, the programme
timeline, the terrain scrub, the survey build, the focus rail and the eleven
WebGL scenes — stay in `lib/scenes.js`, because they are per-frame readouts of
scroll position rather than enter/exit animations, and `requestAnimationFrame`
is the right tool for them. `lib/scenes.js` sets `window.__agsReactMotion`, which
stands its own CSS reveal engine down so the two never animate the same element.

`components/motion/`

| Component | Does |
|---|---|
| `Reveal` | Reveals a block on scroll-in. Renders **as** the element (`as="article"`) rather than wrapping it, so the DOM and the CSS grid/flex structure are untouched. |
| `Stagger` / `StaggerItem` | A grid whose children arrive in sequence. The container holds the timing; each item inherits it. |
| `PageTransition` | Cross-fades routes, keyed on `usePathname()`. |
| `ScrollProgress` | Spring-damped page-progress bar via `useScroll` + `useSpring`. |
| `Magnetic` | Pulls the primary CTA slightly toward the cursor. |
| `motion-tokens.ts` | One easing curve and one set of distances, shared by all of the above. |

Three things are deliberate and worth keeping if you refactor:

1. **`PageTransition` animates opacity only.** The hero, timeline, terrain and
   survey sections are `position: sticky`; a transform on an ancestor creates a
   containing block and breaks them. Opacity creates a stacking context, which
   sticky tolerates.
2. **`.plate` blocks are never `Stagger` containers.** `.plate` carries a
   scroll-driven CSS transform for the 3D layering, and a motion transform on
   the same element would overwrite it. Their children reveal on staggered
   delays instead.
3. **Hover lifts are a `lift` prop, not CSS.** Framer Motion writes an inline
   transform, which beats a CSS `:hover` rule, so the lift has to live on the
   motion component.

Every component checks `useReducedMotion()` and renders the plain element when
the OS asks for reduced motion — content is never left behind an animation that
will not run. Verified in a headless browser at both settings.

The markup in `components/pages/` is generated, and the motion components are
applied by the generator, so regenerating will not lose them.

## Structure

```
app/
  layout.tsx            top bar, nav, footer, scene boot
  globals.css           design tokens + all layout (no Tailwind)
  page.tsx              /
  about|services|technology|operations|qhse|careers|contact/page.tsx
components/
  Nav, TopBar, Footer, Mark, Scenes
  pages/                one component per route's content
lib/scenes.js           every scene, the motion engine, the focus rail, the timeline
public/assets/          AGS field photography + the generated WebM loops and posters
public/preview.html     single-file build of the whole site (hash routes)
docs/                   competitive teardown
```

## Design tokens

Defined once on `:root` in `app/globals.css`. The design commits to one light treatment on purpose —
every colour is painted explicitly rather than inherited, so the page holds on any host background.

| Token | Value | Role |
|---|---|---|
| `--white` / `--paper` | `#FFFFFF` / `#F5F8F5` | Page grounds; the paper carries a slight green bias |
| `--ink` / `--muted` | `#0B1A13` / `#5D7167` | Text |
| `--green` | `#0F7A4A` | The primary accent — links, rules, CTAs |
| `--green-deep` | `#083D27` | Photographic scrims, footer, the globe |
| `--green-bright` | `#2FC47C` | Highlights and WebGL peaks |
| `--sun` | `#D8A22A` | Source points and the HQ marker only |
| `--line` | `#DCE6DF` | Borders and grids |

Type: **Archivo** (display, 800/900), **IBM Plex Sans** (body, 300), **IBM Plex Mono** (data, labels,
eyebrows). Plex was drawn for technical work; it belongs on a geophysics site in a way a default UI
sans does not.

## Photography

`public/assets/` holds fifteen photographs taken from the AGS gallery — vibroseis convoys, shot-hole
drilling, dense-forest and populated-area operations, recording units, support vehicles and shallow
water operations. They were recompressed for the web, so **replace them with the full-resolution
originals before launch**; AGS holds those. `Vibe-*`, `SWO-*`, `Drill-*` and `Support-*` on the current
site are the same source set.

## Before this goes live

1. **Wire the enquiry form.** Add `app/api/enquiry/route.ts` and post to it, or point it at a provider.
   Validation already runs client-side in `lib/scenes.js`; it validates and stops.
2. **Swap in original photography** and switch `<img>` to `next/image` (drop `images.unoptimized`).
3. **Use `next/link` inside the page components.** The generated markup uses plain `<a href="/…">`,
   which works but does a full navigation. The chrome (nav, footer) already uses `Link`.
4. **News.** The current site has a News section this concept does not carry; add a route or link out.
4b. **Real project records.** `/projects` describes how an AGS programme runs, phase by phase — it
   carries no client names, block names, dates, line kilometres or channel counts, because those were
   not ours to invent. Send the real records and they drop straight into that timeline, one object per
   phase in `components/pages/Projects.tsx`.
4c. **Scene cleanup.** Each route mounts its own renderers, guarded so a repeat visit does not mount
   twice. Dispose them on unmount (`renderer.dispose()`) if you add many more scenes.
5. **Accessibility.** Focus states are defined and the scroll-pinned sections collapse under
   `prefers-reduced-motion`. Run a contrast check on `--muted-2` if you promote it to body size.
6. **Performance.** Four WebGL contexts, each paused off-screen by `IntersectionObserver`, DPR capped
   at 1.75. Test on a mid-range Android before adding a fifth.
7. **Legal.** Team email addresses are reproduced from the live site; confirm those people are happy
   to keep them public.

## If the scenes don't appear

1. `npm install` — `three` is a dependency; if it was added after your last install, nothing mounts.
2. Open the console. Every scene is wrapped in a try/catch so one failure can't take the page
   down, which also means a real error shows up there rather than on screen.
3. The scene list, the render loop and the resize handlers live on `window` and survive client-side
   navigation; the per-route bookkeeping does not, so each route mounts its own canvases and
   detached ones are pruned from the loop. If you refactor `components/Scenes.tsx`, keep it calling
   `refreshScenes()` on every `usePathname()` change.
4. WebGL is required for the eleven 3D scenes only. The synthetic trace is canvas 2D, and the rest of
   the site renders normally without WebGL — the canvases just stay empty.

## Browser support

WebGL1, no extensions. If WebGL is unavailable the whole site still renders — the canvases stay empty
and nothing else changes.
