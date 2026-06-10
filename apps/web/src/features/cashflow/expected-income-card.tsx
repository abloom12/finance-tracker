import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IncomeForm } from './income-form';

export function ExpectedIncomeCard() {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Expected Income</CardTitle>
      </CardHeader>
      <CardContent>
        <p>no income, add a new one below</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Income</Button>
          </DialogTrigger>
          <DialogContent>
            <IncomeForm />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
