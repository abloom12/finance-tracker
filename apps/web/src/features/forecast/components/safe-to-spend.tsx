import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SafeToSpendCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Safe to spend</CardTitle>
        <CardAction>On Track</CardAction>
      </CardHeader>
      <CardContent>
        <div className="">
          <div className="">$856.47</div>
          <div className="">until Friday, May 21</div>
        </div>
        <div className="">
          <div className="">
            <div className="">$57.09</div>
            <div className="">Daily Safe Spend</div>
          </div>
          <div className="">
            <div className="">15</div>
            <div className="">Days to Payday</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
