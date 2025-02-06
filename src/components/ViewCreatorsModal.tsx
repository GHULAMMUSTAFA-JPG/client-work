


"use client"
import { fetch_dashboard_data, login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from '@/components/topcard';
import ProfileCard from '@/components/profilecard';
import CampaignFilterModal from '@/components/campaignfiltermodal';
import { apiController } from '@/@api/baseUrl';
import { defaultImagePath } from './constants';
interface ViewCreatorsModalProps {
    data: any
    rendControl: boolean
    setRendControl: any
}

function ViewCreatorsModal(props: ViewCreatorsModalProps) {
    const { data, rendControl, setRendControl } = props
    const [users, setUsers] = useState<any[]>([]);
    // const router = useRouter()

    const deleteCreator = async (e: any) => {
        const response: any = await apiController.delete('/dashboard/buyers/remove_creator_from_list', {
            data: {
                List_Id: data?._id,
                Creator_Id: e.target.id
            }
        }
        )
        if (response?.error) {

        }
        else {
            setRendControl(!rendControl)
        }
    }
    return (
        <>
            <div className="modal fade" id="viewCreatorsModal" tabIndex={-1} aria-labelledby="viewCreatorsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header px-4">
                            <h1 className="modal-title fs-5" id="viewCreatorsModalLabel">{data?.List_Name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table align-middle text-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="text-start ps-4">Creators</th>
                                                            {/* <th scope="col">Social Platform</th> */}
                                                            <th scope="col">Company</th>
                                                            <th scope="col">Followers</th>
                                                            <th scope="col">Impressions</th>
                                                            {/* <th scope="col">Average Impressions</th> */}
                                                            <th scope="col">Engagements</th>
                                                            {/* <th scope="col">Average Engagements</th> */}
                                                            <th scope="col">Actions</th>
                                                            {/* <th scope="col">Social Media Value</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data?.List_Creators?.length !== 0 ? data?.List_Creators?.map((user: any) => (
                                                            <tr key={user?._id} className="cursor hover-bg-light">
                                                                <td className="text-start ps-4">
                                                                    <div className="d-flex align-items-center">
                                                                        <Image src={user?.Profile_Image || defaultImagePath} alt={user?.Name} width={30} height={30} className="user-img img-fluid" />
                                                                        <span className="ms-2 text-truncate">{user?.Name}</span>
                                                                    </div>
                                                                </td>
                                                                {/* <td>
                                                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                                                        <span className="ms-2">@{user?.Profile_URL}</span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center justify-content-center">
                                                                        <Icon icon="mdi:linkedin" width={22} height={22} className="text-info" />

                                                                        <span className="ms-2 text-truncate"> {user?.Username}</span>
                                                                    </div>
                                                                </td> */}
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
                                                                    {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                    <p className="mb-2">{user?.No_of_Engagements?.toLocaleString()}</p>
                                                                </td>
                                                                <td style={{cursor:'pointer'}}>
                                                                    <Icon icon="heroicons:trash" width={22} height={22} id={user?._id} className="text-danger" onClick={deleteCreator} />
                                                                </td>
                                                                {/* <td className="drop-down-table">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-primary btn-sm dropdown-toggle rounded-pill px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <Icon icon="material-symbols:add" /> <span className="fs-12">ADD TO</span>
                                                                        </button>
                                                                        <ul className="dropdown-menu p-0">
                                                                            <div className="card">
                                                                                <div className="card-body p-0 scroll">
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">Blockchain</span></a></li>
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">Artificial Intelligence</span></a></li>
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">UI/UX</span></a></li>
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">Web Developer</span></a></li>
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">Front end</span></a></li>
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">Backend</span></a></li>
                                                                                    <li><a className="dropdown-item p-1" href="#"><span className="ms-1">Web Developer</span></a></li>


                                                                                </div>
                                                                                <div className="card-footer p-0 bg-transparent">
                                                                                    <li>
                                                                                        <a className="dropdown-item p-1" href="#">
                                                                                            <Icon icon="ri:add-fill" className="me-1" />New List
                                                                                        </a>
                                                                                    </li>

                                                                                </div>
                                                                            </div>
                                                                        </ul>
                                                                    </div>
                                                                </td> */}
                                                                {/* <td>
                                                                <p className="mb-2">-</p> Replace with dynamic value if available
                                                                <p className="mb-0">$1.4k</p> Replace with dynamic value if available
                                                            </td> */}
                                                            </tr>
                                                        )

                                                        ) :
                                                            <tr>
                                                                <td colSpan={6}>.............No data Found............</td></tr>
                                                        }
                                                        {/* <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                        <span className="ms-2"> Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-2">213,3223</p>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">$2.2k</p>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="logos:youtube-icon" width={20} height={20} />
                                                        <span className="ms-2"> Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-2">213,3223</p>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">103k</p>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-2">$2.2k</p>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Image src="/assets/images/user.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                        <span className="ms-2 fw-medium">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Icon icon="skill-icons:instagram" width={18} height={18} />
                                                        <span className="ms-2">Billi Ellish</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">213,3223</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">20k</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">$1.4k</p>
                                                </td>
                                            </tr> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='modal-footer'>
                            <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-info px-3">Create</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewCreatorsModal   