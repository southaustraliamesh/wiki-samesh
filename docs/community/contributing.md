---
title: Contributing
---

# Contributing

SA Mesh documentation should be practical, public-facing and conservative.

## Content guidelines

- Prefer general-user friendly wording while keeping useful technical detail.
- Mark untested assumptions clearly.
- Do not publish local patch-only commands as public guidance until upstream or community validation catches up.
- Preserve source notes when migrating content from Wiki.js or other references.

For corrections, contact @Talie5in on AU Discord.

## Pull request flow

The editable Docusaurus source lives in GitHub so community members can propose changes. Do not commit the generated `build/` directory.

- Open community pull requests against the `preview` branch.
- Pull requests do not run deployment actions automatically.
- After maintainer review and merge into `preview`, GitHub Actions builds the static wiki and deploys the Cloudflare Pages preview branch.
- Production updates happen only after a maintainer promotes the approved `preview` branch into `main`.
