import { Creator } from "./types";
import CreatorRow from "./CreatorRow";
import { Filter, Search } from "lucide-react";
import { ActiveFilterState } from "./types";

interface GlobalCreatorsTabProps {
  creators: Creator[];
  query: string;
  setQuery: (query: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  activeFilters: ActiveFilterState;
  onOpenFilterSidebar: () => void;
  onSelectCreator: (creatorId: string) => void;
  onAddToList: (creatorId: string) => void;
  onInviteToCampaign: (creatorId: string) => void;
}

const GlobalCreatorsTab = ({
  creators,
  query,
  setQuery,
  handleKeyPress,
  activeFilters,
  onOpenFilterSidebar,
  onSelectCreator,
  onAddToList,
  onInviteToCampaign,
}: GlobalCreatorsTabProps) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-3 px-3 gap-3">
        <div className="tw-flex-1 tw-relative">
          <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-gray-400 tw-h-5 tw-w-5" />
          <input
            type="text"
            placeholder="Search creators by name, company, or job title"
            className="w-100 tw-pl-10 tw-pr-4 tw-py-3 mt-3 mb-3 tw-border tw-rounded-lg tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-teal-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button
          onClick={onOpenFilterSidebar}
          className="tw-flex tw-items-center tw-space-x-2 tw-px-4 tw-py-2 tw-bg-white tw-rounded-md tw-shadow hover:tw-bg-gray-50 gap-2"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sliders-horizontal h-5 w-5"><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg>
          Filter
        </button>



      </div>

      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle text-center mb-0">
              <thead>
                <tr>
                  <th scope="col" className="text-start ps-4">
                    Creators
                  </th>
                  <th scope="col">Company</th>
                  <th scope="col">Followers</th>
                  <th scope="col">Impressions</th>
                  <th scope="col">Engagements</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {creators?.length > 0 ? (
                  creators.map((creator: Creator) => (
                    <CreatorRow
                      key={creator._id}
                      creator={creator}
                      onSelectCreator={onSelectCreator}
                      onAddToList={onAddToList}
                      onInviteToCampaign={onInviteToCampaign}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No creators found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCreatorsTab;
