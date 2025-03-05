import { ArrowUpIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  icon?: React.ReactNode;
}
const MetricCard = ({ label, value, change, icon }: MetricCardProps) => (
  <div className="tw-col-span-1">
    <div className="tw-space-y-1">
      <div className="tw-text-sm tw-text-gray-500">{label}</div>
      <div className="tw-flex tw-items-center">
        <span className="tw-font-semibold">{value}</span>
        {change > 0 && (
          <div className="tw-ml-2 tw-flex tw-items-center tw-text-green-600 tw-text-sm">
            {icon || <ArrowUpIcon className="tw-w-3 tw-h-3" />}
            <span>{change}%</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default MetricCard;
