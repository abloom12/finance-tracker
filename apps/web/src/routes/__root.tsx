import type { RouterContext } from '@/lib/router';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

const RootLayout = () => (
  <>
    <Outlet />
    <Toaster />
    {import.meta.env.DEV && <TanStackRouterDevtools />}
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
