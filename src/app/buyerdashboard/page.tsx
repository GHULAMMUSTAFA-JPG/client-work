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
    const { user } = useAuth()
    const [campaigns, setCampaigns] = useState(true)
    const [campaignList, setCampaignList] = useState<any[]>([])
    const [selectedCampaign, setSelectedCampaign] = useState<any>()
    const [selectedCampaignDetails, setSelectedCampaignDetails] = useState<any>()
    useEffect(() => {
        getCampaignsList(user?.email, setCampaignList)
    }, [])

    useEffect(()=>{
        getSelectedCampaignsDetails(selectedCampaign?._id,setSelectedCampaignDetails)
        console.log(selectedCampaign)
    },[selectedCampaign])

    return (
        <>
            {
                campaigns ?
                 <CampaignTable campaignList={campaignList} setCampaigns={setCampaigns} setSelectedCampaign={setSelectedCampaign} />
                    :

                    <div>
                        <CampaignOverview setCampaigns={setCampaigns} selectedCampaignDetails={selectedCampaignDetails} />
                    </div>
            }
            <CampaignOffcanvasBuyer />
            <CampaignReviewModal />
            <OffcanvasCreateCompaign />
        </>
    )
}
export default buyerdashboard
