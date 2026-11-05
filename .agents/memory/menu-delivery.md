---
name: Menu delivery constraints
description: Why menu visibility must be independent of JavaScript and hosting comparisons must stay controlled.
---

Keep the useful menu and native phone/order links available without JavaScript. Generate initial menu HTML from the same React content as the interactive page, not a separately maintained menu or price list.

**Why:** Slow-phone measurements exposed a blank-content delay from JavaScript and lazy route loading. A second hand-written menu risks price/copy drift, and publishing targets include both a static host and an Express host.

**How to apply:** Preserve build-time rendering and hydration for direct menu visits when changing routing, providers, or build commands; check both publishing build paths. Test scripting-disabled output as well as hydrated output.

Compare speed only between matching production builds with the same compression and throttling. Keep observations from the public custom domain separate when it serves older code.

**Why:** The initial audit's local sample lacked compression, while the custom domain served different content and a hero-image LCP that did not represent useful approved-menu readiness.

**How to apply:** Repeat several cold-cache public samples and verify the actual heading/actions and content encoding. Record FCP/LCP and visible menu/action readiness separately from load events; don't claim local improvements are live before publication.
