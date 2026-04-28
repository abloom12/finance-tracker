import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div>
      <div className='flex gap-2 p-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>
      </div>
    </div>
  );
}
