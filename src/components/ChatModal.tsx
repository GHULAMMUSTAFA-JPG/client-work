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
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchProfileDataByIds } from "@/@api";
import { defaultImagePath } from "@/components/constants";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  recipientId?: string;
}

const ChatModal = ({ open, onClose, recipientId }: ChatModalProps) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<any[]>([]);
  const { userProfile } = useAuth();
  const socketRef = useRef<WebSocket | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // WebSocket connection
  useEffect(() => {
    if (open && recipientId) {
      setLoading(true);
      setMessages([]); // Clear messages when opening

      // Establish WebSocket connection
      socketRef.current = new WebSocket(`wss://echo.websocket.org/`);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        socketRef.current?.send(JSON.stringify({ type: "join", recipientId }));
      };

      socketRef.current.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, newMessage]);
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
      };

      setLoading(false);
    }

    return () => {
      socketRef.current?.close();
    };
  }, [open, recipientId]);

  // Auto-scroll to latest message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    const newMessage = {
      senderId: userProfile?._id,
      recipientId,
      text: input,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.send(JSON.stringify(newMessage));
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Avatar src={defaultImagePath} sx={{ mr: 1 }} />
          <Typography variant="h6">Chat</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ height: "60vh", overflowY: "auto" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" height="100%">
            <CircularProgress />
          </Box>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                textAlign: msg.senderId === userProfile?._id ? "right" : "left",
                my: 1,
              }}
            >
              <Typography sx={{ p: 1, backgroundColor: "lightgray", borderRadius: 2 }}>
                {msg.text}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No messages yet.</Typography>
        )}
        <div ref={endOfMessagesRef} />
      </DialogContent>

      <DialogActions>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <IconButton onClick={sendMessage} disabled={!input.trim()}>
          <Icon icon="mynaui:send" width={24} height={24} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChatModal;
