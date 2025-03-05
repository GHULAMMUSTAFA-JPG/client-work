import React from "react";

import { ArrowUpIcon, ArrowDownIcon, Users, TrendingUp } from "lucide-react";
import Tooltip from "@/components/Tooltip";
import Link from "next/link";

interface CreatorCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  metrics: {
    followers: number;
    engagement: number;
    change: number;
  };
  isTopCreator?: boolean;
}

export function CreatorCard({
  id,
  name,
  image,
  category,
  metrics,
  isTopCreator,
}: CreatorCardProps) {
  return (
    <Link
      href={`/campaign/${id}`}
      className={`tw-block tw-bg-white tw-rounded-xl tw-shadow-sm hover:tw-shadow-md tw-transition-all tw-transform hover:tw-translate-y-1 ${
        isTopCreator ? "tw-border-2 tw-border-blue-500" : ""
      }`}
    >
      <div className="tw-p-6">
        <div className="tw-flex tw-items-start tw-space-x-4">
          <img
            src={image}
            alt={name}
            className="tw-w-16 tw-h-16 tw-rounded-lg tw-object-cover"
          />
          <div className="tw-flex-grow">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <h3 className="tw-font-semibold tw-text-lg">{name}</h3>
              {isTopCreator && (
                <Tooltip
                  content="Top performing creator in this campaign"
                  side="top"
                >
                  <span className="tw-px-2 tw-py-1 tw-bg-blue-100 tw-text-blue-800 tw-text-xs tw-rounded-full">
                    Top Creator
                  </span>
                </Tooltip>
              )}
            </div>
            <p className="tw-text-gray-500 tw-text-sm">{category}</p>

            <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4">
              <Tooltip content="Total number of followers across all platforms">
                <div className="tw-flex tw-items-center tw-space-x-2">
                  <Users className="tw-w-4 tw-h-4 tw-text-gray-400" />
                  <span className="tw-text-sm tw-font-medium">
                    {metrics.followers.toLocaleString()}
                  </span>
                </div>
              </Tooltip>

              <div className="tw-flex tw-items-center tw-space-x-2">
                <TrendingUp className="tw-w-4 tw-h-4 tw-text-gray-400" />
                <span className="tw-text-sm tw-font-medium tw-flex tw-items-center">
                  {metrics.engagement}%
                  {metrics.change > 0 ? (
                    <ArrowUpIcon className="tw-w-3 tw-h-3 tw-text-green-500 tw-ml-1" />
                  ) : (
                    <ArrowDownIcon className="tw-w-3 tw-h-3 tw-text-red-500 tw-ml-1" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
