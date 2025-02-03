"use client";

import { addCreatorInList, deleteListItem, fetch_dashboard_data, fetchBuyerActiveCampaigns, fetchBuyerDiscoveryData, getSavedList, getSpecificCreatorList, inviteCreatorCall } from "@/@api";
import CreateNewListModal from "@/components/CreateNewListModal";
import TopCardBuyer from "@/components/TopCardBuyer";
import ViewCreatorsModal from "@/components/ViewCreatorsModal";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";

function mycreatorsbuyer() {
    const { user, setIsLoading, userProfile, setIsActive } = useAuth()
    const [users, setUsers] = useState<any[]>([]);
    const [buyersDetails, setBuyerDetails] = useState<any>()
    const [buyerList, setBuyerList] = useState<any>()
    const [selectedId, setSelectedId] = useState<string>('')
    const [selectedIdCreators, setSelectedIdCreators] = useState<any>()
    const [selectedList, setSelectedList] = useState<any>()
    const[activeCampaigns, setActiveCampaign] = useState<any>()
    const [rendControl, setRendControl] = useState<boolean>(false)
    const [rendControls, setRendControls] = useState<boolean>(false)
    // const router = useRouter()
    useEffect(() => {
        fetchData()
        setIsActive(1)
    }, [])

    const fetchActiveCampaign = async ()=>{
        fetchBuyerActiveCampaigns(user?.email,setActiveCampaign,setIsLoading)
    } 
   
    useEffect(() => {
        if(user?.email){
            fetchBuyerDiscoveryData(user?.email, setBuyerDetails, setIsLoading)
            getSavedList(user?.email, setBuyerList, setIsLoading)
            fetchActiveCampaign()
        }
    }, [user?.email,rendControl])

    useEffect(() => {
        selectedId !== "" && getSpecificCreatorList(selectedId, setSelectedIdCreators, setIsLoading)
    }, [selectedId, rendControl])


    useEffect(()=>{
        console.log(activeCampaigns,"activeCampaigns")
    },[activeCampaigns])


    const fetchData = async () => {
        const response:any = await fetch_dashboard_data()
        // console.log(response.data)
        setUsers(response.data?.users)
    }

    const addToCreatorList = async (list: any, user: any) => {
        const dto = {
            "List_Id": list?._id,
            "Creator_Id": user?._id
        }
        addCreatorInList(dto, rendControl, setRendControl)
    }
    const actionFunction = async (action: string, list: any) => {

        if (action == "edit") {
            setSelectedList(list)
        }
        else {
            deleteListItem(list, rendControl, setRendControl)
        }
    }

    const inviteCreator = async (selectedCampaign:any,user:any) =>{
    const response =    await inviteCreatorCall({
        "campaign_id": selectedCampaign?._id,
        "creator_id": user?._id
      },setIsLoading
      )
       console.log(response)
    }


    return (
        <>
            <div className="container-fluid">
                {/* <TopCardBuyer /> */}
                <div className="row mb-3">
                    <div className="col-12">
                        {/* <div className="d-flex justify-content-between align-items-end"> */}
                        {/* <p className="mb-0 fw-medium fs-16">My Company</p> */}
                        {/* <button className="btn btn-info btn-sm ms-auto">Add Campaign</button> */}
                        {/* <div className="dropdown ms-3">
                                <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Export
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Export as xlxs</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Export as pdf</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Export as docs</a></li>
                                </ul>
                            </div> */}
                        {/* </div> */}
                        <ul className="nav nav-underline mb-3 border-bottom" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Internal Company Creators</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">External Global Creators</button>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" type="button" role="tab" aria-controls="settings-tab-pane" aria-selected="false">Draft Campaigns</button>
                                </li> */}
                            <li className='nav-item' role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">My List </button>
                            </li>
                        </ul>
                        {/* <hr className="" /> */}
                        <div className='row'>
                            <div className='col-12 mb-2'>
                                <div className="tab-content " id="myTabContent">
                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                        <div className="card">
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                    <table className="table align-middle text-center mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="text-start ps-4">Creators</th>
                                                                <th scope="col">Social Platform</th>
                                                                <th scope="col">Company</th>
                                                                <th scope="col">Followers</th>
                                                                <th scope="col">Impressions</th>
                                                                <th scope="col">Average Impressions</th>
                                                                <th scope="col">Engagements</th>
                                                                <th scope="col">Average Engagements</th>
                                                                <th scope="col">Actions</th>
                                                                {/* <th scope="col">Social Media Value</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {buyersDetails?.Internal_Creators?.length !== 0 && buyersDetails?.Internal_Creators?.map((user: any) => 
                                                              
                                                         
                                                                (
                                                               
                                                                <tr key={user?._id}>
                                                                    <td className="text-start ps-4">
                                                                        <div className="d-flex align-items-center">
                                                                            <Image src={user?.Profile_Image || defaultImagePath} alt={user?.Name} width={30} height={30} className="user-img img-fluid" />
                                                                            <span className="ms-2 text-truncate">{user?.Name}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                                                            <span className="ms-2">@{user?.Profile_URL || ''}</span>
                                                                        </div>
                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                            <Icon icon="mdi:linkedin" width={22} height={22} className="text-info" />

                                                                            <span className="ms-2 text-truncate"> {user?.Username}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Current_Company}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.No_of_Followers?.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Followers.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.No_of_Impressions?.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Average_Impressions}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                        <p className="mb-2">{user?.No_of_Engagements?.toLocaleString()}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Average_Engagements?.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td className="drop-down-table">
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-info btn-sm dropdown-toggle rounded-pill px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <Icon icon="material-symbols:add" /> <span className="fs-12">ADD TO</span>
                                                                            </button>
                                                                            <ul className="dropdown-menu p-2 dropdown-menu-end position-fixed" style={{width: "400px", maxHeight: "300px", overflowY: "auto", top: "20%", left: "50%", transform: "translateX(-50%)"}}>
                                                                                <div className="mb-3">
                                                                                    <p className="text-muted mb-2 fw-medium ">Campaigns</p>
                                                                                    {
                                                                                        activeCampaigns?.campaigns?.map((campaingElement:any, indexNum:number)=>{
                                                                                            return(
                                                                                                <div key={indexNum} className="d-flex align-items-center mb-2 ms-2">
                                                                                                <span className="d-flex align-items-center fs-12 text-truncate" style={{maxWidth: "300px"}}>
                                                                                                    <Icon icon="tabler:target" className="me-2 flex-shrink-0" />
                                                                                                  {campaingElement?.Headline}
                                                                                                </span>
                                                                                                <button className="btn btn-sm btn-outline-secondary  ms-auto flex-shrink-0" onClick={()=>{
                                                                                                    inviteCreator(campaingElement,user)
                                                                                                }}>Add</button>
                                                                                            </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                               
                                                                                   
                                                                                </div>

                                                                                <div>
                                                                                    <p className="text-muted mb-2 fw-medium">Lists</p>
                                                                                    {buyerList?.map((item: any, index: number) => (
                                                                                        <div key={index} className="d-flex justify-content-between align-items-center mb-2 ms-2">
                                                                                            <span className="d-flex align-items-center fs-12 text-truncate" style={{maxWidth: "300px"}}>
                                                                                                <Icon icon="tabler:target" className="me-2 flex-shrink-0" />
                                                                                                {item?.List_Name}
                                                                                            </span>
                                                                                            <button 
                                                                                                className="btn btn-sm btn-outline-secondary"
                                                                                                onClick={() => addToCreatorList(item, user)}
                                                                                            >
                                                                                                Add
                                                                                            </button>
                                                                                        </div>
                                                                                    ))}
                                                                                    
                                                                                    <div className="border-top mt-2 pt-2">
                                                                                        <a 
                                                                                            className="dropdown-item p-1 d-flex align-items-center" 
                                                                                            data-bs-toggle="modal" 
                                                                                            data-bs-target="#createNewListModal"
                                                                                        >
                                                                                            <Icon icon="ri:add-fill" className="me-2" />
                                                                                            Create New List
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                            
                                                        )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                        <div className="card">
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                    <table className="table align-middle text-center mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="text-start ps-4">Creators</th>
                                                                <th scope="col">Social Platform</th>
                                                                <th scope="col">Company </th>
                                                                <th scope="col">Followers</th>
                                                                <th scope="col">Impressions</th>
                                                                <th scope="col">Average Impressions</th>
                                                                <th scope="col">Engagements</th>
                                                                <th scope="col">Average Engagements</th>
                                                                <th scope="col">Actions</th>
                                                                {/* <th scope="col">Social Media Value</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {buyersDetails?.External_Creators?.length !== 0 && buyersDetails?.External_Creators?.map((user: any) => (
                                                                <tr key={user?._id}>
                                                                    <td className="text-start ps-4">
                                                                        <div className="d-flex align-items-center">
                                                                            <Image src={user?.Profile_Image ? user?.Profile_Image : defaultImagePath} alt={user?.Name} width={30} height={30} className="user-img img-fluid" />
                                                                            <span className="ms-2 text-truncate">{user?.Name}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                                                            <span className="ms-2">@{user?.Profile_URL}</span>
                                                                        </div>
                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                            <Icon icon="mdi:linkedin" width={22} height={22} className="text-info" />

                                                                            <span className="ms-2 text-truncate"> {user?.Username}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Current_Company}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.No_of_Followers?.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Followers.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.No_of_Impressions?.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Average_Impressions}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                        <p className="mb-2">{user?.No_of_Engagements?.toLocaleString()}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Average_Engagements?.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td className="drop-down-table">
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-info btn-sm dropdown-toggle rounded-pill px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <Icon icon="material-symbols:add" /> <span className="fs-12">ADD TO</span>
                                                                            </button>
                                                                            <ul className="dropdown-menu p-2" style={{width: "400px", maxHeight: "300px", overflowY: "auto"}}>
                                                                                <div className="mb-3">
                                                                                    <p className="text-muted mb-2 fw-medium">Campaigns</p>
                                                                                    {
                                                                                        activeCampaigns?.campaigns?.map((campaingElement:any, indexNum:number)=>{
                                                                                            return(
                                                                                                <div key={indexNum} className="d-flex align-items-center mb-2 ms-2">
                                                                                                <span className="d-flex align-items-center fs-12 text-truncate" style={{maxWidth: "300px"}}>
                                                                                                    <Icon icon="tabler:target" className="me-2 flex-shrink-0" />
                                                                                                  {campaingElement?.Headline}
                                                                                                </span>
                                                                                                <button className="btn btn-sm btn-outline-secondary  ms-auto flex-shrink-0" onClick={()=>{
                                                                                                    inviteCreator(campaingElement,user)
                                                                                                }}>Add</button>
                                                                                            </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                   
                                                                                </div>

                                                                                <div>
                                                                                    <p className="text-muted mb-2 fw-medium">Lists</p>
                                                                                    {buyerList?.map((item: any, index: number) => (
                                                                                        <div key={index} className="d-flex justify-content-between align-items-center mb-2 ms-2">
                                                                                            <span className="d-flex align-items-center fs-12 text-truncate" style={{maxWidth: "300px"}}>
                                                                                                <Icon icon="tabler:target" className="me-2 flex-shrink-0" />
                                                                                                {item?.List_Name}
                                                                                            </span>
                                                                                            <button 
                                                                                                className="btn btn-sm btn-outline-secondary"
                                                                                                onClick={() => addToCreatorList(item, user)}
                                                                                            >
                                                                                                Add
                                                                                            </button>
                                                                                        </div>
                                                                                    ))}
                                                                                    
                                                                                    <div className="border-top mt-2 pt-2">
                                                                                        <a 
                                                                                            className="dropdown-item p-1 d-flex align-items-center" 
                                                                                            data-bs-toggle="modal" 
                                                                                            data-bs-target="#createNewListModal"
                                                                                        >
                                                                                            <Icon icon="ri:add-fill" className="me-2" />
                                                                                            Create New List
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-12 mb-2 text-end">
                                                <button type="button" className="btn btn-info btn-sm me-1" data-bs-toggle="modal" data-bs-target="#createNewListModal" onClick={() => {
                                                    setSelectedList(undefined)
                                                }}><Icon icon="ri:add-fill" onClick={() => {
                                                    setSelectedList(undefined)
                                                }} /> Create New List</button>
                                            </div>
                                            {
                                                buyerList?.map((entry: any, index: number) => {
                                                    return (
                                                        <div key={index} className='col-md-4 col-xl-3'>
                                                            <div className='card'>
                                                                <div className='card-body'>
                                                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                                                        <p className='mb-0 fw-medium'>{entry?.List_Name && entry?.List_Name?.length > 100  ? entry?.List_Name?.slice(0,100) + '...' : entry?.List_Name }</p>
                                                                        <div>
                                                                            <span data-bs-toggle="modal" data-bs-target="#createNewListModal" className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 me-2 cursor" title="Edit" onClick={() => {
                                                                                actionFunction('edit', entry)
                                                                            }}>
                                                                                <Icon icon="heroicons:pencil-square" width={16} height={16} className="text-info" />
                                                                            </span>
                                                                            <span onClick={() => {
                                                                                actionFunction('delete', entry?._id)
                                                                            }} className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 cursor" title="Delete">
                                                                                <Icon icon="heroicons:trash" width={16} height={16} className="text-danger" />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <button type="button" className="btn btn-outline-info btn-sm w-100 rounded-pill" data-bs-toggle="modal" data-bs-target="#viewCreatorsModal" onClick={() => {
                                                                        setSelectedId(entry?._id)
                                                                    }}>View</button>
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
                        </div>
                    </div>
                </div>
            </div>
            <CreateNewListModal data={selectedList} setRendControl={setRendControl} rendControl={rendControl} />
            <ViewCreatorsModal data={selectedIdCreators} rendControl={rendControl} setRendControl={setRendControl} />
        </>
    );
}

export default (mycreatorsbuyer);