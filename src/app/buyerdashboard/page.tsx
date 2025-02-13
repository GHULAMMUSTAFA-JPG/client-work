"use client";

import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import CampaignOffcanvasBuyer from "@/components/campaignoffcanvasbuyer";
import CampaignReviewModal from "@/components/campaignreviewmodal";
import OffcanvasCreateCompaign from "@/components/offcanvascreatecompaign";
import CampaignOverview from "../CampaignReview/page";
import { useAuth } from "@/contexts/AuthContext";
import { getCampaignsList, getSelectedCampaignsDetails } from "@/@api";
import CampaignTable from "@/components/CampaignTable";
import { useSearchParams } from "next/navigation";
import { withAuthRole } from "@/utils/withAuthRole";

function Buyerdashboard() {
  const { user, setIsLoading } = useAuth();
  const [campaigns, setCampaigns] = useState(true);
  const [campaignList, setCampaignList] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [selectedCampaignDetails, setSelectedCampaignDetails] = useState<any>();
  const [rendControl, setRendControl] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    getCampaignsList(user?.email, setCampaignList, setIsLoading);
  }, [rendControl]);

  useEffect(() => {
    selectedCampaign &&
      getSelectedCampaignsDetails(
        selectedCampaign?._id,
        setSelectedCampaignDetails,
        setIsLoading
      );
  }, [selectedCampaign, rendControl]);
  // useEffect(() => {
  //   getSelectedCampaignsDetails(
  //     selectedCampaign?._id,
  //     setSelectedCampaignDetails,
  //     setIsLoading
  //   );
  // }, [rendControl]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getSelectedCampaignsDetails(id, setSelectedCampaignDetails, setIsLoading);
      setCampaigns(false);
    }
  }, [searchParams]);

  return (
    <>
      {campaigns ? (
        <CampaignTable
          rendControl={rendControl}
          setRendControl={setRendControl}
          campaignList={campaignList}
          setCampaigns={setCampaigns}
          setSelectedCampaign={setSelectedCampaign}
          setSelectedCampaignDetails={setSelectedCampaignDetails}
        />
      ) : (
        <div>
          <CampaignOverview
            setRendControl={setRendControl}
            rendControl={rendControl}
            setCampaigns={setCampaigns}
            selectedCampaignDetails={selectedCampaignDetails}
          />
        </div>
      )}
      <CampaignOffcanvasBuyer />
      <CampaignReviewModal />
      <OffcanvasCreateCompaign
        data={selectedCampaignDetails}
        setRendControl={setRendControl}
        rendControl={rendControl}
      />
    </>
  );
}

function AuthPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Buyerdashboard />
    </Suspense>
  );
}
export default withAuthRole({
  Component: AuthPageWrapper,
  allowedRoles: ["buyer"],
});
