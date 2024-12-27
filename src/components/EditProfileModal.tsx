
"use client"
import { login, updateProfileInformation } from '@/@api';
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
interface EditProfileModalProps {
    userProfile: any
    user : any
}
let arrayOfSkills: any[]
function EditProfileModal(props: EditProfileModalProps) {
    const {rendControl,setRendControl} = useAuth()
    const { userProfile,user } = props
   
    const [editUserProfileDto, setEditUserProfileDto] = useState<any>({})
    const [newSkill, setNewSkill] = useState<string>("")
    useEffect(() => {

        arrayOfSkills = userProfile?.Skills
        if(userProfile?.Email){
            const object = mapper()
            setEditUserProfileDto(object)
        }
    }, [userProfile])


    const mapper = () =>{
       const object = 
       { 
        "email": userProfile?.Email,
        "name": userProfile?.Name,
        "profile_url": userProfile?.Profile_URL,
        "profile_image": userProfile?.Profile_Image,
        "description": userProfile?.Description,
        "skills": userProfile?.Skills
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
        if(newSkill == "" ){
            toast.warn('Skill cannot be empty')
        }
        else{
            arrayOfSkills?.push(newSkill)
            setEditUserProfileDto((prev: any) => {
                return { ...prev, ["skills"]: arrayOfSkills }
            })
            setNewSkill('')
        }  
    }
    
    const addValues = (e:any) =>{
        setEditUserProfileDto((prev: any) => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    return (
        <>
            <div className="modal fade" id="editProfileModal" tabIndex={-1} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="editProfileModalLabel">Edit Profile</h1>
                            <button type="button" id="close_modal_edit_profile" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    {/* Left Column */}
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editUserProfileDto?.name}
                                            id="name"
                                            placeholder="Enter your full name"
                                            onChange={addValues}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">LinkedIn Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editUserProfileDto?.profile_url}
                                            id="profile_url"
                                            placeholder="Enter your Headline"
                                            onChange={addValues}

                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            id="description"
                                            value={editUserProfileDto?.description}
                                            placeholder="Enter your description"
                                            onChange={addValues}
                                           ></textarea>
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    {/* Right Column */}
                                    <div className="mb-3">
                                        <label className="form-label">Profile Picture</label>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <small className="text-muted">1:1 Ratio</small>
                                            <div className="vr"></div>
                                            <small className="text-muted">Max 10 MB</small>
                                        </div>
                                        <div className="border-dashed rounded-2 text-center bg-base size-box position-relative">
                                            <input type="file" className="d-none" id="profileImage" accept="image/*" />
                                            <label htmlFor="profileImage" className="cursor-pointer">
                                                <Image
                                                    src={editUserProfileDto?.profile_image}
                                                    alt="Current profile"
                                                    width={100}
                                                    height={100}
                                                />
                                                <Icon icon="ph:pencil-simple" className="position-absolute top-0 end-0 m-2 cursor" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Skills & Expertise</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Add a new skill"
                                                value={newSkill}
                                                onChange={(e: any) => {
                                                    setNewSkill(e.target.value)
                                                }}
                                            />
                                            <button className="btn btn-info" type="button" onClick={() => {
                                                addSkill()
                                            }}>Add</button>
                                        </div>
                                        <div className="d-flex gap-2 flex-wrap mb-2">
                                            {editUserProfileDto?.skills?.map((skill: string, index: number) => {
                                                return (
                                                    <span className="badge bg-success text-secondary rounded-pill fw-light border border-transparent">
                                                        {skill}
                                                        <i className="bi bi-x ms-1 cursor" onClick={() => {
                                                            deleteSkill(index)
                                                        }}></i>
                                                    </span>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal">Discard</button>
                            <button type="button" className="btn btn-info px-3" onClick={async()=>{
                                  const result = await updateProfileInformation(user?.email , editUserProfileDto)
                                  if(result){
                                    const closeButton:any = document.getElementById('close_modal_edit_profile')
                                    closeButton && closeButton.click()
                                    setRendControl(!rendControl)
                                  }
                              }}> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileModal