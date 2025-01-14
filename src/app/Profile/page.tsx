'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <div className='profile-container mb-4 pb-3'>
                        {/* Banner Image */}
                        <div className="position-relative">
                            <Image
                                src="/assets/images/bg-cover.png"
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
                                    src="/assets/images/user3.jpg"
                                    alt="Profile Picture"
                                    width={150}
                                    height={150}
                                    className="rounded-circle border border-4 border-white"
                                />
                            </div>
                            {/* Profile Info */}
                            <div className="mt-2">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <h5 className="mb-0">Josh Aharonoff</h5>
                                    <img src="https://flagcdn.com/24x18/us.png" width={18} height={14} className="mx-1"></img>
                                    <a href="https://www.linkedin.com/in/joshaharonoff" target="_blank"><Icon style={{ cursor: "pointer" }} icon="mdi:linkedin" width={19} height={19} className='text-info' /></a>
                                    <button className='activated-subtle border btn-sm ms-1 px-2 py-1 rounded-pill text-info'>Finance, Accounting, Startups, HR</button>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <p className='mb-0 fs-12 text-warning'>@joshaharonoff</p>
                                    <div className="bg-light rounded-circle d-inline-block" style={{ width: '6px', height: '6px' }}></div>
                                    <p className='mb-0 fs-12 text-warning'><span className="text-dark fw-medium">500k+</span> followers</p>
                                </div>

                                <p className="mt-2">👋 Welcome to my partnership storefront!</p>

                                <div className="mt-3">
                                    <p>👨‍💼 I'm a CPA and Finance & Accounting creator, reaching an audience of over 500k professionals across social media. I'm passionate about helping startups scale through exceptional finance and accounting support.</p>

                                    <p>👍 I also run a Fractional CFO agency where we help great businesses get their Finance & Accounting in order.</p>

                                    <p>🚀 I have helped founders raise over $400m in the last 3 years alone and have actively advised over 40 startups.</p>

                                    <p>📊 My excel templates have been downloaded by over 10k people, making them a valuable resource for those in the finance and accounting field.</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 d-flex gap-3">
                                    <button className="btn btn-dark">
                                        DM for Custom Collaborations
                                    </button>
                                </div>

                                {/* Stats Section */}
                                <div className="row mt-4 g-4">
                                    <div className="col-md-4">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <p className="text-muted">Total Followers</p>
                                                <h5>500k+</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <p className="text-muted">Average Impressions per post</p>
                                                <h5>100k</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <p className="text-muted">Average Engagements per post</p>
                                                <h5>100k</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* LinkedIn Section */}
                    {/* <div className='profile-container mb-4'>
                        <div>
                            <div className="d-flex align-items-center gap-2">
                                <Icon icon="logos:linkedin-icon" width="24" height="24" />
                                <h5 className="mb-0">Josh Aharonoff's LinkedIn</h5>
                                <svg className="ms-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </div>
                            <p className="text-muted mt-2">LinkedIn is my largest platform with 400k+ followers and counting.</p>

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="text-muted mb-1">Followers</p>
                                            <h5 className="mb-0">408k</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="text-muted mb-1">Audience</p>
                                            <h5 className="mb-0">Finance, Accounting, Startups, HR</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='profile-container'>
                        {/* Collaboration Section */}
                        <div>
                            <h5>Let's Collaborate</h5>

                            {/* Collaboration Cards */}
                            <div className="mt-4">
                                <div className="card mb-3">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6>Sponsored Post Series</h6>
                                            <p className="text-muted mb-0">
                                                A series of posts on my LinkedIn over 3-6 months to educate decision-makers on
                                                the benefits of your company offerings. Negotiable retainer fee.
                                            </p>
                                        </div>
                                        <button className="btn btn-dark flex-shrink-0 ms-5 btn-sm">Book Now</button>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6>Sponsored Post x1</h6>
                                            <p className="text-muted mb-0">
                                                I'll create a LinkedIn post to educate my audience on the benefits of your
                                                company's offerings, or for anything else you're interested in promoting, like an
                                                upcoming event.
                                            </p>
                                        </div>
                                        <button className="btn btn-dark flex-shrink-0 ms-5 btn-sm">Book Now</button>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6>Engage with your Brand's Media Content</h6>
                                            <p className="text-muted mb-0">
                                                For brands that I feel provide real value to my audience, I'm open to partnering to
                                                raise awareness about your brand or upcoming events through engaging with your
                                                content.
                                            </p>
                                        </div>
                                        <button className="btn btn-dark flex-shrink-0 ms-5 btn-sm">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
