'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { defaultImagePath } from '@/components/constants';
import { useEffect, useState } from 'react';
import { updateProfileInformation } from '@/@api';
interface editDtoProps {
    "email": string,
    "name": string,
    "profile_url": string,
    "profile_image": string,
    "banner_image": string,
    "description": string,
    "skills": [
      string
    ],
    "current_company": string,
    "audience_interest": string,
    "collaboration_packages": any
  }

  interface editFieldProps {
    "email": boolean,
    "name":boolean,
    "profile_url": boolean,
    "profile_image":boolean,
    "banner_image": boolean,
    "description": boolean,
    "skills": boolean,
    "current_company": boolean,
    "audience_interest": boolean,
    "collaboration_packages": boolean
  }
export default function ProfilePage() {
    const{user,userProfile, setIsLoading, rendControl, setRendControl} =  useAuth()
    const [editDetails ,  setEditDetails ] = useState<editDtoProps>(
        {
            "email": "",
            "name": "",
            "profile_url": "",
            "profile_image": "",
            "banner_image": "",
            "description": "",
            "skills": [
              ""
            ],
            "current_company": "",
            "audience_interest": "",
            "collaboration_packages": [
              {
                "package_name": "",
                "package_description": "",
                "package_price": 0
              }
            ]
          }
    )


        const [editField, setEditField] = useState<editFieldProps>({
            "email": false,
            "name":false,
            "profile_url": false,
            "profile_image":false,
            "banner_image": false,
            "description": false,
            "skills": false,
            "current_company": false,
            "audience_interest": false,
            "collaboration_packages": false
          
        })


    useEffect(()=>{
        let collabPack:any = []
      userProfile?.Collaboration_Packages?.map((element:any)=>{
        const entry  = { 
            "package_name": element?.Package_Name,
            "package_description": element?.Package_Description,
            "package_price": element?.Package_Price
        }
        collabPack?.push(entry)
        })
        userProfile?._id && setEditDetails({
            "email": userProfile?.Email,
            "name": userProfile?.Name,
            "profile_url": userProfile?.Profile_URL,
            "profile_image": userProfile?.Profile_Image,
            "banner_image": userProfile?.Banner_Image,
            "description": userProfile?.Description,
            "skills": userProfile?.Skills,
            "current_company": userProfile?.Current_Company,
            "audience_interest":userProfile?.Audience_Interest,
            "collaboration_packages" : collabPack
        })

    },[userProfile])


const changeHandler = async (e:any) =>{
    setEditDetails((prev:any)=>{
        return{...prev,[e.target.id] : e.target.value}
    })
   
}


const editFieldHandler = async (e:any)=>{
    setEditField((prev:any)=>{
        return{...prev, [e.target.id] : true}
    })
}

const updateProfile = async () =>{
    updateProfileInformation(editDetails,setIsLoading,rendControl, setRendControl)
}

    return (
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <div className='profile-container mb-4 pb-3'>
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
                                 {editField?.name ? <input type='text' value={editDetails?.name} id='name' onChange={changeHandler} /> :  <h5 id='name' onClick={editFieldHandler} className="mb-0">{userProfile?.Name }</h5>}
                                    <img src={`https://flagcdn.com/24x18/${userProfile?.Country_Code || "us"}.png`} width={18} height={14} className="mx-1"></img>
                                    <a href={`https://www.linkedin.com/in/${userProfile?.Profile_URL}`} target="_blank"><Icon style={{ cursor: "pointer" }} icon="mdi:linkedin" width={19} height={19} className='text-info' /></a>
                                  {  <button className='activated-subtle border btn-sm ms-1 px-2 py-1 rounded-pill text-info'>{userProfile?.Audience_Interest}</button>}
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
                                    <button className="btn btn-dark" onClick={updateProfile} >
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
                    {/* LinkedIn Section */}
                    {/* <div className='profile-container mb-4'>
                        <div>
                            <div className="d-flex align-items-center gap-2">
                                <Icon icon="logos:linkedin-icon" width="24" height="24" />
                                <h5 className="mb-0">Josh Aharonoff's LinkedIn</h5>
                                <svg className="ms-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </div>
                            <p className="text-muted mt-2">LinkedIn is my largest platform with 400k+ followers and counting.</p>

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="text-muted mb-1">Followers</p>
                                            <h5 className="mb-0">408k</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="text-muted mb-1">Audience</p>
                                            <h5 className="mb-0">Finance, Accounting, Startups, HR</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='profile-container'>
                        {/* Collaboration Section */}
                        <div>
                            <h5>Let's Collaborate</h5>

                            {/* Collaboration Cards */}
                            <div className="mt-4">
                                {
                                    userProfile?.Collaboration_Packages?.map((ele:any, index:number)=>{
                                        return(
                                            <div className="card mb-3" key={index}>
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6>{ele?.Package_Name}</h6>
                                                    <p className="text-muted mb-0">
                                                        {ele?.Package_Description}
                                                    </p>
                                                </div>
                                                <button id={ele?._id} className="btn btn-dark flex-shrink-0 ms-5 btn-sm">Book Now</button>
                                            </div>
                                        </div>
                                        )
                                      
                                    })
                                }
                              

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
