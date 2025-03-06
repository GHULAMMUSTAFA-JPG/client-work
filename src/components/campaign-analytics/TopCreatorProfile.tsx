import StatItem from "./StatItem";
import { Linkedin } from "lucide-react";

interface TopCreatorProps {
  creator: {
    name: string;
    image: string;
    category: string;
    stats: {
      followers: number;
      weeklyGrowth: number;
      engagement: number;
      performance: {
        current: number;
        change: string;
      };
    };
  };
}

const TopCreatorProfile = ({ creator }: TopCreatorProps) => (
  <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6 tw-mb-8">
    <div className="tw-flex tw-items-start tw-space-x-6">
      <img
        src={creator.image}
        alt={creator.name}
        className="tw-w-24 tw-h-24 tw-rounded-lg tw-object-cover"
      />
      <div className="tw-flex-grow">
        <div className="tw-flex tw-items-center tw-space-x-3 tw-mb-2">
          <h2 className="tw-text-2xl tw-font-bold">{creator.name}</h2>
          <span className="tw-px-3 tw-py-1 tw-bg-blue-100 tw-text-blue-800 tw-rounded-full tw-text-sm tw-font-medium">
            Top Creator
          </span>
          <Linkedin className="tw-w-6 tw-h-6 tw-text-blue-700" />
        </div>
        <p className="tw-text-gray-600 tw-mb-4">{creator.category}</p>
        <div className="tw-grid tw-grid-cols-3 tw-gap-8">
          <StatItem
            label="Followers"
            value={creator.stats.followers.toLocaleString()}
            trend={`${creator.stats.weeklyGrowth}%`}
            trendText="this week"
          />

          <StatItem
            label="Engagement Rate"
            value={`${creator.stats.engagement}%`}
            trend="50%"
            trendText="vs average"
          />

          <StatItem
            label="Performance Score"
            value={creator.stats.performance.current.toString()}
            trend={creator.stats.performance.change}
            trendText="vs last month"
          />
        </div>
      </div>
    </div>
  </div>
);

export default TopCreatorProfile;
