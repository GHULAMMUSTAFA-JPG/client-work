"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchProfileDataByIds } from "@/@api";
import { defaultImagePath } from "@/components/constants";
import { CampaignAcceptanceCard } from "./CampaignAcceptanceCard";
import { ProposalCard } from "./ProposalCard";

interface ChatModalProps {
  open: boolean;
  onClose: any;
  recipientId?: string;
}

const ChatModal = ({ open, onClose, recipientId }: ChatModalProps) => {
  const [input, setInput] = useState<string>("");
  console.log("input", input);
  const [loading, setLoading] = useState<boolean>(true);
  const [sentMessages, setSentMessages] = useState<any[]>([]);

  const {
    userProfile,
    conversations,
    sockets,
    setSelectedIds,
    selectedIds,
    restartSockets,
  } = useAuth();

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  console.log("currentConversation", currentConversation);
  // Load conversation data when modal opens
  useEffect(() => {
    if (open && recipientId) {
      setLoading(true);

      // Find the conversation that matches the recipient_id
      const conversation = conversations?.conversations?.find(
        (chat: any) => chat?.Last_Message?.Recipient_ID === recipientId
      );

      setCurrentConversation(conversation);

      // Set selected IDs for context
      setSelectedIds({
        Recipient_ID: recipientId,
        Conversation_Id: conversation?._id || null,
        Name: conversation?.Name || null,
        Profile_Image: conversation?.Profile_Image || null,
        Sender_ID: userProfile?._id,
      });

      // If no conversation found, fetch profile data
      if (!conversation) {
        fetchProfileDataByIds(recipientId, setSelectedIds);
      }

      // Mark as read if there's a conversation
      // if (conversation) {
      //   readMessage(currentConversation);
      // }

      setLoading(false);
      setSentMessages([]);
    }
  }, [open, recipientId, conversations]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation, sentMessages]);

  // Mark message as read
  const readMessage = async (conversation: any) => {
    const data = {
      conversation_id: conversation?._id,
      sender_id: userProfile?._id,
    };
    if (sockets && sockets.readyState === WebSocket.OPEN) {
      sockets.send(JSON.stringify(data));
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageId = Date.now().toString();
    const newMessage = {
      Message: input,
      Message_Type: "conversation_message",
      Time_Ago: "Just now",
      user: "sender",
      messageId: messageId,
    };

    setSentMessages((prev) => [...prev, newMessage]);

    const data = JSON.stringify({
      recipient_id: selectedIds?.Recipient_ID || recipientId,
      message: input,
      message_id: messageId,
    });

    if (sockets && sockets.readyState === WebSocket.OPEN) {
      sockets.send(data);
      setInput("");
    } else {
      alert(
        "Error while connecting. Please check your connection and try again"
      );
      restartSockets();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(setSelectedIds)}
      fullWidth
      disableEnforceFocus
      maxWidth="sm"
      PaperProps={{
        sx: {
          height: "70vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #eee", p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            {selectedIds?.Profile_Image ? (
              <Avatar
                src={selectedIds.Profile_Image}
                alt={selectedIds?.Name || "User"}
                sx={{ mr: 1 }}
              />
            ) : (
              <Avatar sx={{ mr: 1 }}>
                {selectedIds?.Name ? selectedIds.Name.charAt(0) : "U"}
              </Avatar>
            )}
            <Typography variant="h6">{selectedIds?.Name || "Chat"}</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            {/* <CloseIcon /> */}
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {currentConversation ? (
              (() => {
                // Extract creator_id for future use
                const creator_id = currentConversation.Creator_ID;

                return currentConversation.messages?.map(
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
                              msg.user !== "sender" ? "" : " text-white ms-auto"
                            }`}
                          >
                            <ProposalCard
                              Campaign_ID={msg.Post_Details.Campaign_ID}
                              Post_ID={msg.Post_Details.Post_ID}
                              creator_id={creator_id}
                              campaignName={msg.Post_Details.Campaign_Headline}
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
                      ) : msg.Message_Type == "campaign_creator_accepted" ? (
                        <div
                          className={`mb-3 ${
                            msg.user !== "sender"
                              ? ""
                              : "d-flex justify-content-end flex-column"
                          }`}
                        >
                          <div
                            className={`p-3 rounded d-inline-block ${
                              msg.user !== "sender" ? "" : "text-white ms-auto"
                            }`}
                          >
                            <CampaignAcceptanceCard
                              campaignName={
                                msg.Campaign_Details.Campaign_Headline
                              }
                              campaignLink="https://example.com"
                              acceptanceDate={msg.Timestamp}
                              campaignid={msg.Campaign_Details.Campaign_ID}
                              name={selectedIds?.Name}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                );
              })()
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography color="text.secondary">No messages yet</Typography>
              </Box>
            )}
            {sentMessages.map((msg, index) => (
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

            <div ref={endOfMessagesRef} />
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          display="flex"
          width="100%"
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            size="small"
            sx={{ mr: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <Icon icon="mynaui:send" width={24} height={24} />
          </button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ChatModal;
