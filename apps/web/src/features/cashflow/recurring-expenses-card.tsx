import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function RecurringExpensesCard() {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Recurring Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <p>no expenses, add a new one below</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Expense</Button>
          </DialogTrigger>
          <DialogContent></DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
