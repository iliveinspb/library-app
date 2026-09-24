# AGENTS.md

## What this is

Small server-rendered study project (Netology course): Express 5 + EJS "library" app.
UI text, code comments, and `readme.md` are in Russian — keep new user-facing strings and comments consistent.

## Commands

- First setup: `npm install`
- Dev (nodemon): `npm run dev`
- Prod: `npm start`
- There is **no** test, lint, or typecheck setup. `npm test` intentionally exits 1 — do not treat it as a real test command.

## Layout

- All app code lives under `project/`. Root `package.json` is the only manifest; its `main` field (`server/index.js`) is stale — the real entrypoint is `project/server/index.js`.
- Not a monorepo. `project/client/index.html` is an empty, unused placeholder; the app is fully server-rendered from `project/server/views/`.

## Architecture facts that are easy to get wrong

- **Data is in-memory only.** `project/server/storage.js` exports a plain object mutated by the routes. Every change is lost on restart; there is no database or persistence layer.
- Two route surfaces:
  - JSON API under `/api/books` (CRUD + `POST /:id/upload` / `GET /:id/download`) — defined in `project/server/routes/books.js`.
  - Server-rendered pages (`/`, `/books/:id`, `/create`, `/update/:id`, plus a stub `POST /api/user/login`) — defined inline in `project/server/index.js`.
- **EJS layout convention:** every view must start with `<%- include('./port/layout-start') %>` and end with `<%- include('./port/layout-end') %>` (`project/server/views/port/`). New pages that skip this will miss the Bootstrap CSS/`<title>`.
- File uploads use multer with the form field name **`book-file`**, saved to `project/server/public/pdf/`. There is no `express.static` middleware — uploaded files are only reachable via the `/api/books/:id/download` route, so don't add `<img>`/`<a>` links expecting `/pdf/...` to be served directly.
- Book IDs are UUIDv4, generated in `project/server/models/book.js` (CommonJS class). Routes match IDs by strict string equality.
- Request logger middleware must stay first (see comment in `index.js`); it appends to `project/server/server.log` (tracked in git — expect diff noise there).
- 404 handler must be registered before the error handler in `project/server/index.js`.

## TypeScript status

Migration has started but is **not wired up**:

- `project/server/models/book.ts` and `books-repository.ts` exist but are never imported; runtime code is plain CommonJS JS.
- `project/tsconfig.json` exists (`strict: true` but `strictNullChecks: false`, no `rootDir`/`outDir`); `typescript` is a devDependency with no build/check script yet.
- Runtime uses `Book` from `book.js`, not the `book.ts` interface — if you touch book fields, keep both in sync until the migration finishes.

## Git

- No CI workflows, no pre-commit hooks.
- Untracked/committed artifacts to leave alone: `.idea/`, `project.zip`, `.DS_Store`.
