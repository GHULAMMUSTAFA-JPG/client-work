import React from "react";
import { ArrowLeft, Edit, Globe, Lock } from "lucide-react";
import { Campaign } from "@/types";
import Tooltip from "../Tooltip";
import Link from "next/link";

interface CampaignHeaderProps {
  campaign: Campaign;
}

export default function CampaignHeader({ campaign }: CampaignHeaderProps) {
  const statusInfo = {
    public: {
      icon: Globe,
      tooltip: "This campaign is open for all creators to apply",
      class: "tw-bg-emerald-100 tw-text-emerald-700",
    },
    private: {
      icon: Lock,
      tooltip: "This campaign is invitation-only",
      class: "tw-bg-purple-100 tw-text-purple-700",
    },
  };

  const StatusIcon = statusInfo[campaign.status].icon;

  return (
    <div>
          
    <div className="tw-mb-8">
      <Link
        href="/campaign-details"
        className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-800 tw-mb-4"
      >
        <ArrowLeft className="tw-w-4 tw-h-4 tw-mr-2" />
        All Campaigns
      </Link>

       {/*  Notification Html is here  */}
       <div className="mynotify tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-4 tw-mb-6 tw-border-l-4 tw-border-green-500">
           <div className="tw-flex tw-items-center tw-gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info tw-w-5 tw-h-5 tw-text-blue-500 tw-flex-shrink-0">
               <circle cx="12" cy="12" r="10"></circle>
               <path d="M12 16v-4"></path>
               <path d="M12 8h.01"></path>
             </svg>
             <div className="tw-text-sm tw-text-gray-600">
               <span>Your campaign 'Invite Creator' is created successfully! &nbsp;
                 <a href="#" className="tw-text-blue-600 hover:tw-text-blue-800 tw-font-medium">Invite creators</a> to participate.
               </span>
             </div>
           </div>
         </div>
                {/*  Notification Html is here  */}

      <div className="tw-flex tw-justify-between tw-items-center mt-5">
        <div style={{ marginTop: '50px' }}>
          <div className="tw-flex tw-items-center tw-gap-3">
            <h1 className="tw-text-2xl tw-font-bold">{campaign.name}</h1>
            <Tooltip content={statusInfo[campaign.status].tooltip}>
              <span
                className={`tw-px-3 tw-py-1 ${
                  statusInfo[campaign.status].class
                } tw-rounded-full tw-text-sm tw-flex tw-items-center tw-gap-1`}
              >
                <StatusIcon className="tw-w-4 tw-h-4" />
                <span className="tw-capitalize">{campaign.status}</span>
              </span>
            </Tooltip>
          </div>
          <div className="tw-text-gray-500 tw-mt-1">
            Campaign starts {new Date(campaign.startDate).toLocaleDateString()}{" "}
            • Budget: ${campaign.budget.toLocaleString()}
          </div>
        </div>
      </div>

    </div>
        
    </div>

  );
}
