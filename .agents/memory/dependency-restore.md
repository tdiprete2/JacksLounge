---
name: Dependency restore policy
description: Why security-driven transitive dependency overrides must survive lockfile maintenance.
---

Preserve security-driven dependency overrides unless replacement versions also pass a clean install through the configured package firewall.

**Why:** A clean post-merge restore exposed blocked vulnerable transitive versions in an otherwise working existing installation. Updating only the first blocked package exposed another; the old node_modules tree had hidden the lockfile problem.

**How to apply:** When refreshing the lockfile or removing overrides, validate a clean dependency restore plus the application checks. Use permitted patched versions; do not bypass the firewall or change registry to obtain blocked packages. This is especially important before configuring automatic clean-install hooks.
