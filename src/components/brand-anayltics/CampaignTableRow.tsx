import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { CampaignMetric } from "@/@api/analytics";
import {
  getCampaignStatusStyles,
  mapStatusString,
} from "@/components/shared/utils";

const CampaignTableRow = ({ campaign }: { campaign: CampaignMetric }) => (
  <tr className="tw-border-t tw-border-gray-100 hover:tw-bg-gray-50">
    <td className="tw-px-6 tw-py-4">
      <Link
        href={`/campaign-analytics/${campaign.campaign_id}`}
        className="tw-text-blue-600 hover:tw-text-blue-800"
      >
        {campaign.campaign_headline}
      </Link>
    </td>
    <td className="tw-px-6 tw-py-4">
      <span
        className={getCampaignStatusStyles(mapStatusString(campaign.status))}
      >
        {campaign.status}
      </span>
    </td>
    <td className="tw-px-6 tw-py-4">${campaign.budget.toLocaleString()}</td>
    <td className="tw-px-6 tw-py-4">
      {campaign.total_impressions.toLocaleString()}
    </td>
    <td className="tw-px-6 tw-py-4">{campaign.engagement_rate.toFixed(2)}%</td>
  </tr>
);

export default CampaignTableRow;
