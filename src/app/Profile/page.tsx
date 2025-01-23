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
    "name": boolean,
    "profile_url": boolean,
    "profile_image": boolean,
    "banner_image": boolean,
    "description": boolean,
    "skills": boolean,
    "current_company": boolean,
    "audience_interest": boolean,
    "collaboration_packages": boolean
}
export default function ProfilePage() {
    const { user, userProfile, setIsLoading, rendControl, setRendControl } = useAuth()
    const [editDetails, setEditDetails] = useState<editDtoProps>(
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
        "name": false,
        "profile_url": false,
        "profile_image": false,
        "banner_image": false,
        "description": false,
        "skills": false,
        "current_company": false,
        "audience_interest": false,
        "collaboration_packages": false

    })

    // Add new state for active section
    const [activeSection, setActiveSection] = useState<'about' | 'collaboration' | null>('about');

    // Add new state for sidebar visibility
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        let collabPack: any = []
        userProfile?.Collaboration_Packages?.map((element: any) => {
            const entry = {
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
            "audience_interest": userProfile?.Audience_Interest,
            "collaboration_packages": collabPack
        })

    }, [userProfile])


    const changeHandler = async (e: any) => {
        setEditDetails((prev: any) => {
            return { ...prev, [e.target.id]: e.target.value }
        })

    }


    const editFieldHandler = async (e: any) => {
        setEditField((prev: any) => {
            return { ...prev, [e.target.id]: true }
        })
    }

    const updateProfile = async () => {
        updateProfileInformation(editDetails, setIsLoading, rendControl, setRendControl)
    }

    // Add click handlers for the profile containers
    const handleSectionClick = (section: 'about' | 'collaboration') => {
        setActiveSection(section);
        setShowSidebar(true);
    };

    // Add handler for cancel button
    const handleCancel = () => {
        setShowSidebar(false);
    };

    return (
        <div className="container">
            <div className='row mt-3'>
                <div className='col-md-8 mx-auto'>
                    {/* First profile container - Add onClick */}
                    <div className='profile-container mb-4 pb-3' 
                         onClick={() => handleSectionClick('about')} 
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
                                    {editField?.name ? <input type='text' value={editDetails?.name} id='name' onChange={changeHandler} /> : <h5 id='name' onClick={editFieldHandler} className="mb-0">{userProfile?.Name}</h5>}
                                    <img src={`https://flagcdn.com/24x18/${userProfile?.Country_Code || "us"}.png`} width={18} height={14} className="mx-1"></img>
                                    <a href={`https://www.linkedin.com/in/${userProfile?.Profile_URL}`} target="_blank"><Icon style={{ cursor: "pointer" }} icon="mdi:linkedin" width={19} height={19} className='text-info' /></a>
                                    {<button className='activated-subtle border btn-sm ms-1 px-2 py-1 rounded-pill text-info'>{userProfile?.Audience_Interest}</button>}
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

                    {/* Second profile container - Add onClick */}
                    <div className='profile-container'
                         onClick={() => handleSectionClick('collaboration')}
                         style={{ cursor: 'pointer' }}>
                        {/* Collaboration Section */}
                        <div>
                            <h5>Let's Collaborate</h5>

                            {/* Collaboration Cards */}
                            <div className="mt-4">
                                {
                                    userProfile?.Collaboration_Packages?.map((ele: any, index: number) => {
                                        return (
                                            <div className="card mb-3" key={index}>
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
                    </div>
                </div>
                <div className={`col-md-4 ${showSidebar ? '' : 'd-none'}`}>
                    <div className='profile-sidebar-wraper'>
                        {/* First edit section */}
                        <div className={`profile-container mb-3 ${activeSection === 'about' ? '' : 'd-none'}`}>
                            <div className="d-flex justify-content-between mb-3 pt-2">
                                <h6 className="mb-0 ">Edit Section</h6>
                                <div>
                                    <button className="bg-white border btn btn-sm" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-dark btn-sm ms-3">Save</button>
                                </div>
                            </div>

                            <div className='pb-2 '>
                                <h6 className="mb-3">About me</h6>

                                <div className="mb-4">
                                    <label className="mb-2">Banner image</label>
                                    <div className="position-relative">
                                        <Image
                                            src={editDetails.banner_image || defaultImagePath}
                                            alt="Banner"
                                            width={500}
                                            height={100}
                                            className="w-100 rounded-3 mb-2"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="text-muted">Choose a photo</span>
                                            <Icon icon="material-symbols:delete-outline" className="cursor-pointer" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Profile photo</label>
                                    <div className="position-relative">
                                        <Image
                                            src={editDetails.profile_image || defaultImagePath}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="rounded-circle mb-2"
                                        />
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="text-muted">Choose a photo</span>
                                            <Icon icon="material-symbols:delete-outline" className="cursor-pointer" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2">Name*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editDetails.name}
                                        onChange={changeHandler}
                                        id="name"
                                        placeholder='John Doe'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2">Linkedin Username*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editDetails.profile_url}
                                        onChange={changeHandler}
                                        id="profile_url"
                                        placeholder='john-doe'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2">Current Company*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editDetails.current_company}
                                        onChange={changeHandler}
                                        id="current_company"
                                        placeholder='Synnc'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2">Audience Interest*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editDetails.audience_interest}
                                        onChange={changeHandler}
                                        id="audience_interest"
                                        placeholder='Finance, Accounting, Startups, HR'
                                    />
                                </div>

                                <div>
                                    <label className="mb-2">Description of you*</label>
                                    <small className="d-block text-muted mb-2">Welcome brands and introduce yourself</small>
                                    <textarea
                                        className="form-control"
                                        rows={10}
                                        value={editDetails.description}
                                        onChange={changeHandler}
                                        id="description"
                                        placeholder="Welcome to my profile! I use this to collaborate with great brands and other creators..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Second edit section */}
                        <div className={`profile-container ${activeSection === 'collaboration' ? '' : 'd-none'}`}>
                            <div className="d-flex justify-content-between mb-3 pt-2">
                                <h6 className="mb-0 ">Edit Section</h6>
                                <div>
                                    <button className="bg-white border btn btn-sm" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-dark btn-sm ms-3">Save</button>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className='pb-2 main-box'>
                                <h6 className="mb-1">Let's Collaborate</h6>
                                <p className='text-muted'>Add your collaboration packages here</p>
                                {/* Stats Section */}
                                <div className="mb-4">
                                    <div className="card mb-3">
                                        {/* <div className="card-header bg-white">
                                        <h6 className="mb-0">Package</h6>
                                    </div> */}
                                        <div className="card-body">
                                            {/* Card 1 */}
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h6 className="mb-0">Card 1</h6>
                                                    <Icon icon="material-symbols:delete-outline" className="cursor-pointer" />
                                                </div>

                                                {/* Title */}
                                                <div className="mb-3">
                                                    <label className="mb-2">Title</label>
                                                    <input type="text" className="form-control" placeholder="1x Sponsored Post" />
                                                </div>



                                                {/* Description */}
                                                <div className="mb-3">
                                                    <label className="mb-2">Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={5}
                                                        onChange={changeHandler}
                                                        id="description"
                                                        placeholder="I'll create a LinkedIn post to educate my audience on the benefits of your company's offerings, or for anything else you're interested in promoting, like an upcoming event."
                                                    />
                                                </div>

                                                {/* Price */}
                                                <div>
                                                    <label className="mb-2">Price</label>
                                                    <input type="text" className="form-control" placeholder="$ 100" />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <button className="btn btn-outline-dark w-100">+ Add Card</button>
                                </div>

                                <button className="btn btn-outline-danger w-100 mt-auto">Delete Block</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
