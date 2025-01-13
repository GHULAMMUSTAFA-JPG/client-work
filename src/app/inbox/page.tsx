"use client"
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';


const Inbox = () => {
    return (
        <div className="container-fluid chatbot-container">
            <div className="row bg-white">
                {/* Left Sidebar */}
                <div className="col-md-4 col-lg-3 border-end p-0">
                    {/* Header */}
                    <div className="p-3 border-bottom">
                        <h5 className="mb-0">Conversations</h5>
                    </div>

                    {/* Search Bar */}
                    <div className="p-3 border-bottom">
                        <div className="input-group">
                            <span className="input-group-text bg-form border-0">
                                <Icon icon="iconamoon:search" className="text-warning" width="18" height="18" />
                            </span>
                            <input type="text" className="form-control border-0 bg-form" placeholder="Search..." />
                        </div>
                    </div>

                    {/* Conversation List */}
                    <div className="conversation-list">
                        <div className="d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer active">
                            <Image
                                src="/assets/images/user2.jpg"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-circle me-2"
                            />
                            <div className="flex-grow-1">
                                <h6 className="mb-0 fs-14">Sarah Yeary</h6>
                                <small className="text-muted">Hey Awais, how are you?</small>
                            </div>
                            <small className="text-muted">1mo</small>
                        </div>
                        <div className="d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer">
                            <Image
                                src="/assets/images/user2.jpg"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-circle me-2"
                            />
                            <div className="flex-grow-1">
                                <h6 className="mb-0 fs-14">Sarah Yeary</h6>
                                <small className="text-muted">Hey Awais, how are you?</small>
                            </div>
                            <small className="text-muted">1mo</small>
                        </div>
                        <div className="d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer">
                            <Image
                                src="/assets/images/user2.jpg"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-circle me-2"
                            />
                            <div className="flex-grow-1">
                                <h6 className="mb-0 fs-14">Sarah Yeary</h6>
                                <small className="text-muted">Hey Awais, how are you?</small>
                            </div>
                            <small className="text-muted">1mo</small>
                        </div>
                        <div className="d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer">
                            <Image
                                src="/assets/images/user2.jpg"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-circle me-2"
                            />
                            <div className="flex-grow-1">
                                <h6 className="mb-0 fs-14">Sarah Yeary</h6>
                                <small className="text-muted">Hey Awais, how are you?</small>
                            </div>
                            <small className="text-muted">1mo</small>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="col-md-8 col-lg-9 p-0">
                    <div className="card h-100 border-0">
                        {/* Card Header */}
                        <div className="card-header bg-white p-3">
                            <div className="d-flex align-items-center">
                                <Image
                                    src="/assets/images/user2.jpg"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-circle me-2"
                                />
                                <div>
                                    <h6 className="mb-0 fs-14">Sarah Yeary</h6>
                                </div>
                            </div>
                        </div>

                        {/* Card Body - Messages Area */}
                        <div className="card-body p-4">
                            <div className="row">
                                {/* Received Message */}
                                <div className="col-auto mb-4 mx-width-70">
                                    <div className="activated-subtle rounded-3 p-3">
                                        <p className='fs-13 mb-0'>We accepted your application for the campaign New Generative AI Product!</p>
                                    </div>
                                    <small className="text-muted text-end d-block mt-1">1 month ago</small>
                                </div>

                                {/* Sent Message */}
                                <div className="col-auto ms-auto mb-4 mx-width-70">

                                    <div className="bg-circle-2 text-white rounded-3 p-3 ms-auto">
                                        <p className='fs-13 mb-0'>Hey Awais, how are you? Are you guys looking to do some sponsored posts?</p>
                                    </div>

                                    <small className="text-muted text-end d-block mt-1">1 month ago</small>
                                </div>
                                <div className="col-auto ms-auto mb-4 mx-width-70">

                                    <div className="bg-circle-2 text-white rounded-3 p-3 ms-auto">
                                        <p className='fs-13 mb-0'>Hey Awais, how are you? Are you guys looking to do some sponsored posts? Hey Awais, how are you? Are you guys looking to do some sponsored posts?</p>
                                    </div>

                                    <small className="text-muted text-end d-block mt-1">1 month ago</small>
                                </div>
                                <div className="col-auto mb-4 mx-width-70">
                                    <div className="activated-subtle rounded-3 p-3">
                                        <p className='fs-13 mb-0'>We accepted your application for the campaign New Generative AI Product! We accepted your application for the campaign New Generative AI Product!</p>
                                    </div>
                                    <small className="text-muted text-end d-block mt-1">1 month ago</small>
                                </div>
                                <div className="col-auto ms-auto mb-4 mx-width-70">

                                    <div className="bg-circle-2 text-white rounded-3 p-3">
                                        <p className='fs-13 mb-0'>Hey Awais, how are you? Are you guys looking to do some sponsored posts?</p>
                                    </div>

                                    <small className="text-muted text-end d-block mt-1">1 month ago</small>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer - Message Input */}
                        <div className="card-footer bg-white p-3">
                            <div className="input-group">
                                <textarea
                                    className="form-control border-0 bg-form"
                                    placeholder="Type your message here..."
                                />
                                <button className="btn btn-link">
                                    <Icon icon="mynaui:send" width="24" height="24" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inbox;