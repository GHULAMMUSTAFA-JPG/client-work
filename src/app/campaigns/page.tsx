"use client"
import { getCampaignsCreatorsOverview, login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignOffcanvas from '@/components/campaignoffcanvas';
import { useRouter } from 'next/navigation';
import CampaignFilterModal from '@/components/campaignfiltermodal';
import { useAuth } from '@/contexts/AuthContext';
function Campaigns() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<any>()
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
    const { user } = useAuth()
    const handleRowClick = (e:any) => {
        console.log(e.target.id)
        router.push(`/SubmitCampaigns?id=${e.target.id}`);
    };

    useEffect(() => {
        user?.email &&    getCampaignsCreatorsOverview(user?.email, setCampaigns)
    }, [user])

    useEffect(() => {
        console.log(campaigns, "campaigns")
    }, [campaigns])

    return (
        <>
            <section className='dashboard'>
                <div className='container-fluid'>
                    {/* <TopCard /> */}
                    <div className='row my-3'>
                        <div className='col-12'>
                            {/* <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Compaigns</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Accepted Campaigns</button>
                                </li>
                            </ul> */}
                            {/* <hr /> */}
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <div className="tab-content " id="myTabContent">
                                        <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="true" aria-controls="flush-collapseThree">
                                                        Active Campaigns ({campaigns?.Activated_Campaigns?.length || 0})
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseThree" className="accordion-collapse show" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    {campaigns?.Activated_Campaigns?.map((camp: any, index: number) => {
                                                                        return (

                                                                            <tr key={index} onClick={()=>{
                                                                                setSelectedCampaign(camp)
                                                                            }}>
                                                                                <td>
                                                                                    <p className='mb-0'>{camp?.Created_At}</p>
                                                                                    <p className='fs-12 text-warning mb-0'>{camp?.Time_Ago}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <a id={(camp?._id)} onClick={handleRowClick} className='fw-medium cursor'>{camp?.Headline}</a>
                                                                                </td>

                                                                                <td>
                                                                                    <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning cursor' data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            Submitted Campaigns ({ campaigns?.Submitted_Campaigns?.length || 0})
                                                        </button>
                                                    </h2>
                                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            <table className="table align-middle table-hover">
                                                                <tbody>
                                                                    {
                                                                        campaigns?.Submitted_Campaigns?.map((camp: any, index: number) => {
                                                                            return (
                                                                                <tr onClick={()=>{
                                                                                    setSelectedCampaign(camp)
                                                                                }} key={index} 
                                                                                // data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" 
                                                                                className='cursor'>
                                                                                    <td>
                                                                                        <p className='mb-0'>{camp?.Created_At}</p>
                                                                                        <p className='fs-12 text-warning mb-0'>{camp?.Time_Ago}</p>
                                                                                    </td>
                                                                                    <td>
                                                                                        <a  className='fw-medium'>{camp?.Headline}</a>
                                                                                    </td>
                                                                                    {/* <td>
                                                                            <p className='mb-0'>General Profile</p>
                                                                        </td> */}
                                                                                    <td>
                                                                                        <Icon icon="solar:eye-outline" width={24} height={24} className='text-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                                                                    </td>
                                                                                </tr>
                                                                            )

                                                                        })
                                                                    }


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <CampaignOffcanvas />
            <CampaignFilterModal selectedCampaign={selectedCampaign} />
        </>
    );
}

export default Campaigns