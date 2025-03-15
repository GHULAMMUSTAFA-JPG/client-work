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
            let userData: any
            userData = localStorage.getItem("user");
            //for creator api will send uuid and for branch _id
            let userId = userData ? JSON.parse(userData)?._id : null;
            if (!userId) {
                userId = userData ? JSON.parse(userData)?.uuid : null
            }
            console.log(userId, "userId");
            setLoggedInUserId(userId || "default_user");
        }
    }, []);

    useEffect(() => {
        console.log('loggedInUserId out', loggedInUserId)
        console.log('isConnected out', isConnected)
        if (isConnected && loggedInUserId !== "default_user") {
            console.log('loggedInUserId in', loggedInUserId)
            console.log('isConnected in', isConnected)
            // Register user-specific notifications
            joinGroup({
                userId: loggedInUserId,
                groupId: environment.production
                    ? `synnc_notifs_${loggedInUserId}`
                    : `synnc_notifs_${loggedInUserId}`,
            });

            // Register common notifications
            joinGroup({
                groupId: environment.production ? `synnc_notifs_${loggedInUserId}` : `synnc_notifs_${loggedInUserId}`,
            });
        }
    }, [isConnected, joinGroup, loggedInUserId]);

    return <>{children}</>;
}