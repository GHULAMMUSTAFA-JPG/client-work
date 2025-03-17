// // components/SocketProvider.tsx
// "use client";

// import useNotificationSocket from "@/app/services/useNotificationSocket"; // Adjust path if needed
// import { ReactNode, useEffect, useState } from "react";

// // Environment configuration
// const environment = {
//     production: process.env.NODE_ENV === "production",
// };

// interface SocketProviderProps {
//     children: ReactNode;
// }

// export default function SocketProvider({ children }: SocketProviderProps) {
//     const [loggedInUserId, setLoggedInUserId] = useState<string>("default_user");
//     const { isConnected, joinGroup } = useNotificationSocket();

//     useEffect(() => {
//         // Ensure this runs only on the client
//         if (typeof window !== "undefined") {
//             let userData: any
//             userData = localStorage.getItem("user");
//             //for creator api will send uuid and for branch _id
//             let userId = userData ? JSON.parse(userData)?._id : null;
//             if (!userId) {
//                 userId = userData ? JSON.parse(userData)?.uuid : null
//             }
//             console.log(userId, "userId");
//             setLoggedInUserId(userId || "default_user");
//         }
//     }, []);

//     useEffect(() => {
//         console.log('loggedInUserId out', loggedInUserId)
//         console.log('isConnected out', isConnected)
//         if (isConnected && loggedInUserId !== "default_user") {
//             console.log('loggedInUserId in', loggedInUserId)
//             console.log('isConnected in', isConnected)
//             // Register user-specific notifications
//             joinGroup({
//                 userId: loggedInUserId,
//                 groupId: `synnc_notifs_${loggedInUserId}`,
//             });

//             // Register common notifications
//             joinGroup({
//                 groupId: `synnc_notifs_${loggedInUserId}`,
//             });
//         }
//     }, [isConnected, joinGroup, loggedInUserId]);

//     return <>{children}</>;
// }

"use client";

import useNotificationSocket from "@/app/services/useNotificationSocket"; // Adjust path if needed
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Import AuthContext to access user data

// Environment configuration
const environment = {
    production: process.env.NODE_ENV === "production",
};

interface SocketProviderProps {
    children: ReactNode;
}

export default function SocketProvider({ children }: SocketProviderProps) {
    const { user, userProfile } = useAuth(); // Access user data from AuthContext
    const [loggedInUserId, setLoggedInUserId] = useState<string>("default_user");
    const { isConnected, joinGroup } = useNotificationSocket();

    useEffect(() => {
        // Ensure this runs only on the client
        if (typeof window !== "undefined") {
            let userData: any = localStorage.getItem("user");
            let userId = userData ? JSON.parse(userData)?._id : null;
            if (!userId) {
                userId = userData ? JSON.parse(userData)?.uuid : null;
            }
            console.log("User ID from localStorage:", userId);
            setLoggedInUserId(userId || "default_user");

            // Fallback to userProfile if available (from AuthContext)
            if (userProfile?._id) {
                setLoggedInUserId(userProfile._id);
            }
        }
    }, [user, userProfile]); // Depend on user and userProfile to update when they change

    useEffect(() => {
        console.log("loggedInUserId out:", loggedInUserId);
        console.log("isConnected out:", isConnected);
        if (isConnected && loggedInUserId !== "default_user") {
            console.log("loggedInUserId in:", loggedInUserId);
            console.log("isConnected in:", isConnected);
            // Register user-specific notifications
            joinGroup({
                userId: `synnc_notifs_${loggedInUserId}`,
                groupId: `synnc_notifs_${loggedInUserId}`,
            });

            // Optionally register a common group (if needed)
            // joinGroup({
            //   groupId: "common_notifications",
            // });
        }
    }, [isConnected, joinGroup, loggedInUserId]);

    return <>{children}</>;
}