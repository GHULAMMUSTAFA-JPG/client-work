import React, { useState } from "react";
import {
  ArrowLeft,
  Target,
  ChevronDown,
  Users,
  Calendar,
  DollarSign,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import Link from "next/link";

interface CampaignHeaderProps {
  onBack: () => void;
  title: string;
  budget: string;
  date: string;
  status: "Public" | "Private";
  objective?: string;
  audience?: string[];
  platform?: string[];
  website?: string;
  onViewEarnings?: () => void;
}

export function CampaignHeader({
  onBack,
  title,
  budget,
  date,
  status,
  objective,
  audience,
  platform,
  website,
  onViewEarnings,
}: CampaignHeaderProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="tw-bg-white tw-border-b tw-border-gray-200">
      <div className="tw-px-6 tw-py-4">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <div className="tw-flex tw-items-center tw-space-x-4">
            <button
              onClick={onBack}
              className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-900"
            >
              <ArrowLeft className="tw-w-5 tw-h-5 tw-mr-2" />
              <span className="tw-font-medium">All Campaigns</span>
            </button>
          </div>

          <div className="tw-flex tw-items-center tw-space-x-6">
            <div className="tw-flex tw-items-center tw-space-x-2">
              <DollarSign className="tw-w-5 tw-h-5 tw-text-green-600" />
              <span className="tw-text-lg tw-font-semibold tw-text-gray-900">
                {budget}
              </span>
            </div>

            <Link
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                onViewEarnings && onViewEarnings();
              }}
              className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-text-sm tw-text-primary hover:tw-text-primary-dark tw-border tw-border-primary hover:tw-bg-primary/5 tw-rounded-md"
              title="View your earnings in Stripe Dashboard"
            >
              <CreditCard className="tw-w-4 tw-h-4 tw-mr-2" />
              View Earnings
              <ExternalLink className="tw-w-3 tw-h-3 tw-ml-1" />
            </Link>
          </div>
        </div>

        <div>
          <div className="tw-flex tw-items-center tw-space-x-4">
            <Target className="tw-w-8 tw-h-8 tw-text-primary" />
            <div>
              <div className="tw-flex tw-items-center tw-space-x-3">
                <h1 className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                  {title}
                </h1>
                <span className="tw-px-2.5 tw-py-0.5 tw-text-sm tw-font-medium tw-bg-green-100 tw-text-green-800 tw-rounded-full">
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="tw-mt-2 tw-space-y-2">
            <div className="tw-flex tw-items-center tw-space-x-6 tw-text-sm tw-text-gray-500">
              <div className="tw-flex tw-items-center">
                <Calendar className="tw-w-4 tw-h-4 tw-mr-1" />
                <span>{date}</span>
              </div>
              <div className="tw-flex tw-items-center">
                <Users className="tw-w-4 tw-h-4 tw-mr-1" />
                <span>{audience?.join(", ")}</span>
              </div>
            </div>
            <div className="tw-flex tw-items-start tw-justify-between ">
              <p className="tw-text-sm tw-text-gray-600 tw-max-w-2xl">
                {objective}
              </p>
              <button
                onClick={() => setIsDetailsOpen(true)}
                className="tw-mb-3 tw-flex tw-items-center tw-px-2 tw-py-1 tw-text-sm tw-text-primary hover:tw-text-primary-dark"
              >
                <span className="tw-mr-1">Show More</span>
                <ChevronDown className="tw-w-4 tw-h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampaignDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="Campaign Details"
        description={objective || ""}
        dueDate=""
        payout=""
        type="details"
        initialData={{
          title: "Campaign Details",
          type: "campaign",
          campaignName: title,
          status: status,
          budget: budget,
          createdAt: date,
          sections: [
            {
              title: "Overview",
              items: [
                {
                  label: "Campaign Brief",
                  value: objective,
                  type: "text",
                },
                {
                  label: "Target Audience",
                  value: audience,
                  type: "text",
                },
              ],
            },
            {
              title: "Campaign Information",
              items: [
                {
                  label: "Platforms",
                  value: platform?.join(", "),
                  type: "tags",
                },
                {
                  label: "Website",
                  value: website,
                  type: "link",
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
