import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/my-money')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>My Money</h1>
      <p>Manage your income, expenses and activity</p>

      {/* add item action */}

      {/* overview */}

      {/* expected income */}

      {/* recurring expenses */}

      {/* recent activity */}
    </div>
  );
}
