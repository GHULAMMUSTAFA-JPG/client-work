"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/contexts/AuthContext";

export default function ChatApp() {
  const { userProfile } = useAuth();
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<any>("");

  useEffect(() => {
    console.log(userProfile, "userProfile");
  }, [userProfile]);
  const socket = io(
    `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/message/${userProfile?._id}`
  );

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div>
      <h1>Real-Time Chat App</h1>
      <div>
        {messages.map((msg: string, index: number) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
