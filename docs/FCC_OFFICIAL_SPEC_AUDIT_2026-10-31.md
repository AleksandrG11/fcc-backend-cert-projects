# Official freeCodeCamp Back-End Development and APIs project compatibility audit

Official source: freeCodeCamp/back-end-development-and-apis, curriculum/locales/english, read 2026-10-31.
These are educational project implementations and **not** a freeCodeCamp-issued certification or an exam pass.

## Confirmed alignment
- Prime checker: index.js now **declares** function isPrime and exports a named CommonJS property as the issuer's AST test expects, while delegating computation to the existing tested shared core. npm metadata and prime/composite behavior tested.
- Timestamp: default standalone port corrected to **8000**, as required by issuer's official scaffold. Existing PORT environment override retained. Added official sample dates 2016-12-25 and 05 October 2011 to HTTP tests.
- Profile: official static paths and response bodies already match local source.
- Chat: http.createServer, WebSocketServer, join/chat/leave broadcasts and default port 3001 are implemented.

## Open incompatibility and security decision
- The issuer's family-watchlist spec explicitly allows **any authenticated role to GET any user's watchlist**, whereas the current hardened portfolio code intentionally forbids children from reading siblings' lists (HTTP 403). This is a deliberate **test mismatch**, not an achieved issuer pass. Do not weaken the production-oriented portfolio authorization without a separate educational-only adaptation.
- The official platform uses its own project scaffold and embedded grading. Local GitHub tests, however extensive, **do not submit/complete** those projects on freeCodeCamp.
- The required certification exam is an independent platform step and must be taken by the learner under the issuer's exam integrity rules, not by an AI proxy.

## Verification gate
Run npm ci --ignore-scripts --no-audit --no-fund and npm test in each of five project folders, plus public GitHub Actions CI. Local tests are evidence of technical work only.
