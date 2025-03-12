import { apiController } from "@/@api/baseUrl";
import { useAuth } from "@/contexts/AuthContext";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./loader";
import { toast } from "react-toastify";

export default function BrandViewCampaignOffcanvas({
  brandid,
  companyname,
}: any) {
  const { user, setIsLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [campaigns, setcampaigns] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  // const [rerender, setrerender] = useState(false);
  const observer = useRef<IntersectionObserver>();
  console.log("user", user);
  console.log("brandid", brandid);
  console.log("hasMore", hasMore);
  interface Campaign {
    title: string;
    description: string;
    budgetRange: string;
    duration: string;
    requirements: string[];
  }

  interface Brand {
    id: number;
    name: string;
    description: string;
    categories: string[];
    size: string;
    campaigns: Campaign[];
  }
  // Static brands data

  useEffect(() => {
    const fetctCampaigns = async () => {
      try {
        if (!brandid) return;
        setLoading(true);
        const response = await apiController.get(
          `/dashboard/campaigns/brand-active-campaigns?buyer_id=${brandid}&creator_id=${user.uuid}&page=${page}&limit=10`
        );
        console.log(response);
        if (response.status === 200) {
          const newcampaigns = response.data.campaigns;
          setcampaigns((prev) =>
            page === 1 ? newcampaigns : [...prev, ...newcampaigns]
          );
          setHasMore(newcampaigns.length > 0);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetctCampaigns();
  }, [brandid, page]);
  const lastBrandElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPage(1);
  }, [brandid]);
  const handleApply = async (id: any, index: any) => {
    try {
      const response = await apiController.post(
        `/dashboard/campaigns/apply_campaign`,
        {
          campaign_id: id,
          creator_email: user.email,
          message: "",
        }
      );
      console.log(response);
      if (response.status === 200) {
        const updatedcompaigns = campaigns.map((campaign: any, i: any) => {
          if (i === index) {
            return {
              ...campaign,
              Is_Applied: true,
            };
          }
          return campaign;
        });
        setcampaigns(updatedcompaigns);
        // toast.success(response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      // toast.error(error?.data?.message);
    }
  };
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="campaignsOffcanvas"
    >
      <div className="offcanvas-header border-bottom">
  {/*       <div>
          <h5 className="offcanvas-title">{companyname}</h5>
          <p className="text-muted fs-12 mb-0">
            Available collaboration opportunities
          </p>
        </div> */}
        <div className="tw-flex tw-items-center tw-space-x-4">
        <div className="img-container-topHeader">
  <img 
    src="https://cdn.synnc.us/brand/fc331bd6-a9a5-4496-a38a-09964d080e24.png" 
    alt="" 
    className="" />
    </div>
  <div>
    <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900">{companyname}</h2>
    <p className="tw-text-gray-600">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies orci sed nisi auctor, vitae rhoncus erat maximus. Aliquam in ex ut mi tincidunt porta.
    </p>
  </div>
</div>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body">

<div>
{campaigns?.length === 0 ? (
      <div className="text-center">
        <p className="text-muted fs-14">No campaigns found</p>
      </div>
    ) : (
      campaigns?.map((campaign: any, index: any) => (
        <div
          key={campaign._id}
          ref={index === campaigns.length - 1 ? lastBrandElementRef : null}
          className="mb-4"
        >
<div className="p-4 campaign-box-border">
  <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
    <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">{campaign.Headline}</h3>
    <div className="tw-flex tw-space-x-2">
      <span className="tw-flex tw-items-center tw-text-xs tw-font-medium tw-text-red-600 tw-bg-red-50 tw-px-2 tw-py-1 tw-rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flame tw-w-3 tw-h-3 tw-mr-1">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
        </svg>
        Urgent
      </span>
    </div>
  </div>

  <p className="tw-text-gray-600 tw-mb-4">
  {campaign.Brief_Description}
  </p>

  <div className="tw-space-y-4">
    <div>
      <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-2">Duration</h4>
      <p className="tw-text-sm tw-text-gray-700"> {campaign.Is_Ongoing
                    ? "On Going"
                    : campaign.Start_Date + "/" + campaign.End_Date}</p>
    </div>

    <div>
      <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-2">Requirements</h4>
      <ul className="tw-space-y-2">
     
                {campaign.Campaign_Details}
             
      </ul>
    </div>

    <div>
      <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-2">Platforms</h4>
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <span className="tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium tw-bg-gray-100 tw-text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe tw-w-3 tw-h-3 tw-mr-1">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
          LinkedIn
        </span>
      </div>
    </div>

    <div className="tw-flex tw-items-center tw-justify-between tw-pt-4">
      <div className="tw-flex tw-items-center tw-space-x-2">
        <span className="tw-flex tw-items-center tw-text-xs tw-font-medium tw-text-green-600 tw-bg-green-50 tw-px-2 tw-py-1 tw-rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dollar-sign tw-w-3 tw-h-3 tw-mr-1">
            <line x1="12" x2="12" y1="2" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          $2,000 Hardcoded
        </span>
      </div>


      {campaign.Is_Applied ? (

  <button disabled className="tw-px-4 tw-py-2 tw-bg-gray-600 tw-text-white tw-rounded-lg">
  Applied
</button>


) : campaign.Is_Invited ? (

  <button disabled className="tw-px-4 tw-py-2 tw-bg-gray-600 tw-text-white tw-rounded-lg">
  Invited
</button>
  
) : (
  <button
    onClick={() => handleApply(campaign._id, index)}
    className="tw-px-4 tw-py-2 tw-bg-emerald-600 tw-text-white tw-rounded-lg hover:tw-bg-emerald-700 tw-text-sm tw-font-medium"
  >
    Apply for Campaign
  </button>
)}


    </div>
  </div>
</div>
</div>
      ))
    )}
    {loading && <Loader />}
  
</div>

      </div>
    </div>
  );
}
