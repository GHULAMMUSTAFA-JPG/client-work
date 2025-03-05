import { ArrowUpIcon } from "lucide-react";

interface StatItemProps {
  label: string;
  value: string;
  trend: string;
  trendText: string;
}

const StatItem = ({ label, value, trend, trendText }: StatItemProps) => (
  <div>
    <div className="tw-text-gray-500 tw-text-sm tw-mb-1">{label}</div>
    <div className="tw-text-xl tw-font-bold">{value}</div>
    <div className="tw-flex tw-items-center tw-text-sm tw-text-green-600">
      <ArrowUpIcon className="tw-w-4 tw-h-4 tw-mr-1" />
      {trend} {trendText}
    </div>
  </div>
);

export default StatItem;
