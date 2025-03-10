"use client";

import { fetch_dashboard_data, fetchCompanyData, handleFileUpload, updateProfileInformation, fetchCreatorData } from "@/@api";
import Topcard from "@/components/topcard";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { withAuthRole } from "@/utils/withAuthRole";
import MyCreatorsShell from "@/components/Mycreators-shell";
// import { useRouter } from "next/navigation";
function CreatorDashboard() {
  const { user, setIsLoading, setIsActive } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<any>([]);
  const [creatorStats, setCreatorStats] = useState({
    totalCreators: 0,
    totalEngagements: 0,
    growthRate: 0
  });
  // const router = useRouter()

  const fetchData = useCallback(async () => {
    const response: any = await fetch_dashboard_data(setIsLoading);
    setUsers(response.data?.users);
  }, [setIsLoading]);

  useEffect(() => {
    setIsActive(3);
    fetchData();
  }, [fetchData, setIsActive]);

  useEffect(() => {
    user?.email && fetchCompanyData(user?.email, setCompanyData, setIsLoading);
  }, [user, setIsLoading]);
  useEffect(() => {
    if (user?.email) {
      const getCreatorData = async () => {
        setIsLoading(true);
        try {
          const response = await fetchCreatorData(user.email);
          setCreatorStats({
            totalCreators: response?.total_creators || 0,
            totalEngagements: response?.total_engagements || 0,
            growthRate: response?.growth_rate || 0
          });
        } catch (error) {
          console.error('Error fetching creator data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      getCreatorData();
    }
  }, [user?.email, setIsLoading]);

  const handleInvite = () => {
    const subject = "Join Social27 Creator Platform";
    const body = "Hey! I'd like to invite you to join Social27's Creator Platform.";
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open('mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body), '_blank');
  return;
  };

  return (
    <>
      <MyCreatorsShell 
        handleInvite={handleInvite}
        companyData={companyData}
        creatorStats={creatorStats}
      >

      </MyCreatorsShell>

      
    </>
  );
}
export default withAuthRole({
  Component: CreatorDashboard,
  allowedRoles: ["creator"],
});
