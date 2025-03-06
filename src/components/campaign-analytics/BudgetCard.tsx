import { Card, ProgressBar } from "@tremor/react";

interface BudgetCardProps {
  budget: number;
  spent: number;
}

const BudgetCard = ({ budget, spent }: BudgetCardProps) => (
  <Card className="tw-mb-8">
    <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Budget Utilization</h3>
    <div className="tw-space-y-4">
      <div>
        <div className="tw-flex tw-justify-between tw-text-sm tw-mb-2">
          <span>Total Budget: ${budget.toLocaleString()}</span>
          <span>Spent: ${spent.toLocaleString()}</span>
        </div>
        <ProgressBar value={(spent / budget) * 100} color="blue" />
      </div>
    </div>
  </Card>
);

export default BudgetCard;
