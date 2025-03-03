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
import { CampaignAcceptanceCard } from "@/components/CampaignAcceptanceCard";
import { ProposalCard } from "@/components/ProposalCard";
import { ApprovedCard } from "@/components/ApprovedCard";

const Inbox = () => {
  const [input, setInput] = useState<string>("");
  const {
    userProfile,
    conversations,
    sockets,
    setSelectedIds,
    selectedIds,
    restartSockets,
  } = useAuth();
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [conversationstate, setconversationstate] = useState(
    conversations?.conversations
  );
  const [sentmessagesarray, setsentmessagesarray] = useState<any>([]);
  console.log("sentmessagesarray", sentmessagesarray);
  const searchParams = useSearchParams();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  console.log("conversations", conversations);
  console.log("conversationstate", conversationstate);

  useEffect(() => {
    console.log("useeefffff");

    if (conversations) {
      // Find current conversation
      const currentConversation = conversations?.conversations?.find(
        (chat: any) =>
          chat?.Last_Message?.Recipient_ID === selectedIds?.Recipient_ID
      );

      // Get messages from current conversation
      const currentMessages = currentConversation?.messages || [];

      // Filter out messages from sentmessagesarray that exist in the current conversation
      const updatedSentMessages = sentmessagesarray.filter((sentMsg: any) => {
        // Check if message with the same messageId exists in the conversation messages
        const messageExists = currentMessages.some(
          (convMsg: any) => convMsg.Frontend_Message_ID === sentMsg.messageId
        );

        // Keep the message in sentmessagesarray only if it doesn't exist in the conversation
        return !messageExists;
      });

      console.log("updatedSentMessages", updatedSentMessages);
      setsentmessagesarray(updatedSentMessages);
      setconversationstate(conversations?.conversations);
    }
  }, [conversations, selectedIds?.Recipient_ID]);

  useEffect(() => {
    setsentmessagesarray([]);
  }, [selectedIds]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      // Find the conversation that matches the recipient_id
      const conversation = conversationstate?.find(
        (chat: any) => chat?.Last_Message?.Recipient_ID === id
      );

      setSelectedIds((prev: any) => ({
        ...prev,
        Recipient_ID: id,
        Conversation_Id: conversation?._id || null,
        Name: conversation?.Name || null,
        Profile_Image: conversation?.Profile_Image || null,
      }));

      fetchProfileDataByIds(id, setSelectedIds);
    }
  }, [searchParams]);

  const sendMessage = async () => {
    console.log("send called");
    const messageId = Date.now().toString();
    const newMessage = {
      Message: input,
      Message_Type: "conversation_message",
      Time_Ago: "",
      user: "sender",
      messageId: messageId,
    };
    setsentmessagesarray((prev: any) => [...prev, newMessage]);

    const data = JSON.stringify({
      recipient_id: selectedIds?.Recipient_ID,
      message: input,
      message_id: messageId,
    });
    if (sockets && sockets.readyState === WebSocket.OPEN) {
      setconversationstate((prev: any) => {
        return prev.map((chat: any) => {
          if (chat?.Last_Message?.Recipient_ID === selectedIds.Recipient_ID) {
            return {
              ...chat,
              messages: [...chat.messages],
            };
          }
          return chat;
        });
      });

      sockets.send(data);
      setInput("");
    } else {
      toast.warn(
        "Error while connecting. Please check your connection and try again"
      );
      restartSockets();
    }
  };

  useEffect(() => {
    const currentConversation = conversationstate?.find(
      (chat: any) =>
        chat?.Last_Message?.Recipient_ID === selectedIds.Recipient_ID
    );

    if (
      selectedIds.Recipient_ID &&
      currentConversation?.conversation_new_messages > 0
    ) {
      const data = {
        conversation_id: currentConversation._id,
        sender_id: userProfile?._id,
      };
      if (sockets.readyState === WebSocket.OPEN) {
        sockets.send(JSON.stringify(data));
      }
    }
  }, [conversationstate]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedIds?.Recipient_ID, conversationstate]);

  const readMessage = async (conversation: any) => {
    const data = {
      conversation_id: conversation?._id,
      sender_id: userProfile?._id,
    };
    if (sockets.readyState === WebSocket.OPEN) {
      sockets.send(JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (conversations?.conversations) {
      if (searchText) {
        const filteredConversations = conversations.conversations.filter(
          (chat: any) =>
            chat?.Name.toLowerCase().includes(searchText.toLowerCase())
        );
        setconversationstate(filteredConversations);
      } else {
        setconversationstate(conversations.conversations);
      }
    }
  }, [searchText, conversations?.conversations]);

  return (
    <div className="container-fluid chatbot-container">
      <div className="row bg-white">
        {/* Left Sidebar */}
        <div className="col-md-4 col-lg-3 border-end p-0">
          <div className="p-3 border-bottom">
            <h5 className="mb-0">Messages</h5>
          </div>

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

          <div className="conversation-list">
            {conversationstate?.length === 0 ? (
              <EmptyState
                icon="bi bi-chat-dots-fill"
                title="No Messages Yet"
                description="This is where you'll communicate with brands about campaigns."
                secondaryDescription="Once you apply for a campaign, brands will contact you here."
                buttonText="Explore Campaigns"
                buttonLink="/campaigns"
              />
            ) : (
              conversationstate?.map((chat: any, index: number) => (
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
                  <img
                    src={
                      chat?.Profile_Image ||
                      "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"
                    }
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
          {selectedIds?.Recipient_ID ? (
            <div className="card h-100 border-0">
              <div className="card-header bg-white p-3">
                <div className="d-flex align-items-center justify-between">
                  {selectedIds?.Profile_Image && (
                    <img
                      src={selectedIds?.Profile_Image || defaultImagePath}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-circle me-2"
                    />
                  )}
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

              <div className="card-body p-4">
                {conversationstate &&
                  (() => {
                    const currentConversation = conversationstate.find(
                      (chat: any) =>
                        chat?.Last_Message?.Recipient_ID ===
                        selectedIds?.Recipient_ID
                    );

                    // If there's no conversation, return null
                    if (!currentConversation) return null;

                    // Get the creator_id from the conversation (outside the messages array)
                    const creator_id = currentConversation.Creator_ID; //
                    return currentConversation?.messages.map(
                      (msg: any, index: number) => (
                        <div key={index}>
                          {msg.Message_Type == "conversation_message" ? (
                            <div
                              className={`mb-3 ${
                                msg.user !== "sender"
                                  ? ""
                                  : "d-flex justify-content-end flex-column"
                              }`}
                            >
                              <div
                                className={`p-3 rounded d-inline-block ${
                                  msg.user !== "sender"
                                    ? "bg-light"
                                    : "bg-primary text-white ms-auto"
                                }`}
                              >
                                {msg.Message}
                              </div>
                              <small className="text-muted d-block ms-auto">
                                {msg.Time_Ago}
                              </small>
                            </div>
                          ) : msg.Message_Type == "campaign_post_proposal" ? (
                            <div
                              className={`mb-3 ${
                                msg.user !== "sender"
                                  ? ""
                                  : "d-flex justify-content-end flex-column"
                              }`}
                            >
                              <div
                                className={`p-3 rounded d-inline-block ${
                                  msg.user !== "sender"
                                    ? ""
                                    : " text-white ms-auto"
                                }`}
                              >
                                <ProposalCard
                                  Campaign_ID={msg.Post_Details.Campaign_ID}
                                  Post_ID={msg.Post_Details.Post_ID}
                                  creator_id={creator_id}
                                  campaignName={
                                    msg.Post_Details.Campaign_Headline
                                  }
                                  postTitle={msg.Post_Details.Post_Title}
                                  amount={msg.Post_Details.Budget}
                                  submissionDate={msg.Post_Details.Created_At}
                                  status={
                                    msg.Post_Details.Proposal_Status == 1
                                      ? "pending"
                                      : msg.Post_Details.Proposal_Status == 2
                                      ? "approved"
                                      : "rejected"
                                  }
                                  rules={msg.Post_Details.Post_Description}
                                />
                              </div>
                            </div>
                          ) : msg.Message_Type ==
                            "campaign_creator_accepted" ? (
                            <div
                              className={`mb-3 ${
                                msg.user !== "sender"
                                  ? ""
                                  : "d-flex justify-content-end flex-column"
                              }`}
                            >
                              <div
                                className={`p-3 rounded d-inline-block ${
                                  msg.user !== "sender"
                                    ? ""
                                    : "text-white ms-auto"
                                }`}
                              >
                                <CampaignAcceptanceCard
                                  campaignName={
                                    msg.Campaign_Details.Campaign_Headline
                                  }
                                  campaignLink="https://example.com"
                                  acceptanceDate={msg.Timestamp}
                                  campaignid={msg.Campaign_Details.Campaign_ID}
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )
                    );
                  })()}
                {sentmessagesarray.map((msg: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`mb-3 ${
                        msg.user !== "sender"
                          ? ""
                          : "d-flex justify-content-end flex-column"
                      }`}
                    >
                      <div
                        className={`p-3 rounded d-inline-block ${
                          msg.user !== "sender"
                            ? "bg-light"
                            : "bg-primary text-white ms-auto"
                        }`}
                      >
                        {msg.Message}
                      </div>
                      <small className="text-muted d-block ms-auto">
                        {msg.Time_Ago}
                      </small>
                    </div>
                  </div>
                ))}

                {/* <ApprovedCard
                  campaignName="Approved Campaign"
                  postTitle=""
                  amount={0}
                  submissionDate=""
                  status="approved"
                /> */}
                <div ref={endOfMessagesRef}></div>
              </div>

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
              description="This is where you'll communicate with brands about campaigns."
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
