import React, { useState } from "react";
import { CalendarCheck, ExternalLink } from "lucide-react";
import ApplyModal from "./ApplyModal";
import { apiController } from "@/@api/baseUrl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface CampaignAcceptanceCardProps {
  campaignName: string;
  campaignLink: string;
  acceptanceDate: string;
  campaignid: any;
  isCreatorView?: boolean;
  name?: any;
}

export const CampaignAcceptanceCard = ({
  campaignName,
  campaignLink,
  acceptanceDate,
  campaignid,
  isCreatorView = false,
  name,
}: CampaignAcceptanceCardProps) => {
  const [selectedCampaign, setselectedCampaign] = useState(null);
  const router = useRouter();
  const { user } = useAuth();
  console.log("user", user);
  const handleViewCampaign = async (id: any) => {
    if (user?.isBuyer) {
      router.push(`/campaign-details/${id}`);
    } else if (!user?.isBuyer) {
      router.push(`/campaign-hub?id=${id}`);
    }
    // try {
    //   const response = await apiController.get(`/dashboard/campaigns/${id}/`);
    //   console.log(response);
    //   if (response.status === 200) {
    //     setselectedCampaign(response.data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  console.log("campaignid", campaignid);
  return (
    <div
      className="border-opacity-25 border-primary card p-4 shadow-sm w-100"
      style={{ maxWidth: "28rem" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <CalendarCheck
            className="text-primary flex-shrink-0"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <h3 className="fw-medium text-dark mb-0 line-clamp-2">
            {user.isBuyer
              ? `${name} accepted to the campaign`
              : `Congrats! ${name} has accepted your application`}
          </h3>
        </div>
        <span className="small text-gray flex-shrink-0 ms-3">
          {acceptanceDate}
        </span>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <div>
          <p className="text-secondary fw-medium mb-0">{campaignName}</p>
        </div>
        <div
          onClick={() => {
            handleViewCampaign(campaignid);
          }}
          // className="btn btn-dark ms-2 btn-sm w-s mt-2"
          // data-bs-toggle="modal"
          // data-bs-target="#applyModal"
          // href={campaignLink}
          className="d-flex align-items-center gap-1 text-primary text-decoration-none small fw-medium cursor ms-3"
          // target="_blank"
          rel="noopener noreferrer"
        >
          View Campaign
          <ExternalLink style={{ width: "1rem", height: "1rem" }} />
        </div>
      </div>
      <ApplyModal selectedCampaign={selectedCampaign} />
    </div>
  );
};
