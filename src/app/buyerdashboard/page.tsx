"use client"

import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import TopCardBuyer from '@/components/TopCardBuyer';
import CampaignOffcanvasBuyer from '@/components/campaignoffcanvasbuyer';
import CampaignReviewModal from '@/components/campaignreviewmodal';
import OffcanvasCreateCompaign from '@/components/offcanvascreatecompaign';
import CampaignOverview from '../CampaignReview/page';
import { useAuth } from '@/contexts/AuthContext';
import { getCampaignsList, getSelectedCampaignsDetails } from '@/@api';
import CampaignTable from '@/components/CampaignTable';

function buyerdashboard() {
    const { user, setIsLoading } = useAuth()
    const [campaigns, setCampaigns] = useState(true)
    const [campaignList, setCampaignList] = useState<any[]>([])
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
    const [selectedCampaignDetails, setSelectedCampaignDetails] = useState<any>()
    const [rendControl, setRendControl] = useState<boolean>(false)
    useEffect(() => {
        getCampaignsList(user?.email, setCampaignList,setIsLoading)
    }, [rendControl])

    useEffect(()=>{
        selectedCampaign &&  getSelectedCampaignsDetails(selectedCampaign?._id,setSelectedCampaignDetails, setIsLoading)
    },[selectedCampaign])

    return (
        <>
            {
                campaigns ?
                 <CampaignTable rendControl={rendControl} setRendControl={setRendControl} campaignList={campaignList} setCampaigns={setCampaigns} setSelectedCampaign={setSelectedCampaign} setSelectedCampaignDetails={setSelectedCampaignDetails} />
                    :

                    <div>
                        <CampaignOverview setCampaigns={setCampaigns} selectedCampaignDetails={selectedCampaignDetails} />
                    </div>
            }
            <CampaignOffcanvasBuyer />
            <CampaignReviewModal />
            <OffcanvasCreateCompaign data={selectedCampaignDetails} setRendControl={setRendControl} rendControl={rendControl} />
        </>
    )
}
export default buyerdashboard
