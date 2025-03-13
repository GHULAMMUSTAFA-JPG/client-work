// components/SocketProvider.tsx
"use client";

import useNotificationSocket from "@/app/services/useNotificationSocket"; // Adjust path if needed
import { ReactNode, useEffect, useState } from "react";

// Environment configuration
const environment = {
    production: process.env.NODE_ENV === "production",
};

interface SocketProviderProps {
    children: ReactNode;
}

export default function SocketProvider({ children }: SocketProviderProps) {
    const [loggedInUserId, setLoggedInUserId] = useState<string>("default_user");
    const { isConnected, joinGroup } = useNotificationSocket();

    useEffect(() => {
        // Ensure this runs only on the client
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user");
            const userId = userData ? JSON.parse(userData)?._id : "default_user";
            setLoggedInUserId(userId || "default_user");
        }
    }, []);

    useEffect(() => {
        if (isConnected && loggedInUserId !== "default_user") {
            // Register user-specific notifications
            joinGroup({
                userId: loggedInUserId,
                groupId: environment.production
                    ? `synnc_notifs_${loggedInUserId}`
                    : `synnc_notifs_${loggedInUserId}`,
            });

            // Register common notifications
            joinGroup({
                groupId: environment.production ? "synnc_notifs_" : "synnc_notifs_",
            });
        }
    }, [isConnected, joinGroup, loggedInUserId]);

    return <>{children}</>;
}