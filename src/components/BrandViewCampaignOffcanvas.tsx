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
        <div>
          <h5 className="offcanvas-title">{companyname}</h5>
          <p className="text-muted fs-12 mb-0">
            Available collaboration opportunities
          </p>
        </div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body">
        {campaigns?.length === 0 ? (
          <div className="text-center">
            <p className="text-muted fs-14">No campaigns found</p>
          </div>
        ) : (
          campaigns?.map((campaign: any, index: any) => (
            <div
              key={campaign._id}
              ref={index === campaigns.length - 1 ? lastBrandElementRef : null}
              className="card mb-4"
            >
              <div key={index} className="pb-4 border-bottom card-body">
                <h5 className="mb-2">{campaign.Headline}</h5>
                <p className="text-gray fs-14 mb-4">
                  {campaign.Brief_Description}
                </p>

                <div className="row mb-4">
                  {/* <div className="col-6">
                    <div className="mb-2 text-muted fs-12">Budget Range</div>
                    <div className="text-gray">{campaign?.Budget}</div>
                  </div> */}
                  <div className="col-6">
                    <div className="mb-2 text-muted fs-12">Duration</div>
                    <div className="text-gray">
                      {campaign.Is_Ongoing
                        ? "On Going"
                        : campaign.Start_Date + "/" + campaign.End_Date}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-2 text-muted fs-12">Requirements</div>
                  <ul className="list-unstyled text-gray">
                    {campaign.Campaign_Details}
                  </ul>
                </div>
                {campaign.Is_Applied ? (
                  <button
                    style={{
                      backgroundColor: "grey",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    disabled
                    className="btn btn-primary w-100"
                  >
                    Applied
                  </button>
                ) : campaign.Is_Invited ? (
                  <button
                    style={{
                      backgroundColor: "grey",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    disabled
                    className="btn btn-primary w-100"
                  >
                    Invited
                  </button>
                ) : (
                  <button
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={() => handleApply(campaign._id, index)}
                    className="btn btn-primary w-100"
                  >
                    Apply for Campaign
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
}
