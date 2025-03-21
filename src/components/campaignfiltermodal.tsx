"use client";
import { login } from "@/@api";
import useForm from "@/hooks/useForm";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import TopCard from "@/components/topcard";
import ProfileCard from "@/components/profilecard";
import { defaultImagePath } from "./constants";


function CampaignFilterModal(props: any) {
    const { selectedCampaign } = props;

    return (
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Campaign Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body p-4">
                            {/* <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item mb-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                                            Number of Followers
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Entry Level<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                            Intermediate<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            Expert<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Campaigns Price
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Less than $100<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                            $100 to $500<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            $500 to $1k<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            $1k to $5k<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            $5+<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Number of Applicants
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Less than 10<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                            10 to 20<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            20 to 30<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            30 to 40<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                            50+<span className='text-muted fs-12 ms-1'>(20)</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="d-flex gap-3 justify-content-between">
                                <div>
                                    <p className="fw-medium mb-2 fs-18">
                                        {selectedCampaign?.Headline}
                                    </p>
                                    <p className="text-warning">
                                        {selectedCampaign?.Brief_Description}
                                    </p>
                                </div>
                                <div className="d-flex gap-2">
                                    <img
                                        src={selectedCampaign?.Company_Logo || defaultImagePath}
                                        className="border object-fit-cover rounded flex-shrink-0"
                                        alt="logo"
                                        width={110}
                                        height={110}
                                    />
                                    <button
                                        type="button"
                                        className="btn-close ms-2"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            </div>
                            <div className="d-flex gap-2 align-items-center mb-3">
                                <Icon
                                    icon="solar:eye-broken"
                                    width="18"
                                    height="18"
                                    className="text-gray flex-shrink-0"
                                />
                                <p className="mb-0">
                                    {selectedCampaign?.Target_Audience?.join(" , ")}
                                </p>
                            </div>

                            <p className="mb-2 fw-medium fs-16">Campaign Details</p>
                            <p className="text-warning mb-0">
                                {selectedCampaign?.Campaign_Details}
                            </p>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Apply filters</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CampaignFilterModal;



// import { useEffect, useRef } from "react";
// import { Offcanvas } from "bootstrap"; // ✅ Import Bootstrap Offcanvas component

// interface Campaign {
//     Brief_Description: string;
//     Budget: number;
//     Campaign_Application_Timestamp: string;
//     Campaign_Details: string;
//     Campaign_Media: string;
//     Company_Linkedin: string;
//     Company_Logo: string;
//     Company_Name: string;
//     Company_Website: string;
//     Created_At: string;
//     End_Date: string;
//     Headline: string;
//     Is_Ongoing: boolean;
//     Is_Public: boolean;
//     Start_Date: string;
//     Target_Audience: string[];
//     Time_Ago: string;
//     _id: string;
// }

// export default function CampaignFilterModal({ selectedCampaign }: { selectedCampaign: Campaign }) {
//     const offcanvasRef = useRef<HTMLDivElement | null>(null);
//     const offcanvasInstanceRef = useRef<Offcanvas | null>(null);

//     useEffect(() => {
//         if (offcanvasRef.current) {
//             if (!offcanvasInstanceRef.current) {
//                 offcanvasInstanceRef.current = new Offcanvas(offcanvasRef.current);
//             }
//             offcanvasInstanceRef.current.show();
//         }

//         return () => {
//             if (offcanvasInstanceRef.current) {
//                 offcanvasInstanceRef.current.hide();
//                 offcanvasInstanceRef.current.dispose();
//                 offcanvasInstanceRef.current = null;
//             }
//         };
//     }, [selectedCampaign]); // 🔥 Opens only when `selectedCampaign` changes

//     return (
//         <div
//             ref={offcanvasRef}
//             id="campaignOffcanvas"
//             className="offcanvas offcanvas-end"
//             tabIndex={-1}
//             aria-labelledby="campaignOffcanvasLabel"
//             style={{ width: "400px", background: "#fff", boxShadow: "-5px 0 15px rgba(0,0,0,0.1)" }}
//         >
//             <div className="offcanvas-header border-bottom">
//                 <h5 id="campaignOffcanvasLabel">{selectedCampaign?.Company_Name}</h5>
//                 <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => offcanvasInstanceRef.current?.hide()}
//                 ></button>
//             </div>

//             <div className="offcanvas-body">
//                 <h5 className="mb-2">{selectedCampaign?.Headline}</h5>
//                 <p className="text-muted">{selectedCampaign?.Brief_Description}</p>
//                 <div className="mb-3">
//                     <strong>Budget:</strong> ${selectedCampaign?.Budget.toLocaleString()}
//                 </div>
//             </div>
//         </div>
//     );
// }
