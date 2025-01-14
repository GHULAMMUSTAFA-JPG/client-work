"use client"

import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { conversationHistory, fetchProfileData, fetchProfileDataByIds, getSpecificMessageHistory } from '@/@api';
import { defaultImagePath } from '@/components/constants';
import { useSearchParams } from 'next/navigation';
interface selectedIdProps {
    Message_ID: null | string
    Recipient_ID: null | string
    Sender_ID: null | string
    Conversation_Id: null | string
    Profile_Image: null | string
    Name: null | string
}
const Inbox = () => {
    const [messages, setMessages] = useState<any>([]);
    const [input, setInput] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const { userProfile, user, setIsLoading } = useAuth();
    const [conversationsHistory, setConversationsHistory] = useState<any>()
    const [pageNo, setPageNo] = useState<number>(1)
    const [limit, setLimit] = useState<number>(15)
    const [selectedIds, setSelectedIds] = useState<selectedIdProps>({
        Message_ID: null,
        Recipient_ID: null,
        Sender_ID: null,
        Conversation_Id: null,
        Profile_Image: null,
        Name: null
    })
    const [chatLength, setChatLength] = useState<number>(1)
    const [chatLimit, setChatLimit] = useState<number>(20)
    const searchParams = useSearchParams();
    useEffect(() => {
        if (userProfile?._id) {
            const ws = new WebSocket(`wss://synncapi.onrender.com/ws/message/${userProfile._id}`);
            ws.onopen = () => {
                console.log("Connected to WebSocket server");
            };

            ws.onmessage = (event) => {
                const message = event.data;
                const response = JSON.parse(message);
                console.log(response, "response on message")
                if (response?.Message && response?.Conversation_ID == selectedIds?.Conversation_Id) {
                    setMessages((prevMessages: any) => [
                        ...prevMessages,
                        {
                            user: response?.Sender_ID && response?.Sender_ID !== userProfile?._id ? "receiver" : "sender",
                            Message: response?.Message,
                            Timestamp: response?.Timestamp,
                        },
                    ]);
                    getConversationHistory()
                } else {
                    console.log("Invalid message format");
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };

            setSocket(ws);

            return () => {
                ws.close();
            };
        }
    }, [userProfile]);

    const sendMessage = () => {
        const data: any = JSON.stringify({
            recipient_id: selectedIds?.Recipient_ID,
            message: input
        })
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(data);
            // let userdata = messages
            // userdata?.push({
            //     user: "sender",
            //     Message: input,
            //     Timestamp : new Date(),
            //     Time_Ago : 'Just Now'
            // })
            // setMessages(userdata)
            setInput("");
        } else {
            console.error("WebSocket is not connected");
        }
    };

    const getConversationHistory = async () => {
        if (user?.email) {

            const response = await conversationHistory(user?.email, setConversationsHistory, pageNo, limit, setIsLoading)
        }
    }

    useEffect(() => {
        getConversationHistory()
    }, [pageNo, limit])

    useEffect(() => {
        selectedIds?.Message_ID && getSpecificMessageHistory(selectedIds, setMessages, setIsLoading, chatLength, chatLimit)
    }, [selectedIds])

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setSelectedIds((prev: any) => {
                return { ...prev, ['Recipient_ID']: id }
            })

            setTimeout(() => {
                const clickButton = document?.getElementById(id)
                clickButton && clickButton.click()

            }, 1500);
            fetchProfileDataByIds(id, setSelectedIds)
        }
    }, [searchParams])




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
                        {
                            conversationsHistory?.conversations && conversationsHistory?.conversations?.length !== 0 ?
                                conversationsHistory?.conversations?.map((chat: any, index: number) => {

                                    return (
                                        <div id={chat?.Last_Message?.Recipient_ID} onClick={() => {
                                            setSelectedIds({
                                                Recipient_ID: chat?.Last_Message?.Recipient_ID,
                                                Message_ID: chat?.Last_Message?.Message_ID,
                                                Conversation_Id: chat?._id,
                                                Sender_ID: userProfile?._id,
                                                Name: chat?.Name,
                                                Profile_Image: chat?.Profile_Image
                                            })
                                        }} key={index} className={`d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer ${selectedIds?.Recipient_ID == chat?.Last_Message?.Recipient_ID ? "active" : ""}`}>
                                            <Image
                                                src={chat?.Profile_Image || defaultImagePath}
                                                alt="Profile"
                                                width={40}
                                                height={40}
                                                className="rounded-circle me-2"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0 fs-14">{chat?.Name || "Anonymous"}</h6>
                                                <small className="text-muted">{chat?.Last_Message?.Message}</small>
                                            </div>
                                            <small className="text-muted">{chat?.Last_Message?.Time_Ago}</small>
                                        </div>
                                    )

                                })

                                :
                                <div className="d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer active">
                                    No Conservation found
                                </div>
                        }


                    </div>
                </div>

                {/* Chat Area */}
                <div className="col-md-8 col-lg-9 p-0">
                    <div className="card h-100 border-0">
                        {/* Card Header */}
                        <div className="card-header bg-white p-3">
                            <div className="d-flex align-items-center">
                                <Image
                                    src={selectedIds?.Profile_Image || defaultImagePath}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-circle me-2"
                                />
                                <div>
                                    <h6 className="mb-0 fs-14">{selectedIds?.Name || "Anonymous"}</h6>
                                </div>
                            </div>
                        </div>

                        {/* Card Body - Messages Area */}
                        <div className="card-body p-4">

                            {/* Received Message */}
                            {
                                messages?.map((msg: any, index: number) => {
                                    return (
                                        <div className="row" key={index} >
                                            {
                                                msg?.user !== "sender" ?
                                                    <div className="col-auto mb-4 mx-width-70">
                                                        <div className="activated-subtle rounded-3 p-3">
                                                            <p className='fs-13 mb-0'>{msg?.Message}</p>
                                                        </div>
                                                        <small className="text-muted d-block mt-1 ms-2">{msg?.Time_Ago ? msg?.Time_Ago : ""}</small>
                                                    </div> :
                                                    <div className="col-auto ms-auto mb-4 mx-width-70">

                                                        <div className="bg-circle-2 text-white rounded-3 p-3 ms-auto">
                                                            <p className='fs-13 mb-0'>{msg?.Message}</p>
                                                        </div>

                                                        <small className="text-muted text-end d-block mt-1 ms-2">{msg?.Time_Ago ? msg?.Time_Ago : ""}</small>
                                                    </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* Card Footer - Message Input */}
                        <div className="card-footer bg-white p-3">
                            <div className="input-group">
                                <textarea
                                    className="form-control border-0 bg-form"
                                    placeholder="Type your message here..."
                                    onChange={(e: any) => {
                                        setInput(e.target.value)
                                    }}
                                    value={input}
                                    id="textareaId"
                                    onKeyDown={(e: any) => {
                                        e.key == "Enter" && sendMessage()
                                    }}
                                />
                                <button className="btn btn-link" onClick={sendMessage}>
                                    <Icon icon="mynaui:send" width="24" height="24" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='card h-100 border-0 empty-conversation'>
                        <div className='card-body'>
                            <p className='mb-0 text-warning'>Select a conversation to start chatting</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AuthPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Inbox />
        </Suspense>
    );
}