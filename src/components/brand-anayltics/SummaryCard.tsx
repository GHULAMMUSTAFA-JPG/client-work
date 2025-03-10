import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor?: string; // Made optional since it's not used in the component
  subtitle: React.ReactNode;
  subtitleValue: React.ReactNode;
}

const SummaryCard = ({
  title,
  value,
  icon,
  iconBgColor,
  subtitle,
  subtitleValue,
}: SummaryCardProps) => (
  <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-p-6">
    <div className="tw-flex tw-items-center tw-justify-between">
      <div>
        <p className="tw-text-sm tw-text-gray-500">{title}</p>
        <h3 className="tw-text-2xl tw-font-semibold tw-mt-1">{value}</h3>
      </div>
      <div className={`${iconBgColor} tw-p-3 tw-rounded-full`}>{icon}</div>
    </div>
    <div className="tw-mt-4 tw-flex tw-items-center tw-text-sm tw-text-gray-500">
      {subtitle}: {subtitleValue}
    </div>
  </div>
);

export default SummaryCard;
