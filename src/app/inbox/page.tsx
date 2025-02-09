"use client";

import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProfileDataByIds } from "@/@api";
import { defaultImagePath } from "@/components/constants";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyState";

const Inbox = () => {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const {
    userProfile,
    conversations,
    sockets,
    setSelectedIds,
    selectedIds,
    restartSockets,
  } = useAuth();
  const [searchText, setSearchText] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSelectedIds((prev: any) => ({
        ...prev,
        Recipient_ID: id,
      }));
      setTimeout(() => {
        const clickButton = document?.getElementById(id);
        clickButton && clickButton.click();
      }, 1500);
      fetchProfileDataByIds(id, setSelectedIds);
    }
  }, [searchParams]);

  const sendMessage = async () => {
    const data = JSON.stringify({
      recipient_id: selectedIds?.Recipient_ID,
      message: input,
    });
    if (sockets && sockets.readyState === WebSocket.OPEN) {
      sockets.send(data);
      setInput("");
    } else {
      toast.warn(
        "Error while connecting. Please check your connection and try again"
      );
      restartSockets();
    }
  };

  const readMessage = async (conversation: any) => {
    const data = {
      conversation_id: conversation?._id,
      sender_id: userProfile?._id,
    };
    if (sockets.readyState === WebSocket.OPEN) {
      sockets.send(JSON.stringify(data));
    }
  };

  return (
    <div className="container-fluid chatbot-container">
      <div className="row bg-white">
        {/* Left Sidebar */}
        <div className="col-md-4 col-lg-3 border-end p-0">
          {/* Header */}
          <div className="p-3 border-bottom">
            <h5 className="mb-0">Messages</h5>
          </div>

          {/* Search Bar */}
          <div className="p-3 border-bottom">
            <div className="input-group">
              <span className="input-group-text bg-form border-0">
                <Icon
                  icon="iconamoon:search"
                  className="text-warning"
                  width="18"
                  height="18"
                />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-form"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="conversation-list">
            {conversations?.conversations?.length === 0 ? (
              <EmptyState
                icon="bi bi-chat-dots-fill"
                title="No Messages Yet"
                description="This is where you’ll communicate with brands about campaigns."
                secondaryDescription="Once you apply for a campaign, brands will contact you here."
                buttonText="Explore Campaigns"
                buttonLink="/campaigns"
              />
            ) : (
              conversations?.conversations?.map((chat: any, index: number) => (
                <div
                  id={chat?.Last_Message?.Recipient_ID}
                  onClick={() => {
                    readMessage(chat);
                    setSelectedIds({
                      Recipient_ID: chat?.Last_Message?.Recipient_ID,
                      Message_ID: chat?.Last_Message?.Message_ID,
                      Conversation_Id: chat?._id,
                      Sender_ID: userProfile?._id,
                      Name: chat?.Name,
                      Profile_Image: chat?.Profile_Image,
                    });
                  }}
                  key={index}
                  className={`d-flex align-items-center p-3 border-bottom hover-bg-light cursor-pointer ${
                    selectedIds?.Recipient_ID ===
                    chat?.Last_Message?.Recipient_ID
                      ? "active"
                      : ""
                  }`}
                >
                  <Image
                    src={chat?.Profile_Image || defaultImagePath}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-circle me-2 flex-shrink-0"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fs-14">{chat?.Name || "Anonymous"}</h6>
                    <small className="text-muted line-clamp-1">
                      {chat?.Last_Message?.Message}
                    </small>
                  </div>
                  {chat?.conversation_new_messages > 0 && (
                    <span className="badge bg-danger ms-2">
                      {chat?.conversation_new_messages}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-md-8 col-lg-9 p-0">
          {selectedIds?.Conversation_Id ? (
            <div className="card h-100 border-0">
              {/* Card Header */}
              <div className="card-header bg-white p-3">
                <div className="d-flex align-items-center justify-between">
                  <Image
                    src={selectedIds?.Profile_Image || defaultImagePath}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-circle me-2"
                  />
                  <h6 className="mb-0 fs-14">{selectedIds?.Name}</h6>
                  <button
                    className="btn btn-link text-primary"
                    onClick={() =>
                      toast.info("View Campaign - Feature Coming Soon!")
                    }
                  >
                    View Campaign
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="card-body p-4">
                {messages.map((msg: any, index: number) => (
                  <div key={index} className="mb-3">
                    <div
                      className={`p-3 rounded ${
                        msg.user !== "sender"
                          ? "bg-light"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <small className="text-muted">{msg.timeAgo}</small>
                  </div>
                ))}
                <div ref={endOfMessagesRef}></div>
              </div>

              {/* Message Input */}
              <div className="card-footer bg-white p-3">
                <div className="input-group">
                  <textarea
                    className="form-control border-0 bg-form"
                    placeholder="Type your message..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button className="btn btn-primary" onClick={sendMessage}>
                    <Icon icon="mynaui:send" width={24} height={24} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon="bi bi-chat-dots-fill"
              title="No Messages Yet"
              description="This is where you’ll communicate with brands about campaigns."
              secondaryDescription="Once you apply for a campaign, brands will contact you here."
              buttonText="Explore Campaigns"
              buttonLink="/campaigns"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function InboxWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inbox />
    </Suspense>
  );
}
