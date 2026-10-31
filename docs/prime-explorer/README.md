# Prime Explorer — own application for Full Stack Open Part 11 exercise 11.20

A genuine static browser app adapted from the author's own Node.js prime-checker module. The same prime-core.js implementation is used by both Node unit tests and browser UI. The CI/CD workflow runs unit tests, builds the static site, executes Chromium end-to-end checks, and (on successful main push only) deploys to GitHub Pages. Pull requests test without deployment.

This is **coursework and an open-source portfolio app**, not an issued freeCodeCamp or University of Helsinki certificate. Provider submission and reviewer acceptance remain separate requirements. The site has no backend and is not presented as a dynamic API deployment.

Local verification from repository root:
1. cd build-a-prime-number-checker-module && npm ci && npm test
2. node scripts/build-prime-pages.cjs
3. node scripts/smoke-prime-pages.cjs

No API tokens or external service credentials are required.
