# Back-End Development and APIs — freeCodeCamp Projects

Five working project implementations built toward the freeCodeCamp **Back-End Development and APIs Certification**. These are **source-code submissions, not yet an issued certificate**.

| Project | Implementation |
|---|---|
| [Prime Number Checker Module](./build-a-prime-number-checker-module) | CommonJS package; primality-check algorithm and edge-case validation. |
| [Personal Profile App](./build-a-personal-profile-app) | REST endpoints and JSON payload through Express. |
| [Timestamp Microservice](./build-a-timestamp-microservice) | UTC and Unix timestamps; malformed-date handling. |
| [Chat App](./build-a-chat-app) | WebSocket broadcasting; join/leave and message tests. |
| [Family Movie Watchlist API](./build-a-family-movie-watchlist-api) | Express, authentication with signed JWT, password-hash validation, role-based read/write authorization and CRUD. |

## Local verification

Each directory contains a `package.json` and Node tests. Run `npm install && npm test` inside each directory. GitHub Actions runs the same tests across all five projects.

## Security / status

- No account keys, authentication tokens, or `.env` secrets should be committed.
- The movie API uses test-fixture users with hashed passwords; JWT signing requires `JWT_SECRET`.
- All projects were individually tested locally; platform project completion and final certification exam remain separately verifiable by freeCodeCamp.

## Credential

Issuer: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/). **Pending**: five project submissions and the certification exam must be accepted by the issuer before a credential can be claimed.
