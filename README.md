# Five Node.js Back-End Projects

[![Certification projects CI](https://github.com/AleksandrG11/fcc-backend-cert-projects/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/AleksandrG11/fcc-backend-cert-projects/actions/workflows/test.yml)

**A working, independently tested back-end development portfolio.** These five projects were built as practice toward freeCodeCamp's Back-End Development and APIs curriculum. All five projects have reproducible npm installs and automated tests running on GitHub Actions.

**Credential status:** These are public source-code projects, **not an issued freeCodeCamp certification**. The provider has not accepted the five projects or awarded a final certificate on this basis.

## Projects and source

| Project | What it demonstrates | Entry point |
|---|---|---|
| [Family Movie Watchlist API](./build-a-family-movie-watchlist-api) | Express REST API, JWT authentication, bcrypt password checks, role-based access control, persistent local JSON fixture, CRUD | `index.js` |
| [WebSocket Chat](./build-a-chat-app) | Node HTTP server, WebSocket lifecycle and broadcast, invalid-JSON handling | `server.js` |
| [Personal Profile API](./build-a-personal-profile-app) | Express REST endpoints and JSON responses | `index.js` |
| [Timestamp Microservice](./build-a-timestamp-microservice) | UTC/Unix date conversion and invalid-date behavior | `index.js` |
| [Prime Number Checker](./build-a-prime-number-checker-module) | CommonJS module, integer validation, efficient prime detection and edge cases | `index.js` |

### Family Movie Watchlist API

- **Authentication:** `POST /api/auth/login` checks credentials against hashed-password fixtures and issues a JWT if `JWT_SECRET` is set.
- **Read:** `GET /api/watchlist/:userId` verifies ownership/permissions before returning items.
- **Create:** `POST /api/watchlist/:userId/movies`.
- **Update:** `PUT /api/watchlist/:userId/movies/:movieId`.
- **Delete:** `DELETE /api/watchlist/:userId/movies/:movieId`.
- **Security boundaries:** a request-body size limit, Helmet headers, input validation, 1-hour JWT expiry, and read/write authorization middleware.

The sample data in `data/` contains *fictional users* and is intended for local tests and demonstrations. It is **not a production user database**; a real deployment would need durable transactional persistence, rate limiting, HTTPS, secret management, operational monitoring and additional security hardening.

### WebSocket chat

A minimal HTTP page plus WebSocket server that broadcasts join/leave and message events. The test covers two real WebSocket clients and HTTP behavior. This is a demo, **not a production messaging service**: it does not implement user identity verification, abuse protection, secure sessions or persistent chat history.

## Reproduce the tests

Requires **Node.js 24 and npm**. From the repository root:

```sh
for project in build-a-prime-number-checker-module \
               build-a-personal-profile-app \
               build-a-timestamp-microservice \
               build-a-chat-app \
               build-a-family-movie-watchlist-api; do
  (cd "$project" && npm ci --ignore-scripts --no-audit --no-fund && npm test) || exit 1
done
```

All five projects have committed `package-lock.json` files; CI runs the same commands on clean Ubuntu runners. The publicly visible [GitHub Actions history](https://github.com/AleksandrG11/fcc-backend-cert-projects/actions/workflows/test.yml) is independent evidence, not just a locally reported result.

## Verification history

- **2026-10-30:** GitHub Actions [successful run 41138464928](https://github.com/AleksandrG11/fcc-backend-cert-projects/actions/runs/41138464928) — all five matrix jobs successful.
- Initial remote run caught a machine-local symlink dependency and missing lockfiles. The defects were corrected; subsequent clean installs and CI passed.

## Next steps

Complete freeCodeCamp's actual curriculum requirements, submit the work using the official platform workflow, and pass any required assessment **without claiming certification prematurely**.

**License:** Each project retains its own dependencies and metadata; sample code is provided for educational demonstration. No commercial client delivery is asserted.
