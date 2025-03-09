import { CampaignMetric } from "@/@api/analytics";
import CampaignTableRow from "./CampaignTableRow";

interface CampaignsTableProps {
  campaignMetrics?: CampaignMetric[];
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaignMetrics = [],
}) => {
  return (
    <div className="tw-bg-white tw-rounded-lg tw-border tw-border-gray-100 tw-overflow-hidden">
      <div className="tw-p-6 tw-border-b tw-border-gray-100">
        <h2 className="tw-text-lg tw-font-semibold">Active Campaigns</h2>
        <p className="tw-text-gray-500 tw-text-sm">
          Overview of all your campaign performance
        </p>
      </div>
      <div className="tw-overflow-x-auto">
        <table className="tw-w-full">
          <thead>
            <tr className="tw-bg-gray-50">
              <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                Campaign Name
              </th>
              <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                Status
              </th>
              <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                Budget
              </th>
              <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                Impressions
              </th>
              <th className="tw-text-left tw-px-6 tw-py-4 tw-text-sm tw-font-semibold tw-text-gray-600">
                Engagement
              </th>
            </tr>
          </thead>
          <tbody>
            {campaignMetrics.map((campaign) => (
              <CampaignTableRow
                key={campaign.campaign_id}
                campaign={campaign}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;
