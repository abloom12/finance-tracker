import { createFileRoute, Link, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.session?.session.token) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          Reports
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          Budget
        </Link>
      </div>
    </div>
  );
}
