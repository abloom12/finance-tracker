import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpectedIncomeCard } from '@/features/cashflow/expected-income-card';
import { RecurringExpensesCard } from '@/features/cashflow/recurring-expenses-card';

export const Route = createFileRoute('/_app/my-money')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-lg py-3">
      <h1>My Money</h1>
      <p className="mb-3">Manage your income and expenses</p>

      <ExpectedIncomeCard />
      <RecurringExpensesCard />

      {/* recent activity */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>no recent activity</p>
        </CardContent>
      </Card>
    </div>
  );
}
