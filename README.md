## Monorepo Structure

```
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ web
  │   ├─ React 19
  │   ├─ Tanstack Router and Query
  │   ├─ Typesafe API calls using tRPC
  │   └─ Tailwind CSS v4
  └─ server
      ├─ Fastify v5
      ├─ Typesafe API calls using tRPC
      └─ Authentication with Better Auth
packages
  ├─ api
  │   └─ tRPC v11 router definition
  ├─ db
  │   └─ Typesafe db calls using Drizzle & PostresQL
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
