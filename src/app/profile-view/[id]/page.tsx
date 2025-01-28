'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { defaultImagePath } from '@/components/constants';
import { useEffect, useState } from 'react';
import { getCreatorDetailsById } from '@/@api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export default function Index({ params }: any) {
    const { user, setIsLoading, isLoading } = useAuth()
    const [userProfile, setUserDetails] = useState<any>(null)
    const router = useRouter()
    const { id } = params;
    useEffect(() => {

        id && getCreatorDetailsById(id, setUserDetails, setIsLoading)
    }, [id])

    return (
        <div className="container">
            {userProfile ?
                <div className='row mt-3'>
                    <div className='col-md-8 mx-auto'>
                        {/* First profile container - Add onClick */}
                        <div className='profile-container mb-4 pb-3'
                            style={{ cursor: 'pointer' }}>
                            {/* Banner Image */}
                            <div className="position-relative">
                                <Image
                                    src={userProfile?.Banner_Image || defaultImagePath}
                                    alt="Profile Banner"
                                    className="object-fit-cover rounded-3 w-100 cover-img"
                                    width={1000}
                                    height={1000}
                                />
                            </div>

                            {/* Profile Section */}
                            <div className="p-3">
                                {/* Profile Image */}
                                <div className="position-relative" style={{ marginTop: '-75px' }}>
                                    <Image
                                        src={userProfile?.Profile_Image || defaultImagePath}
                                        alt="Profile Picture"
                                        width={150}
                                        height={150}
                                        className="rounded-circle border border-4 border-white"
                                    />
                                </div>
                                {/* Profile Info */}
                                <div className="mt-2">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <h5 id='name' className="mb-0">{userProfile?.Name}</h5>
                                        <img src={`https://flagcdn.com/24x18/${userProfile?.Country_Code || "us"}.png`} width={18} height={14} className="mx-1"></img>
                                        <a href={`https://www.linkedin.com/in/${userProfile?.Profile_URL}`} target="_blank"><Icon style={{ cursor: "pointer" }} icon="mdi:linkedin" width={19} height={19} className='text-info' /></a>
                                        {userProfile?.Audience_Interest !== "" && <button className='activated-subtle border btn-sm ms-1 px-2 py-1 rounded-pill text-info'>{userProfile?.Audience_Interest}</button>}
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <p className='mb-0 fs-12 text-warning'>@{userProfile?.Profile_URL}</p>
                                        <div className="bg-light rounded-circle d-inline-block" style={{ width: '6px', height: '6px' }}></div>
                                        <p className='mb-0 fs-12 text-warning'><span className="text-dark fw-medium">{userProfile?.No_of_Followers || 0}+</span> followers</p>
                                    </div>

                                    {/* <p className="mt-2">👋 Welcome to my partnership storefront!</p> */}

                                    <div className="mt-3">
                                        <p>{userProfile?.Description || ""}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 d-flex gap-3">
                                        <button className="btn btn-dark" onClick={() => {
                                            user?._id ? router.push(`/inbox?id=${id}`) : toast.warn('Please login to start chat')
                                        }}>
                                            DM for Custom Collaborations
                                        </button>
                                    </div>

                                    {/* Stats Section */}
                                    <div className="row mt-4 g-4">
                                        <div className="col-md-4">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <p className="text-muted">Total Followers</p>
                                                    <h5>{userProfile?.No_of_Followers}+</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <p className="text-muted">Average Impressions per post</p>
                                                    <h5>{userProfile?.Average_Impressions}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <p className="text-muted">Average Engagements per post</p>
                                                    <h5>{userProfile?.Average_Engagements}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second profile container - Add onClick */}
                        {userProfile?.Collaboration_Packages?.length > 0 && <div className={`profile-container ${!(userProfile?.Collaboration_Packages?.length > 0) ? 'empty-container' : ''}`}

                            style={{ cursor: 'pointer' }}>
                            {/* Collaboration Section */}
                            <div>
                                <h5>Let's Collaborate</h5>

                                {/* Collaboration Cards */}
                                <div className="mt-4">
                                    {

                                        userProfile?.Collaboration_Packages?.map((ele: any, index: number) => {
                                            return (
                                                <div className="card mb-3" key={index} >
                                                    <div className="card-body d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6>{ele?.Package_Name}</h6>
                                                            <p className="text-muted mb-0">
                                                                {ele?.Package_Description}
                                                            </p>
                                                        </div>
                                                        <div className='ms-5 text-end'>
                                                            <h6 className='text-muted'>${ele?.Package_Price}</h6>
                                                            <button id={ele?._id} className="btn btn-dark flex-shrink-0 btn-sm">Book Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )


                                        })
                                    }

                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                :
                <div style={isLoading ? { display: 'none' } : { display: 'block' }} >
                    No data found for given id
                </div>
            }
        </div>
    );
}
