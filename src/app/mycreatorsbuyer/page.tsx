
"use client";

import { fetch_dashboard_data } from "@/@api";
import TopCardBuyer from "@/components/TopCardBuyer";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
function mycreatorsbuyer() {

    const [users, setUsers] = useState<any[]>([]);
    // const router = useRouter()
    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        const response = await fetch_dashboard_data()
        console.log(response.data)
        setUsers(response.data?.users)
    }
    return (
        <>
            <div className="container-fluid">
                <TopCardBuyer />
                <div className="row my-3">
                    <div className="col-12">
                        {/* <div className="d-flex justify-content-between align-items-end"> */}
                        {/* <p className="mb-0 fw-medium fs-16">My Company</p> */}
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
                            {/* <li className='nav-item ms-auto'>
                                    <button className='btn btn-primary btn-sm' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2">Create new campaign</button>
                                </li> */}
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
                                                                <th scope="col">Reach</th>
                                                                <th scope="col">Engagements</th>
                                                                <th scope="col">Likes</th>
                                                                <th scope="col"></th>
                                                                {/* <th scope="col">Social Media Value</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Array.isArray(users) && users?.map((user: any) => (
                                                                <tr key={user._id}>
                                                                    <td className="text-start ps-4">
                                                                        <div className="d-flex align-items-center">
                                                                            <Image src={user.Profile_Image} alt={user.Name} width={30} height={30} className="user-img img-fluid" />
                                                                            <span className="ms-2 text-truncate">{user.Name}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                                                            <span className="ms-2">{user.Name}</span>
                                                                        </div>
                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                            <Icon icon="mdi:linkedin" width={22} height={22} className="text-info" />

                                                                            <span className="ms-2 text-truncate"> {user.Username}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">Cisco</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user.No_of_Followers.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Followers.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Post_Reach}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                        <p className="mb-2">{user.No_of_Engagements.toLocaleString()}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user.No_of_Likes.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td className="drop-down-table">
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-primary btn-sm dropdown-toggle rounded-pill px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <Icon icon="material-symbols:add" /> <span className="fs-12">ADD TO</span>
                                                                            </button>
                                                                            <ul className="dropdown-menu p-0">
                                                                                <li>
                                                                                    <a className="dropdown-item px-1" href="#">
                                                                                        
                                                                                        <select className="form-select fs-14" aria-label="Default select example">
                                                                                            <option selected className="d-none">List</option>
                                                                                            <option value="1">Blockchain</option>
                                                                                            <option value="2">Artificial Intelligence</option>
                                                                                            <option value="3">UI/UX</option>
                                                                                        </select>
                                                                                    </a>
                                                                                    {/* <li className="mx-3 bg-transparent dropdown-item">
                                                                                        <span className="fw-light fs-14 mx-2">Blockchain</span>
                                                                                    </li> */}
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item px-1" href="#">
                                                                                    <select className="form-select fs-14" aria-label="Default select example">
                                                                                            <option selected className="d-none">Compaign</option>
                                                                                            <option value="1">Post about my brand</option>
                                                                                            <option value="2">Brand awareness</option>
                                                                                        </select>
                                                                                    </a>
                                                                                </li>
                                                                                {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                                                            </ul>
                                                                        </div>
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
                                                                <th scope="col">Reach</th>
                                                                <th scope="col">Engagements</th>
                                                                <th scope="col">Likes</th>
                                                                {/* <th scope="col">Social Media Value</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Array.isArray(users) && users?.map((user: any) => (
                                                                <tr key={user._id}>
                                                                    <td className="text-start ps-4">
                                                                        <div className="d-flex align-items-center">
                                                                            <Image src={user.Profile_Image} alt={user.Name} width={30} height={30} className="user-img img-fluid" />
                                                                            <span className="ms-2 text-truncate">{user.Name}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                                                            <span className="ms-2">{user.Name}</span>
                                                                        </div>
                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                            <Icon icon="mdi:linkedin" width={22} height={22} className="text-info" />

                                                                            <span className="ms-2 text-truncate"> {user.Username}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">Cisco</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user.No_of_Followers.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Followers.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user?.Post_Reach}</p>
                                                                        {/* <p className="mb-0">{user.No_of_Engagements.toLocaleString()}</p> */}
                                                                    </td>
                                                                    <td>
                                                                        {/* <p className="mb-2">{user.No_of_Impressions.toLocaleString()}</p> */}
                                                                        <p className="mb-2">{user.No_of_Engagements.toLocaleString()}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="mb-2">{user.No_of_Likes.toLocaleString()}</p>
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
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default (mycreatorsbuyer)