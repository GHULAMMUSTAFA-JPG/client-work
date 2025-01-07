
"use client";

import { fetch_dashboard_data, fetchCompanyData } from "@/@api";
import Topcard from "@/components/topcard";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
// import { useRouter } from "next/navigation";
function CreatorDashboard() {   
    const {user} = useAuth()
    const [users, setUsers] = useState<any[]>([]);
    const [companyData, setCompanyData] = useState<any>([])
    // const router = useRouter()
    useEffect(() => {

        fetchData()
      
    }, [])
    useEffect(() => {
       user?.email && fetchCompanyData(user?.email,setCompanyData)
    }, [user])

    const fetchData = async () => {
        const response = await fetch_dashboard_data()
        setUsers(response.data?.users)
    }
    return (
        <>
            <div className="container-fluid">
                {/* <Topcard /> */}
                <div className="row my-3">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-end mb-3">
                            <p className="mb-0 fw-medium fs-16">My Company Creators</p>
                            {/* <button className="btn btn-primary btn-sm ms-auto">Add Campaign</button> */}
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
                        </div>
                        {/* <hr className="" /> */}
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table align-middle text-center mb-0 table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-start ps-4">Creators</th>
                                                <th scope="col">Social Platform</th>
                                                <th scope="col">Followers</th>
                                                <th scope="col">Impressions</th>
                                                <th scope="col">Average Impressions</th>
                                                <th scope="col">Engagements</th>
                                                <th scope="col">Average Engagements</th>
                                                {/* <th scope="col">Social Media Value</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(companyData?.creators) && companyData?.creators?.map((user: any) => (
                                                <tr key={user?._id}>
                                                    <td className="text-start ps-4">
                                                        <div className="d-flex align-items-center">
                                                            <Image src={user?.Profile_Image || ''} alt={user?.Name} width={30} height={30} className="user-img img-fluid" />
                                                            <span className="ms-2 text-truncate">{user?.Name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                                            <span className="ms-2">@{user?.Profile_URL}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <Icon icon="mdi:linkedin" width={22} height={22} className="text-info"/>

                                                            <span className="ms-2 text-truncate"> {user?.Username}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="mb-2">{user?.No_of_Followers?.toLocaleString()}</p>
                                                        {/* <p className="mb-0">{user.No_of_Followers.toLocaleString()}</p> */}
                                                    </td>
                                                    <td>
                                                        <p className="mb-2">{user?.No_of_Impressions}</p>
                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                    </td>
                                                    <td>
                                                        <p className="mb-2">{user?.Average_Impressions}</p>
                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                    </td>
                                                    <td>
                                                        {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                        <p className="mb-0">{user?.No_of_Engagements}</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-2">{user?.Average_Engagements}</p>
                                                        {/* <p className="mb-0">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                    </td>
                                                    {/* <td>
                                                        <p className="mb-2">-</p> Replace with dynamic value if available
                                                        <p className="mb-0">$1.4k</p> Replace with dynamic value if available
                                                    </td> */}
                                                </tr>
                                            ))}
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
        </>
    );
}

export default (CreatorDashboard)