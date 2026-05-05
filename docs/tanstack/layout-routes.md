### Layout Routes

Layout routes are used to wrap child routes with additional components and logic.

```
  routes/
  ├── app.tsx
  ├── app.dashboard.tsx
  ├── app.settings.tsx
```

```
  routes/
  ├── app/
  │   ├── route.tsx
  │   ├── dashboard.tsx
  │   ├── settings.tsx
```

```jsx
// would be same for both routes/app/route.tsx & routes/app.tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  );
}
```

### Pathless Layout Routes

```
  routes/
  ├── _pathlessLayout.tsx
  ├── _pathlessLayout.a.tsx
  ├── _pathlessLayout.b.tsx
```

```
  routes/
  ├── _pathlessLayout/
  │   ├── route.tsx
  │   ├── a.tsx
  │   ├── b.tsx
```
