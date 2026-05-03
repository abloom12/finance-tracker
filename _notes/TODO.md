After we finish new @acme/server make sure to update root dev script to:

```
"dev": "turbo run dev --filter=@acme/server --filter=@acme/web"
```

DB scripts eventually become:

```
"db:generate": "turbo run db:generate --filter=@acme/db",
"db:migrate": "turbo run db:migrate --filter=@acme/db",
"db:push": "turbo run db:push --filter=@acme/db",
"db:studio": "turbo run db:studio --filter=@acme/db"
```

apps/server/package.json

```json
{
  "name": "@acme/server",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "dist/server.mjs",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsdown",
    "start": "node dist/server.mjs",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --check . --ignore-path ../../.gitignore --ignore-path .prettierignore"
  },
  "dependencies": {
    "@acme/api": "workspace:*",
    "@acme/auth": "workspace:*",
    "@acme/db": "workspace:*",
    "@fastify/cors": "11.2.0",
    "@fastify/helmet": "13.0.2",
    "@fastify/rate-limit": "10.3.0",
    "@trpc/server": "catalog:",
    "dotenv": "17.4.2",
    "fastify": "5.8.5",
    "zod": "catalog:"
  },
  "devDependencies": {
    "@acme/prettier-config": "workspace:*",
    "@acme/tsconfig": "workspace:*",
    "@types/node": "catalog:",
    "prettier": "catalog:",
    "tsdown": "catalog:",
    "tsx": "4.21.0",
    "typescript": "catalog:"
  },
  "prettier": "@acme/prettier-config"
}
```

packages/db/package.json

```json
{
  "name": "@acme/db",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./schema": "./src/schema/index.ts"
  },
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --check . --ignore-path ../../.gitignore --ignore-path .prettierignore"
  },
  "dependencies": {
    "drizzle-orm": "0.45.2",
    "pg": "8.20.0"
  },
  "devDependencies": {
    "@acme/prettier-config": "workspace:*",
    "@acme/tsconfig": "workspace:*",
    "@types/node": "catalog:",
    "@types/pg": "8.20.0",
    "drizzle-kit": "0.31.10",
    "prettier": "catalog:",
    "typescript": "catalog:"
  },
  "prettier": "@acme/prettier-config"
}
```

packages/auth/package.json

```json
{
  "name": "@acme/auth",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "auth": "pnpm dlx auth@latest generate --output ./src/drizzle/schemas/new-auth-schema.ts --yes",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --check . --ignore-path ../../.gitignore --ignore-path .prettierignore"
  },
  "dependencies": {
    "@acme/db": "workspace:*",
    "@better-auth/drizzle-adapter": "1.6.8",
    "better-auth": "catalog:"
  },
  "devDependencies": {
    "@acme/prettier-config": "workspace:*",
    "@acme/tsconfig": "workspace:*",
    "@types/node": "catalog:",
    "prettier": "catalog:",
    "typescript": "catalog:"
  },
  "prettier": "@acme/prettier-config"
}
```

packages/api/package.json

```json
{
  "name": "@acme/api",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./trpc": "./src/trpc/index.ts"
  },
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --check . --ignore-path ../../.gitignore --ignore-path .prettierignore"
  },
  "dependencies": {
    "@acme/auth": "workspace:*",
    "@acme/db": "workspace:*",
    "@trpc/server": "catalog:",
    "zod": "catalog:"
  },
  "devDependencies": {
    "@acme/prettier-config": "workspace:*",
    "@acme/tsconfig": "workspace:*",
    "@types/node": "catalog:",
    "prettier": "catalog:",
    "typescript": "catalog:"
  },
  "prettier": "@acme/prettier-config"
}
```
