
"use client";

import { fetch_dashboard_data } from "@/@api";
import CreateNewListModal from "@/components/CreateNewListModal";
import TopCardBuyer from "@/components/TopCardBuyer";
import ViewCreatorsModal from "@/components/ViewCreatorsModal";
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
                {/* <TopCardBuyer /> */}
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
                            <li className='nav-item' role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false"> Saved List </button>
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
                                                                                                {/* <button type="button" className="btn bg-transparent btn-sm w-100 text-dark d-flex align-items-center border-0"> </button> */}

                                                                                            </a>
                                                                                        </li>

                                                                                    </div>
                                                                                </div>
                                                                                {/* <li>
                                                                                    <a className="dropdown-item px-1" href="#">

                                                                                        <select className="form-select fs-14" aria-label="Default select example">
                                                                                            <option selected className="d-none">List</option>
                                                                                            <option value="1">Blockchain</option>
                                                                                            <option value="2">Artificial Intelligence</option>
                                                                                            <option value="3">UI/UX</option>
                                                                                        </select>
                                                                                    </a>
                                                                               
                                                                                </li>
                                                                                <li className="mb-3">
                                                                                    <a className="dropdown-item px-1" href="#">
                                                                                        <select className="form-select fs-14" aria-label="Default select example">
                                                                                            <option selected className="d-none">Compaign</option>
                                                                                            <option value="1">Post about my brand</option>
                                                                                            <option value="2">Brand awareness</option>
                                                                                        </select>
                                                                                    </a>
                                                                                </li>
                                                                                <li className="border-top">
                                                                                    <a className="dropdown-item px-1" href="#">
                                                                                        <button type="button" className="btn btn-outline-light btn-sm w-100 text-dark d-flex justify-content-between align-items-center">New List <Icon icon="ri:add-fill" /> </button>
                                                                                    </a>

                                                                                </li> */}
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
                                                                <th scope="col">Average Impressions</th>
                                                                <th scope="col">Engagements</th>
                                                                <th scope="col">Average Engagements</th>
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
                                                                        <p className="mb-2">Microsoft</p>
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
                                                                                                {/* <button type="button" className="btn bg-transparent btn-sm w-100 text-dark d-flex align-items-center border-0"> </button> */}

                                                                                            </a>
                                                                                        </li>

                                                                                    </div>
                                                                                </div>
                                                                                {/* <li>
                                                                                    <a className="dropdown-item px-1" href="#">

                                                                                        <select className="form-select fs-14" aria-label="Default select example">
                                                                                            <option selected className="d-none">List</option>
                                                                                            <option value="1">Blockchain</option>
                                                                                            <option value="2">Artificial Intelligence</option>
                                                                                            <option value="3">UI/UX</option>
                                                                                        </select>
                                                                                    </a>
                                                                               
                                                                                </li>
                                                                                <li className="mb-3">
                                                                                    <a className="dropdown-item px-1" href="#">
                                                                                        <select className="form-select fs-14" aria-label="Default select example">
                                                                                            <option selected className="d-none">Compaign</option>
                                                                                            <option value="1">Post about my brand</option>
                                                                                            <option value="2">Brand awareness</option>
                                                                                        </select>
                                                                                    </a>
                                                                                </li>
                                                                                <li className="border-top">
                                                                                    <a className="dropdown-item px-1" href="#">
                                                                                        <button type="button" className="btn btn-outline-light btn-sm w-100 text-dark d-flex justify-content-between align-items-center">New List <Icon icon="ri:add-fill" /> </button>
                                                                                    </a>

                                                                                </li> */}
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
                                    <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-12 mb-2 text-end">
                                                <button type="button" className="btn btn-info btn-sm me-1" data-bs-toggle="modal" data-bs-target="#createNewListModal"><Icon icon="ri:add-fill" /> Create New List</button>
                                            </div>
                                            <div className='col-md-4 col-xl-3'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                            <p className='mb-0 fw-medium'>Front End Developer</p>
                                                            <div>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 me-2 cursor" title="Edit">
                                                                    <Icon icon="heroicons:pencil-square" width={16} height={16} className="text-info" />
                                                                </span>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 cursor" title="Delete">
                                                                    <Icon icon="heroicons:trash" width={16} height={16} className="text-danger" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-outline-info btn-sm w-100 rounded-pill" data-bs-toggle="modal" data-bs-target="#viewCreatorsModal">View</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-xl-3'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                            <p className='mb-0 fw-medium'>Backend Developer</p>
                                                            <div>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 me-2 cursor" title="Edit">
                                                                    <Icon icon="heroicons:pencil-square" width={16} height={16} className="text-info" />
                                                                </span>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 cursor" title="Delete">
                                                                    <Icon icon="heroicons:trash" width={16} height={16} className="text-danger" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-outline-info btn-sm w-100 rounded-pill">View</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-xl-3'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                            <p className='mb-0 fw-medium'>Artificial Intelligence</p>
                                                            <div>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 me-2 cursor" title="Edit">
                                                                    <Icon icon="heroicons:pencil-square" width={16} height={16} className="text-info" />
                                                                </span>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 cursor" title="Delete">
                                                                    <Icon icon="heroicons:trash" width={16} height={16} className="text-danger" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-outline-info btn-sm w-100 rounded-pill">View</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-xl-3'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                            <p className='mb-0 fw-medium'>UI/UX</p>
                                                            <div>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 me-2 cursor" title="Edit">
                                                                    <Icon icon="heroicons:pencil-square" width={16} height={16} className="text-info" />
                                                                </span>
                                                                <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 p-2 cursor" title="Delete">
                                                                    <Icon icon="heroicons:trash" width={16} height={16} className="text-danger" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-outline-info btn-sm w-100 rounded-pill">View</button>
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
            </div>
            <CreateNewListModal />
            <ViewCreatorsModal />
        </>

    );
}

export default (mycreatorsbuyer)