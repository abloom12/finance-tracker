# Docker Setup for Current `apps/api` Structure

## Summary

Your current API structure is fine for Docker as-is.

The main issue is not the folder layout. It is that `apps/api` is still configured like a dev-only TypeScript service:

- it has `dev`, but no production `build` or `start`
- it relies on workspace packages/configs
- it has no migration/runtime container flow yet

The clean Docker path is:

- keep DB code in `apps/api/src/db`
- add production scripts for the API
- containerize `api` and `db` first
- keep `web` running on the host with Vite during local development
- optionally add a `web` container later for parity or provider portability

## Recommended Local Dev Shape

Use this topology for now:

- `web`: run locally with Vite on your machine
- `api`: run in Docker
- `db`: run in Docker

Why this is the best fit now:

- you keep fast Vite DX and file watching
- you still get repeatable backend/database setup
- you avoid Dockerizing the easiest part of the stack too early

The frontend should call the API at a host URL like `http://localhost:3000`, while the API container connects to Postgres using the compose service name, not `localhost`.

## API Container Plan

### 1. Add production scripts to `apps/api/package.json`

You need explicit scripts for:

- `build`: compile/bundle the API into runnable JS
- `start`: run the built artifact in production
- optional migration script such as `db:push`, `db:generate`, or `db:migrate` depending on the Drizzle workflow you choose

Because this repo already includes `tsdown`, the simplest path is to use that for the production build rather than trying to run raw `.ts` directly in production.

### 2. Add an API Dockerfile

Use a multi-stage build:

- base stage with Node 24 + pnpm
- dependency install stage using root workspace manifests
- build stage that runs the API build
- runtime stage that copies only the built output and production dependencies

Important workspace inputs to copy into the build context:

- root `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `apps/api/package.json`
- `tooling/typescript/package.json` and config JSON files
- `tooling/prettier/package.json` only if the install graph requires it
- `apps/api/src`
- any generated/migration files once they exist

The Dockerfile should build the workspace from the repo root, not from inside `apps/api` alone.

### 3. Add `.dockerignore`

Ignore:

- `node_modules`
- `apps/*/node_modules`
- `apps/web/dist`
- `apps/api/dist`
- `.git`
- `.DS_Store`
- local env files you do not want copied into images

This matters a lot in a pnpm monorepo; otherwise Docker context gets noisy and slow.

## Compose Plan

Add a root `docker-compose.yml` with:

- `db`
- `api`

### `db`

Use a Postgres image with:

- database name
- username
- password
- a named volume for persistence

### `api`

Build from the repo root using the API Dockerfile.
Pass env vars for:

- `PORT`
- `APP_ORIGIN`
- `CORS_ORIGIN`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `DATABASE_URL`

For local compose:

- `DATABASE_URL` should point at the Postgres service name, for example `db`, not `localhost`
- `APP_ORIGIN` should point at your Vite host URL
- `BETTER_AUTH_URL` should point at the host-visible API URL if browser callbacks need to reach it

Expose the API port to the host so the Vite app can call it directly.

## Drizzle / Database Placement

Keeping Drizzle in `apps/api/src/db` is correct for now.

Do not move it yet.
Only move it into `packages/db` later if another server-side process needs the same schema/query layer, such as:

- a worker
- CLI scripts
- background jobs
- import/sync services

## Production Direction

For deployment later:

- build and ship the `api` container
- use managed Postgres from the same provider if possible
- keep `web` flexible: static hosting or its own static-serving container

That means your Docker investment now is still useful later, even if the frontend never gets containerized.

## Test Plan

- `docker compose up db api` starts successfully
- API can connect to Postgres using the compose service hostname
- API responds on the exposed localhost port
- frontend running via Vite can reach the containerized API
- auth routes work with local `APP_ORIGIN` / `BETTER_AUTH_URL`
- API can run from a production build, not only from `fastify start src/app.ts`

## Assumptions and Defaults

- Keep `apps/api` as the DB owner
- Do not Dockerize `web` yet for local development
- Use Docker for backend parity, not full-stack uniformity
- Use a production build artifact for the API rather than TypeScript-at-runtime in the final image
- Delay migration/seed container automation until after the basic `api + db` flow works
