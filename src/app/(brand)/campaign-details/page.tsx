"use client";

import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import CampaignTable from "@/components/campaign-brand/CampaignTable";
import { withAuthRole } from "@/utils/withAuthRole";
import { CampaignFormData } from "@/components/shared/EditCreateCampaign";
import EditCreateCampaign from "@/components/shared/EditCreateCampaign";
import { getBrandCampaignList } from "@/@api/campaign";
import { extractCampaignFormData } from "@/utils/dataFormat";
import Loader from "@/components/loader";

function CampaignDetails() {
  const { user, setIsLoading } = useAuth();
  const [campaignList, setCampaignList] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [campaignFormData, setCampaignFormData] =
    useState<CampaignFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCampaignList = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const campaignList = (await getBrandCampaignList(user?.email)) as any;
      setCampaignList(campaignList?.campaigns || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching campaign list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCampaignList();
    }
  }, [user, rendControl]);

  useEffect(() => {
    if (selectedCampaign) {
      const campaignDetails = campaignList.find(
        (item) => item._id === selectedCampaign
      );
      if (campaignDetails)
        setCampaignFormData(
          extractCampaignFormData(campaignDetails) as CampaignFormData
        );
    } else {
      setCampaignFormData(null);
    }
  }, [selectedCampaign, campaignList]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CampaignTable
        rendControl={rendControl}
        setRendControl={setRendControl}
        campaignList={campaignList}
        setSelectedCampaign={setSelectedCampaign}
      />

      <EditCreateCampaign
        initialData={campaignFormData as CampaignFormData}
        isEditMode={!!campaignFormData?.campaignId}
        onSuccess={fetchCampaignList}
      />
    </>
  );
}

function AuthPageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <CampaignDetails />
    </Suspense>
  );
}

export default withAuthRole({
  Component: AuthPageWrapper,
  allowedRoles: ["buyer"],
});
