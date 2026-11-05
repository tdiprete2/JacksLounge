# Menu visible-readiness measurements

Measured November 5, 2026 (UTC). No publishing, DNS changes, orders, or form submissions.

## What changed

- The production build emits the **real menu component tree in the initial HTML**, including all 52 menu items and their existing prices, header, call/order links, and footer. React hydrates that tree rather than clearing it to show a spinner.
- The menu is no longer a lazy route download. Contact/admin query and toast dependencies load only with those pages; their existing provider behavior is retained.
- Mobile-only spacing is reduced so the first appetizer and its price are visible in the first viewport. Desktop spacing, all menu wording, prices, reviews, and direct external SpotOn links are unchanged.
- Both the standard build and the GitHub Pages workflow use the same frontend/prerender build. The build-time server bundle stays outside the public directory.
- Vite development still uses client rendering. Production-build measurements, not development timings, assess this optimization.

## Method and limits

Chromium 152, fresh tab and cleared/disabled browser cache per sample, service workers bypassed. Mobile: 390 × 844, 4× CPU slowdown, 200,000 bytes/second download (nominal 1.6 Mbps), 93,750 bytes/second upload, 150ms configured latency, reduced motion. Each sample observes 16 seconds.

Three cold-browser-cache measurements were repeated on the **intended public custom domain**, `https://www.jackspizzahyannis.com/menu/`, before making any comparison. The document, first-party JavaScript and CSS responses reported **gzip**. That host still serves the older site: its menu H1 differs from the approved H1, a homepage hero image becomes LCP, and the new sticky phone/order actions are absent. Its numbers therefore do **not** describe readiness of the approved menu. CDN, DNS and TLS caches were not deliberately flushed.

Since this fork must not publish, the actual code-change comparison uses **the previous workspace production build and updated production build served locally with the identical gzip server**. This isolates code changes under the same throttling/compression, but is not a promise of public-host or real-phone performance. No before/after percentage is inferred by comparing different hosts or the earlier uncompressed audit.

“Actions visible” requires the actual mobile phone and order anchors to have visible viewport rectangles. “Menu visible” requires the H1, first item name, and first price to be visible. Checks sample animation frames, bounded no earlier than FCP; they are lab approximations, not a new standardized browser metric. Load-event timing is recorded separately and is **not** used as proof of readiness.

## Repeated samples

All times in seconds. Readiness columns are bounded by FCP, including for the initial runs collected before that reporting bound was added to the runner.

| Build/host | Run | FCP | LCP | Call/order visible | First item/price visible | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Current public custom domain (older site) | 1 | 0.784 | 1.428 | absent | not comparable | 0 |
| Current public custom domain (older site) | 2 | 0.724 | 1.424 | absent | not comparable | 0 |
| Current public custom domain (older site) | 3 | 0.820 | 1.468 | absent | not comparable | 0 |
| Previous workspace build, local gzip | 1 | 2.416 | 2.416 | 2.416 | 2.416 | 0 |
| Previous workspace build, local gzip | 2 | 2.764 | 2.764 | 2.764 | 2.764 | 0 |
| Previous workspace build, local gzip | 3 | 2.328 | 2.328 | 2.328 | 2.328 | 0 |
| Updated workspace build, local gzip | 1 | 0.872 | 0.872 | 0.872 | 0.872 | 0 |
| Updated workspace build, local gzip | 2 | 0.852 | 0.852 | 0.852 | 0.852 | 0 |
| Updated workspace build, local gzip | 3 | 0.944 | 0.944 | 0.944 | 0.944 | 0 |

Local gzip medians: visible readiness **2.416s → 0.872s**, about **64% sooner** in this controlled lab only. Updated load events were 2.688s, 2.579s, and 2.847s: useful content appeared well before load completion.

The initial entry bundle shrank from 289.22 KB / 94.32 KB gzip to 264.94 KB / 84.45 KB gzip, despite including the menu. Previously the menu also needed a 13.57 KB / 4.50 KB gzip route chunk and a 37.58 KB / 11.93 KB gzip shared Header/Footer chunk plus small utility chunks. Updated visits need no follow-on menu route chunk. CSS remains about 82.85 KB / 13.66 KB gzip; build-time HTML, rather than a stylesheet rewrite or hidden loading placeholder, removes JavaScript execution from content visibility's critical path.

## Verification

- `npm run check`, all 13 existing automated tests, the full production build, and `npm run test:menu-build` passed.
- The generated-HTML check verifies one exact menu H1, one main landmark, skip-link target, nine categories, all 52 source item/price pairs, direct native phone/SpotOn links, valid JSON-LD, no duplicate fallback H1, and no homepage hero.
- Three updated 390px samples had no uncaught exceptions, HTTP error responses, horizontal overflow, or layout shifts.
- A separate 320px hydrated sample also showed all 52 items, one main landmark, a skip link with a valid target, no unnamed links/buttons, no overflow, no console/hydration errors, and 48px-tall call/order actions. Its FCP/LCP and first-item readiness were 1.208s.
- With **all scripting disabled** at 320px, all 52 items and native phone/order links remained present, with one exact H1/main landmark, no unnamed links/buttons and no overflow. FCP was 1.008s. LCP/CLS observers cannot run with scripting disabled, so zero values from that run are not reported as measurements.
- Visual checks at 390px and 320px confirmed the heading, actions and first appetizer/price appear above the fold. `screenshots/menu-performance-mobile.jpg` preserves the 390px evidence.
- Existing keyboard-focus styling, native links and Radix dialog labeling are retained. These checks are not a full assistive-technology audit; no orders, admin sign-in or contact submissions were exercised.

## Reproduce

```sh
npm run build
npm run test:menu-build
chromium --headless --no-sandbox --disable-dev-shm-usage \
  --remote-debugging-port=9223 --user-data-dir=/tmp/menu-lab about:blank
# In another shell (lab server only, not the publishing server):
node scripts/serve-performance-build.cjs dist/public 8081
# In another shell:
AUDIT_RUNS=3 AUDIT_MOBILE_ONLY=1 AUDIT_PATHS=/menu/ \
  node scripts/measure-pages.cjs https://www.jackspizzahyannis.com http://127.0.0.1:8081
AUDIT_MOBILE_ONLY=1 AUDIT_WIDTH=320 AUDIT_PATHS=/menu/ AUDIT_NO_JS=1 \
  node scripts/measure-pages.cjs http://127.0.0.1:8081
```

After the separately planned public release, repeat three cold-cache samples on the custom domain, confirm gzip/brotli and the exact approved H1/actions, and report that host's results separately. Nothing in this report claims the unpublished optimization is already live.
