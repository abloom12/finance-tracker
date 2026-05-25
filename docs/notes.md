# Finance Tracker Setup Checklist

## Auth

- [x] Decide whether auth lives in `packages/auth` or `apps/server/src/auth.ts`
- [x] Remove or stop using the duplicate auth implementation
- [x] Wire the server to the chosen auth factory
- [x] Align password rules across server auth, package auth, and frontend validation
- [ ] Replace temporary auth toasts like `yay!` / `uh oh` with real user-facing messages
- [ ] Redirect after successful login
- [ ] Redirect after successful signup
- [ ] Refetch session after login/signup if needed
- [x] Decide whether password reset is MVP scope - **NOT UNTIL WE GET EMAIL SETUP WITH POSTMARK**

## Protected Routing

- [ ] Implement `/_app` route guard
- [ ] Redirect unauthenticated users from `/_app/*` to `/login`
- [ ] Prevent logged-in users from staying on `/login`
- [ ] Prevent logged-in users from staying on `/signup`
- [ ] Preserve intended destination when redirecting to login
- [ ] Add a loading/pending state while session is being checked
- [ ] Replace placeholder `/` route with the intended landing or app redirect
- [ ] Replace placeholder `/_app/settings` content

## tRPC

- [ ] Split `packages/api/src/index.ts` into `context.ts`, `trpc.ts`, and `routers/*`
- [x] Keep `@acme/server` importing only from `@acme/api`
- [x] Change `createApi(auth)` to accept a dependency object like `createApi({ auth, db })`
- [ ] Keep session lookup inside API context creation
- [ ] Keep `publicProcedure` and `protectedProcedure` in one shared tRPC module
- [ ] Add a protected `me` query or keep `health.me` as the auth smoke test
- [ ] Call the protected query from the frontend to verify cookie/session flow
- [ ] Add input validation to every mutation/query that accepts user input
- [ ] Add an onboarding router
- [ ] Add account/balance router
- [ ] Add payday/income router
- [ ] Add bills router
- [ ] Add forecast router
- [ ] Add settings router

## Database

- [ ] Decide which schemas are active for MVP
- [ ] Export onboarding schema from `packages/db/src/schema.ts` if it should be active
- [ ] Generate initial Drizzle migrations
- [ ] Implement or remove empty `migrate.ts`
- [ ] Implement or remove empty `seed.ts`
- [ ] Add onboarding persistence table to active schema
- [ ] Add account/balance table
- [ ] Add payday/income schedule table
- [ ] Add upcoming bills table
- [ ] Add expenses/manual activity table
- [ ] Add recurring expenses table
- [ ] Add goals table if MVP scope
- [ ] Add indexes for user-owned tables
- [ ] Ensure all user-owned records reference `user.id`
- [ ] Add cascade behavior intentionally for user-owned records
- [ ] Document local DB setup steps

## Onboarding

- [ ] Build onboarding route group
- [ ] Add onboarding status query
- [ ] Add onboarding progress mutation
- [ ] Add current balance step
- [ ] Add payday setup step
- [ ] Add upcoming bills step
- [ ] Add optional goals/buffer step if MVP scope
- [ ] Allow onboarding skip
- [ ] Show useful empty state after skip
- [ ] Persist onboarding completion
- [ ] Redirect new users to onboarding after signup
- [ ] Redirect completed users to dashboard
- [ ] Handle negative balance calmly
- [ ] Handle zero balance
- [ ] Handle payday today without divide-by-zero
- [ ] Handle past payday dates with validation

## Forecast / Budget Core

- [ ] Define the MVP forecast formula
- [ ] Decide whether money is stored in minor units
- [ ] Use `packages/money` for formatting money values
- [ ] Calculate days until payday
- [ ] Calculate safe-to-spend amount
- [ ] Calculate daily safe amount
- [ ] Subtract upcoming bills from available balance
- [ ] Handle negative safe-to-spend values
- [ ] Handle no bills
- [ ] Handle no payday configured
- [ ] Add forecast tRPC query
- [ ] Add unit tests for forecast calculations
- [ ] Add home dashboard forecast UI
- [ ] Replace placeholder root page

## Web UI

- [ ] Add authenticated app shell/navigation
- [ ] Add home/forecast screen
- [ ] Add quick expense entry UI
- [ ] Add upcoming bills UI
- [ ] Add recent activity UI
- [ ] Add settings page UI
- [ ] Add form-level loading states
- [ ] Add form-level error states
- [ ] Add field-level validation messages
- [ ] Replace temporary copy with product-appropriate copy
- [ ] Make mobile layout usable first
- [ ] Verify desktop layout after mobile
- [ ] Remove unused starter UI/components if they stay unused

## Environment / Config

- [ ] Add missing env vars to `apps/server/src/env.ts` only if actively used
- [ ] Remove unused `POLAR_ACCESS_TOKEN` from env example if Polar is deferred
- [ ] Ensure `BETTER_AUTH_SECRET` example satisfies minimum length
- [ ] Ensure web `VITE_API_URL` matches server auth base URL expectations
- [ ] Decide whether auth uses direct API URL or Vite `/api` proxy locally
- [ ] Document required `.env` files
- [ ] Document startup order for DB, server, and web

## Quality / Verification

- [ ] Run typecheck
- [ ] Run lint
- [ ] Run build
- [ ] Run Drizzle migration generation
- [ ] Run migrations against local DB
- [ ] Manually test signup
- [ ] Manually test login
- [ ] Manually test logout
- [ ] Manually test protected route redirect
- [ ] Manually test authenticated tRPC query
- [ ] Manually test onboarding persistence
- [ ] Add tests for money formatting
- [ ] Add tests for forecast calculations
- [ ] Add tests for protected tRPC procedures
- [ ] Add tests for onboarding router logic

## Cleanup

- [ ] Fix typo in `docs/notes.md`: `Ppage`
- [ ] Update README with real setup instructions
- [ ] Update README package list to match actual packages
- [ ] Decide whether `packages/auth` should stay
- [ ] Decide whether `packages/money` needs broader money utilities
- [ ] Remove unused docs or mark them as planning docs
- [ ] Remove unused package dependencies after MVP scope is decided
