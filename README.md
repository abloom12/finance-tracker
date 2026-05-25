## Monorepo Structure

```
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ web
  │   ├─ React 19
  │   ├─ Tanstack Router and Query
  │   ├─ Tanstack Form and Table
  │   ├─ tRPC client
  │   └─ Tailwind CSS v4
  └─ server
      ├─ Fastify v5
      └─ tRPC server
packages
  ├─ api
  │   └─ tRPC v11 router definition
  ├─ auth
  │   └─ Better Auth
  ├─ db
  │   └─ Drizzle & PostresQL
  └─ ui
      └─ Base UI components (right now these live in web)
tooling
  ├─ eslint
  │   └─ shared eslint presets
  ├─ prettier
  │   └─ shared prettier configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```
