# StockPulse — Full-Stack Audit Report

**Date:** 2026-10-06
**Scope:** `stock-pulse` (frontend, React 19 + Vite 6 + Supabase Auth) and `stock-pulse-backend` (NestJS 11 + Prisma 6 + PostgreSQL + Supabase)
**Method:** end-to-end static read of all source, DTOs, guards, schema, deploy configs; `tsc` + `vite build` verified on frontend.
**Verdict:** Polished UI shell on a fundamentally sound Nest backend. Ship-blockers are cross-cutting: inconsistent API error handling, frontend-only RBAC assumptions, app-level-only tenant isolation, committed legacy DB/secrets, and deploy secret handling.

---

## 1. Architecture map

```
stock-pulse (frontend)
  React 19 / TS / Vite 6 / Tailwind (CDN) / Recharts
  Supabase Auth (PKCE, persist, auto-refresh) -> access_token
  api.ts -> VITE_API_URL (default http://localhost:3000/api)
 Dead legacy in-repo: server.ts (Express+SQLite+JWT) + schema.sql + stockpulse.db*

stock-pulse-backend (real API)
  NestJS, global prefix /api, helmet, CORS allowlist, ValidationPipe strict
  SupabaseAuthGuard (server-side getUser + Profile upsert) + RolesGuard
  Resources: products / transactions / users / companies / stats
  Prisma -> Postgres (DATABASE_URL + DIRECT_URL), Supabase anon + admin clients
```

The frontend only speaks the Nest API. `server.ts`/`schema.sql`/`.db*` in the frontend repo are dead and the source of earlier confusion (PUT vs PATCH, stats-shape mismatches were vs dead code, not Nest).

---

## 2. Frontend findings (`stock-pulse`)

### 2.1 P0 — ship-blockers

| # | Issue | Location | Detail / Fix |
|---|-------|----------|--------------|
| F-1 | Silent API failures | `api.ts:66-87,137-184,213-218` | `products.create/update/delete`, `users.*`, `stats.getDashboard` don't check `!res.ok` — error JSON returned as success, `delete` treats 403/404 as success. Standardize on existing `readErrorMessage` + `throw` pattern used by `transactions/*`. |
| F-2 | RBAC frontend-only | `App.tsx:617-619,783-877` | Users page/nav hidden but `renderPage` has no guard — devtools state flip reaches admin pages. Cost hidden in UI but still sent in payloads. Backend enforces (good), but audit every hiding assumption. |
| F-3 | Auth-sync DoS + info leak | `App.tsx:540-598,742-770` | Any non-401 `/users/me` failure renders full-screen red page leaking `API_BASE` + backend body, no cached fallback. Add degraded retry mode, stop echoing internals. |
| F-4 | Legacy dead backend committed | `server.ts`, `schema.sql`, `stockpulse.db*` | Deps not in `package.json`, port 3000 collides with Nest, schema predates multi-tenancy. `git ls-files` shows `.db*` tracked. Move to `legacy/` or delete, untrack DBs, add `*.db*` to `.gitignore`. |

### 2.2 P1 — correctness

- **Reports (`components/Reports.tsx`, 649 lines, highest risk):** cost-basis leak to non-admins in summary; profit uses *current* `costPrice` not historical `unitCost`; `slice(0,5).sort()` selects arbitrary 5; divide-by-zero → `NaN%`; groups by `productName` not `productId`; hardcoded `+2.4%`, dead Refresh/Export-PDF buttons; `setInterval` never cleaned.
- **Validation gaps:** `ProductForm` — `"   "` passes `!name`, `parseFloat("")→NaN` passes (`NaN<0===false`), SKU dup unchecked on edit, required-marked `supplierName/reorderLevel` unvalidated, fire-and-forget `onSave` with no `try/catch`/loading. `StockOperations` — no `unitCost<0`/date checks, `parseInt` drops decimals, sends `unitPrice` for DAMAGED/EXPIRED, effect deps (`selectedProduct` object) overwrite user edits. `UserManagement` — `≥6 chars` unenforced, no trim/dup-email, admin can delete/deactivate self, form resets even on failure.
- **Avatar data loss (`Profile.tsx`):** deletes old avatar *before* new upload, ignores `remove()` errors; `accept="image/*"` + unsanitized ext in public bucket = SVG XSS risk; `extractStoragePath` only handles one public-URL shape → orphans.
- **Timezone:** `Dashboard`, `StockOperations`, legacy `server.ts:301` use `toISOString().split('T')[0]` (UTC) — off-by-one for UTC+x. Store UTC, display local.
- **Session duplication:** `SessionProvider.tsx` is clean, but `App.tsx:502-538` re-implements `getSession + onAuthStateChange` + parallel `hasSession` — double subscriptions, races. Consume `useSession()` only.
- **Duplicate AuthCallback:** root `AuthCallback.tsx` (naive) vs `src/AuthCallback.tsx` (proper with loading/cancel) — `App.tsx:735` uses the weaker one. Delete one.
- **Router fiction:** `react-router-dom@7` installed, `Changelog v1.4.0` claims "full React Router", but `LandingPage` uses local `subPage` state and `App.tsx` uses `window.location.pathname` — deep-link/back-button broken.

### 2.3 P2 — UX / perf / hygiene

- **Dashboard (246 lines):** refetches stats on every `products/transactions` identity change; dead 7/30-day `<select>`; `currentUser:any` no null-check; `O(30*N)` chart loop; no skeletons; `Live` badge static.
- **Inventory (307 lines):** dead Export button; multi-word fuzzy search never matches; renders all page buttons; `toFixed(2)` on nullable prices; actions `group-hover`-only (invisible on touch); `categories` unmemoized.
- **Layout (305 lines):** `useState(window.innerWidth)` crashes SSR/tests, no resize listener; `currentUser.name.charAt(0)` unguarded; no Esc-to-close, no collapsed-sidebar tooltips, no notification timestamps/dismiss.
- **Bundle 1.13 MB single chunk** (`recharts + motion + gsap`). Code-split `Reports/Dashboard/LandingPage`, drop `gsap` *or* `motion`, replace inline SVGs with lucide, prune unused imports.
- **~400-line duplication** `BlurText/BorderGlow/DotGrid/...` between `CompanyOnboarding.tsx` and `LandingPage.tsx` → extract `components/effects/`.
- **Dead login UI:** `magneticPull/isHovering/floatingObjects` never rendered; Remember-me inert; Forgot-password `href="#"`. `StockPulseLoader` heavy inline RAF — fine but unsplit.
- **Notifications:** low-stock dedupe by `id`, never cleared on restock — stale growth.
- **Config:** no `.env`/`.env.example`; `VITE_API_URL` falls back to localhost (prod calls localhost); `Status.tsx` hardcodes "Operational"; marketing claims (`12,000+ creators`) unverified; `vite.config.ts` loads env but never uses it; Tailwind via CDN (no PostCSS build).
- **Tests/docs:** only `test-landing.cjs` (no assertions, always exits 0, deprecated `waitForTimeout`). `README` omits env setup, Supabase config, backend link wiring. `lint` script is just `tsc` — no eslint/vitest.

### 2.4 Frontend strengths to keep

Graceful stats fallback (API fail → local calc + banner), `cancelled`-flag cleanup, dark-mode + responsive grids, CSV escaping + `revokeObjectURL`, Supabase PKCE/persist config, noop client avoiding crash when env missing, token header-only with no logging.

---

## 3. Backend findings (`stock-pulse-backend`)

### 3.1 P0 — ship-blockers

| # | Issue | Location | Detail / Fix |
|---|-------|----------|--------------|
| B-1 | Tenant isolation app-only | `prisma.service.ts`, all services | No RLS, no ALS/`SET app.company_id`, no Prisma `$extends` auto-scope. `SUPABASE_ADMIN` (service_role, bypasses RLS) exported `@Global()`. One missed `where:{companyId}` = cross-tenant leak. Add RLS or auto-scope + restrict admin client to audited repo. |
| B-2 | DB secret baked into image | `Dockerfile:17-18` | `ARG DATABASE_URL` → `ENV DATABASE_URL` bakes secret into layer. Make runtime-only. Also runs as `root`, no `HEALTHCHECK`, full `node_modules` with devDeps, `CMD start:prod` skips `prisma migrate deploy`. |
| B-3 | Dual identity graph | `prisma/schema.prisma:70-157` | Live `Profile` (Supabase id) vs dead `User`+`Role`+`StockOperation` (local auth). `Profile.role String` free-form vs `RoleType{ADMIN,USER}`. Unify: delete/isolate legacy, migrate `Profile.role` to enum. |
| B-4 | Global SKU uniqueness | `schema.prisma:44` | `sku @unique` global → second tenant reusing SKU gets `P2002` → 500 (no 409 path). Change to `@@unique([companyId, sku])` + migration. |
| B-5 | Auth opt-in per controller | `app.module.ts` | No `APP_GUARD`; each controller must add `@UseGuards(SupabaseAuthGuard, RolesGuard)` in correct order. One omission = public. Globalize both with `@Public()` for `GET /api/health`. `AuthGuardModule` not imported by `AppModule`, doesn't export `RolesGuard`. |

### 3.2 P1 — correctness

- **Per-request upsert (`supabase-auth.guard.ts:58-73`):** DB write on every authenticated request (latency/race/cost). Switch to `findUnique` + conditional write + cache. Also: unhandled email-collision `P2002`, overwrites admin-edited `name` from metadata each call, `slice(7)` without trim, hard Supabase RTT dependency with no timeout/breaker.
- **Roles fragile (`roles.guard.ts`, `roles.decorator.ts`):** exact case-sensitive match, no hierarchy (`ADMIN` blocked from `@Roles('user')`), order-dependent, stringly-typed (typo-prone), standalone use returns 403 not 401. Normalize, add hierarchy, type as union.
- **Strict-pipe contract (`main.ts:48-54`):** `forbidNonWhitelisted` 400s on extras (`id/companyId/createdAt`) or numeric strings for `IsNumber`. Frontend must send DTO-only payloads — mostly does, but `Partial<Product>`/`Partial<User>` can leak.
- **Under-validated fields:** `unitPrice/unitCost` lack `IsNumber/Min`; `date` is `IsString` not `IsDateString`; `from/to` via `new Date()` unchecked → `Invalid Date` → 500; `CreateCompanyDto.logoUrl` is `IsString` only (avatar DTO correctly uses `IsUrl`).
- **Saga gaps:** `companies.create` (company insert + profile promote) not in `$transaction` → orphan company. `users.remove` (DB delete → Supabase delete) orphans auth on second-step failure. No self-delete/last-admin guard. `getMe` promotes `userCount===0 ? admin : user`, inconsistent with guard default `'user'`.
- **Open semantics (confirm intent):** any active user can `POST /transactions` (stock-out not admin-gated); `reason` not required for `STOCK_OUT`; `unitPrice` not required for sales; `STOCK_IN` drops `reason/unitPrice`, `STOCK_OUT` drops `unitCost`, `STOCK_IN` overwrites `product.costPrice` — all reasonable but undocumented.
- **Stats semantics:** shape matches frontend `DashboardStats` exactly (good). But `lowStockItems` = `qty<reorder` (incl. 0) while product filter splits low vs critical → count mismatch; `todaySalesCount` sums quantities not tx rows; UTC day bucketing vs local UI day.

### 3.3 P2 — deploy / hygiene

- **Node mismatch:** nixpacks 22 vs railway provider 20 vs Dockerfile 22 — align to 22. `vercel.json` uses deprecated `builds/routes` serverless for stateful Nest+Prisma (cold starts, pool exhaustion) — choose Railway/Docker canonical or add serverless adapter + `maxDuration`/pooled DSN.
- **Missing prod wiring:** `@nestjs/throttler` installed but not wired (guard does network I/O per request — DoS amplifier); health is liveness-only (no `SELECT 1` readiness); no shutdown hooks; no global exception filter; no Prisma log config; CORS `methods/allowedHeaders/maxAge` implicit.
- **Schema defaults missing:** `Product.id / Transaction.id / StockOperation.id / InventoryHistory.id` no `@default(uuid())`; `updatedAt` fields required with no default — manual-set landmines. `Profile.companyId` nullable is correct (pre-onboarding) — ensure consistent 403 `Company setup required` (products/transactions/stats do).
- **Tests/lint:** only `app.controller.spec` + `test/app.e2e-spec.ts`, zero resource specs; eslint `no-explicit-any:off, no-floating-promises:warn` too lax for auth/tenant code. README retains Nest boilerplate badges, no env table.
- **`.gitignore`:** `.env*` correctly excluded; minor dupes, missing `.vercel/.railway/.turbo`.

### 3.4 Backend strengths to keep

Server-side `getUser(token)` validation, `helmet`, CORS allowlist, env fail-fast Supabase config, no prod auto-seed (kill-switch only), minimal unauthenticated `/api/health`, transactional stock-op (`find → check → increment → create` in `$transaction`), cross-tenant 404 masking (anti-enumeration), `Decimal→Number` conversion, compensating `deleteUser` on profile-create failure, `randomUUID()` company ids, name-trim + empty-reject + no-change-reject on company update.

### 3.5 Route / contract reference (verified)

- `GET /api/products`, `GET /api/products/:id` (any user) · `POST/PATCH/DELETE /api/products*` (`admin`) — `UpsertProductDto` requires `name,sku,category,costPrice,sellingPrice,quantity,reorderLevel,supplierName,unit,status`.
- `GET/POST /api/transactions` (any user) — `CreateTransactionDto{productId,type,quantity Min1,reason?,unitPrice?,unitCost?,customer?,supplier?,notes?,date?}`.
- `GET /users/me`, `PATCH/DELETE /users/me/avatar` (self) · `GET/POST/PATCH /users*, DELETE /users/:id` (`admin`) — `CreateUserDto{name,email,password Min6,role, status}`.
- `POST /companies`, `GET /companies/mine` (any) · `PATCH /companies/mine` (`admin`).
- `GET /api/stats` (any, requires `companyId`) → `{totalItems,lowStockItems,inventoryValueCost,inventoryValueRetail,todaySalesCount,todaySalesValue,chart[30]{date,label,sales,stockIn,stockOut}}`.
- Enums: `STOCK_IN/STOCK_OUT` exact both sides; reason mapped frontend `Theft/Loss ↔ Theft_Loss` etc. via `reasonToBackend/reasonFromBackend` — direct callers must use underscore form or get 400 `IsEnum`.
- Frontend `getAll` handles backend `{total,items}` via `data.items` — compatible.

---

## 4. Cross-cutting action plan

### Immediate (P0)
1. Backend: runtime-only `DATABASE_URL`, non-root user, `HEALTHCHECK`, migrate step; globalize guards; composite SKU unique; scope service_role.
2. Frontend: uniform `!res.ok` error handling; remove/deprecate legacy `server.ts`/`.db*` (untrack, gitignore); stop leaking `API_BASE` in error UI + add degraded retry.
3. Align Node 22 everywhere; decide Railway **or** Vercel.

### Next (P1)
4. Replace per-request upsert with read-then-write + cache; normalize roles + hierarchy; wrap company-create in `$transaction`; add self-delete/last-admin guards.
5. Tighten DTOs (`IsNumber`, `IsDateString`, `IsUrl`, from/to validation, 409 for SKU); strip frontend payloads to DTO fields.
6. Fix Reports profit (use historical `unitCost`), top-5 sort-then-slice, NaN guards, UTC→local days; fix avatar upload-then-delete + SVG block; fix form NaN/trim/SKU-edit checks.
7. Dedupe AuthCallback/Session logic; implement real routing or correct Changelog; add throttler + timeouts.

### Soon (P2)
8. Code-split frontend bundle; extract shared effect components; fix Inventory search/pagination/touch; add skeletons, Esc-close, tooltips, timestamps.
9. Readiness probe, shutdown hooks, global exception filter, Prisma logging, stricter eslint (`no-floating-promises:error`).
10. Real e2e/unit coverage (auth, tenancy, stock atomicity, insufficient-stock, cross-tenant 404), `.env.example` both repos, env tables in READMEs, CI with `migrate deploy` + health gate.

---

*Generated from direct source reads 2026-10-06. File:line references above are the audit trail.*
