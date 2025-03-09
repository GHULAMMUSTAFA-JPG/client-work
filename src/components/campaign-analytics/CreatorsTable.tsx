import { Filter, Plus, ArrowUpIcon } from "lucide-react";
interface Creator {
  id: string;
  name: string;
  profilePicture: string;
  lastPost: string;
  impressions: number;
  engRate: number;
  reactions: number;
  trend: number;
}

interface CreatorsTableProps {
  creators: Creator[];
}

const CreatorsTable = ({ creators }: CreatorsTableProps) => (
  <div
    id="all-creators"
    className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6"
  >
    <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <h2 className="tw-text-lg tw-font-semibold">All Creator Content</h2>
      <div className="tw-flex tw-items-center tw-space-x-4">
        <button className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-text-gray-600 hover:tw-bg-gray-50 tw-rounded-lg">
          <Filter className="tw-w-4 tw-h-4 tw-mr-2" />
          Filters
        </button>
        <button className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-900 tw-text-white tw-rounded-lg hover:tw-bg-gray-800">
          <Plus className="tw-w-4 tw-h-4 tw-mr-2" />
          Add Content
        </button>
      </div>
    </div>

    <table className="tw-w-full">
      <thead>
        <tr className="tw-text-left tw-text-sm tw-text-gray-500">
          <th className="tw-pb-4">Creator & Channel</th>
          <th className="tw-pb-4">Content</th>
          <th className="tw-pb-4">Impressions</th>
          <th className="tw-pb-4">Eng. Rate</th>
          <th className="tw-pb-4">Reactions</th>

          <th className="tw-pb-4">Trend</th>
        </tr>
      </thead>
      <tbody className="tw-text-sm">
        {creators.map((creator) => (
          <tr key={creator.id} className="tw-border-t tw-border-gray-100">
            <td className="tw-py-4">
              <div className="tw-flex tw-items-center">
                {creator.profilePicture ? (
                  <img
                    src={creator.profilePicture}
                    alt={creator.name}
                    className="tw-w-8 tw-h-8 tw-rounded-full tw-mr-3"
                  />
                ) : (
                  <div className="tw-w-8 tw-h-8 tw-rounded-full tw-mr-3 tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
                    <span className="tw-text-xs tw-font-bold tw-text-blue-700">
                      {creator.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div className="tw-font-medium">{creator.name}</div>
                  <div className="tw-text-gray-500">6 hours ago</div>
                </div>
              </div>
            </td>
            <td className="tw-py-4">{creator.lastPost}</td>
            <td className="tw-py-4">{creator.impressions}</td>
            <td className="tw-py-4">{creator.engRate}</td>
            <td className="tw-py-4">{creator.reactions.toLocaleString()}</td>
            <td className="tw-py-4">
              <div className="tw-flex tw-items-center tw-text-green-600">
                <ArrowUpIcon className="tw-w-4 tw-h-4 tw-mr-1" />
                {creator.trend}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CreatorsTable;
