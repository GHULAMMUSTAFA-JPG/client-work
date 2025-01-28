
"use client"
import { editProfileCall, handleFileUpload, login, updateProfileInformation } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignFilterModal from '@/components/campaignfiltermodal';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { defaultImagePath } from './constants';
interface EditProfileModalProps {
    userProfile: any
    user: any
    rendControl:boolean
    setRendControl:any
}
let arrayOfSkills: any[]
function EditProfileModalBuyer(props: EditProfileModalProps) {
        
    const {  setIsLoading } = useAuth()
    const { userProfile, user,rendControl,setRendControl } = props

    const [editUserProfileDto, setEditUserProfileDto] = useState<any>({})
    const [newSkill, setNewSkill] = useState<string>("")
    useEffect(() => {
        arrayOfSkills = userProfile?.Skills
        if (userProfile?._id) {
            const object = mapper()
            setEditUserProfileDto(object)
        }
    }, [userProfile])

    const mapper = () => {
        const object =
        {
            "email": userProfile?.Email,
            "first_name": userProfile?.First_Name,
            "last_name" : userProfile?.Last_Name,
            "company_name": userProfile?.Company_Name,
            "company_description": userProfile?.Company_Description,
            "company_logo": userProfile?.Company_Logo,
            "company_website" : userProfile?.Company_Website
        }
        return object
    }

    const deleteSkill = (index: number) => {
        arrayOfSkills?.splice(index, 1)
        setEditUserProfileDto((prev: any) => {
            return { ...prev, ["skills"]: arrayOfSkills }
        })
    }

    const addSkill = () => {
        if (newSkill == "") {
            toast.warn('Skill cannot be empty')
        }
        else {
            arrayOfSkills?.push(newSkill)
            setEditUserProfileDto((prev: any) => {
                return { ...prev, ["skills"]: arrayOfSkills }
            })
            setNewSkill('')
        }
    }

    const addValues = (e: any) => {
        setEditUserProfileDto((prev: any) => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
     editProfileCall(setIsLoading,editUserProfileDto, setRendControl, rendControl)
    }

    return (
        <>
            <div className="modal fade" id="editProfileModal" tabIndex={-1} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <form onSubmit={submitHandler}>
                            <div className="modal-header px-4">
                                <h1 className="modal-title fs-5" id="editProfileModalLabel">Edit Profile</h1>
                                <button type="button" id="close_modal_edit_pprofile" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        {/* Left Column */}
                                        <div className="mb-3">
                                            <label className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editUserProfileDto?.first_name}
                                                id="first_name"
                                                placeholder="John"
                                                onChange={addValues}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editUserProfileDto?.last_name}
                                                id="last_name"
                                                placeholder="Doe"
                                                onChange={addValues}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editUserProfileDto?.company_name}
                                                id="company_name"
                                                placeholder="Synnc"
                                                onChange={addValues}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Website</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editUserProfileDto?.company_website}
                                                id="company_website"
                                                placeholder="https://www.example.com"
                                                onChange={addValues}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                rows={4}
                                                id="company_description"
                                                value={editUserProfileDto?.company_description}
                                                placeholder="Enter your description"
                                                onChange={addValues}
                                            ></textarea>
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                        {/* Right Column */}
                                        <div className="mb-3">
                                            <label className="form-label">Company Logo</label>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <small className="text-muted">1:1 Ratio</small>
                                                <div className="vr"></div>
                                                <small className="text-muted">Max 10 MB</small>
                                            </div>
                                            <div className="border-dashed rounded-2 text-center bg-base size-box position-relative">
                                                <input type="file" className="d-none" id="company_logo" accept="image/*" onChange={async (e: any) => {
                                                    const result: any = await handleFileUpload(e,setIsLoading )
                                                  
                                                    if (result?.[0]) {
                                                        setEditUserProfileDto((prev: any) => {
                                                            return { ...prev, ['company_logo']: result[0]?.file_urls }
                                                        })
                                                    }
                                                    else {
                                                        toast.warn('Error uploading image. Please try again later')
                                                    }

                                                }} />
                                                <label htmlFor="company_logo" className="cursor-pointer">
                                                    <Image
                                                        src={editUserProfileDto?.company_logo || defaultImagePath}
                                                        alt="Current profile"
                                                        width={100}
                                                        height={100}
                                                    />
                                                    <Icon icon="ph:pencil-simple" className="position-absolute top-0 end-0 m-2 cursor" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" className="btn btn-info px-3"> Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileModalBuyer