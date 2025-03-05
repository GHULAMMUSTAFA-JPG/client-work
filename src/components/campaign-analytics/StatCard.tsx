import React from "react";
import { ArrowUpIcon, ArrowDownIcon, HelpCircle } from "lucide-react";
import Tooltip from "@/components/Tooltip";

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    timeframe: string;
  };
  tooltip: string;
  icon?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  tooltip,
  icon,
}: StatCardProps) {
  const isPositive = change.value > 0;

  return (
    <div className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-2">
        <h3 className="tw-text-sm tw-text-gray-500 tw-flex tw-items-center tw-gap-2">
          {title}
          <Tooltip content={tooltip}>
            <HelpCircle className="tw-w-4 tw-h-4 tw-text-gray-400 tw-cursor-help" />
          </Tooltip>
        </h3>
        {icon}
      </div>
      <div className="tw-text-3xl tw-font-bold tw-mb-2">{value}</div>
      <div className="tw-flex tw-items-center tw-text-sm">
        {isPositive ? (
          <ArrowUpIcon className="tw-w-4 tw-h-4 tw-text-green-500 tw-mr-1" />
        ) : (
          <ArrowDownIcon className="tw-w-4 tw-h-4 tw-text-red-500 tw-mr-1" />
        )}
        <span className={isPositive ? "tw-text-green-600" : "tw-text-red-600"}>
          {isPositive ? "+" : ""}
          {change.value}%
        </span>
        <span className="tw-text-gray-500 tw-ml-1">vs {change.timeframe}</span>
      </div>
    </div>
  );
}
