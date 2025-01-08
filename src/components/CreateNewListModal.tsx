
"use client"
import { createListName, login, updateListName } from '@/@api';
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
interface CreateNewListModalProps {
    data?: any
    rendControl: boolean
    setRendControl: any
}
function CreateNewListModal(props: CreateNewListModalProps) {
    const { data, rendControl, setRendControl } = props
    const { user, setIsLoading } = useAuth()
    const [listName, setListName] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(true)
    const listItemAction = () => {
        if (data) {
            updateListName({
                "List_Id": data?._id,
                "List_Name": listName
            },
                rendControl, setRendControl, setListName ,setIsLoading
            )
        }
        else {
            createListName({
                "Email": user?.email,
                "List_Name": listName,

            },
                rendControl,
                setRendControl,setListName,setIsLoading)
        }
    }

    useEffect(() => {
        data ? setListName(data?.List_Name) : setListName('')
    }, [data])
    return (
        <>
            <div className="modal fade" id="createNewListModal" tabIndex={-1} aria-labelledby="createNewListModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="createNewListModalLabel">{data ? "Edit List Item" : "Create New List"}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="createNewlistmodalClose"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <label className="form-label">List Name</label>
                                    <input
                                        type="text"
                                        className={`form-control mb-2 `}
                                        placeholder="Enter list name"
                                        value={listName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = e.target.value;
                                            if (value.length <= 50) {
                                                setListName(value);
                                                setIsValid(true)
                                            } else {
                                                setIsValid(false)
                                            }
                                        }}
                                    />
                                    {data ? "" : <div className="form-text">
                                        Create a descriptive name for your list to help organize your creators. For example: "Tech Influencers", "Fashion Bloggers", etc.
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal" onClick={()=>{
                                setListName('')
                            }}>Cancel</button>
                            <button type="button" className="btn btn-info px-3" onClick={() => {
                                listItemAction()
                            }}>{data ? "Update" : "Create"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateNewListModal   