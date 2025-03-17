// // hooks/useNotificationSocket.tsx
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import socketService, { NotificationData, NotificationEventType } from '../services/socketService';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';

// type Socket = ReturnType<typeof io>;

// interface JoinData {
//     userId?: string;
//     groupId: string;
// }

// interface SocketHookReturn {
//     isConnected: boolean;
//     joinGroup: (joinData: JoinData) => void;
// }

// interface SocketHookOptions {
//     onNotification?: (data: NotificationData) => void; // Optional callback for notifications
// }

// function useNotificationSocket(options: SocketHookOptions = {}): SocketHookReturn {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [isConnected, setIsConnected] = useState<boolean>(false);
//     const router = useRouter();
//     const { onNotification } = options;

//     useEffect(() => {
//         const socketInstance = socketService.connect();
//         setSocket(socketInstance);
//         setIsConnected(socketService.isConnected());

//         socketInstance.on('connect', () => {
//             setIsConnected(true);
//         });

//         socketInstance.on('disconnect', () => {
//             setIsConnected(false);
//         });

//         socketService.listenForUserNotifications<any>((data) => {
//             console.log('User notification:', data);
//         });

//         socketService.listenForCommonNotifications((data: NotificationData) => {
//             console.log('Notification data:', data);
//             const { event_type, message } = data.m.OtherFields;
//             const { Campaign_ID, Creator_ID, Post_ID } = data.m.OtherFields.meta_data;

//             // Construct the URL
//             const url = `/campaign-details/${Campaign_ID}?tab=in_campaign&creator=${Creator_ID}&post=${Post_ID}`;

//             // Define the toast message with navigation
//             const toastMessage = (prefix: string) => (
//                 <div
//                     title='Click to visit campaign'
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => {
//                         if (onNotification) {
//                             onNotification(data); // Call the callback with notification data
//                         }
//                         router.push(url); // Navigate by default
//                     }}
//                 >
//                     {`${message}`}
//                 </div>
//             );

//             // Show toast based on event_type
//             switch (event_type) {
//                 case NotificationEventType.CampaignPostCreated:
//                     toast.success(toastMessage('Campaign Post Created'));
//                     break;
//                 case NotificationEventType.CampaignPostProposalAccepted:
//                     toast.success(toastMessage('Proposal Accepted'));
//                     break;
//                 case NotificationEventType.CampaignPostProposalRejected:
//                     toast.success(toastMessage('Proposal Rejected'));
//                     break;
//                 case NotificationEventType.PaymentSucceeded:
//                     toast.success(toastMessage('Payment Succeeded'));
//                     break;
//                 default:
//                     toast.success(toastMessage('Notification'));
//                     break;
//             }
//         });

//         return () => {
//             socketService.removeUserNotificationListener();
//             socketService.removeCommonNotificationListener();
//         };
//     }, [router, onNotification]); // Add onNotification to dependencies

//     const joinGroup = (joinData: JoinData): void => {
//         socketService.emitJoinData(joinData);
//     };

//     return {
//         isConnected,
//         joinGroup,
//     };
// }

// export default useNotificationSocket;

import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import socketService, { NotificationData, NotificationEventType } from "../services/socketService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Socket = ReturnType<typeof io>;

interface JoinData {
    userId?: string;
    groupId: string;
}

interface SocketHookReturn {
    isConnected: boolean;
    joinGroup: (joinData: JoinData) => void;
}

interface SocketHookOptions {
    onNotification?: (data: NotificationData) => void;
}

function useNotificationSocket(options: SocketHookOptions = {}): SocketHookReturn {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const router = useRouter();
    const { onNotification } = options;

    // Use useCallback to memoize the onNotification handler
    const handleNotification = useCallback((data: NotificationData) => {
        console.log("Handle Notification in useNotificationSocket:", data);
        if (onNotification) {
            console.log("Calling onNotification callback");
            onNotification(data);
        }
    }, [onNotification]);

    useEffect(() => {
        const socketInstance = socketService.connect();
        setSocket(socketInstance);
        setIsConnected(socketService.isConnected());

        socketInstance.on("connect", () => {
            setIsConnected(true);
            console.log("Socket connected in useNotificationSocket:", socketInstance.id);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
            console.log("Socket disconnected in useNotificationSocket");
        });

        // Set up the notification listener with the memoized handler
        socketService.listenForCommonNotifications((data: NotificationData) => {
            console.log("Common notification received in useNotificationSocket:", data);
            handleNotification(data); // Use the memoized handler

            // Toast logic
            const { event_type, message } = data.m.OtherFields;
            const { Campaign_ID, Creator_ID, Post_ID } = data.m.OtherFields.meta_data;

            const url = `/campaign-details/${Campaign_ID}?tab=in_campaign&creator=${Creator_ID}&post=${Post_ID}`;

            const toastMessage = (prefix: string) => (
                <div
                    title="Click to visit campaign"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        router.push(url);
                    }}
                >
                    {`${message}`}
                </div>
            );

            switch (event_type) {
                case NotificationEventType.CampaignPostCreated:
                    // toast.success(toastMessage("Campaign Post Created"));
                    break;
                case NotificationEventType.CampaignPostProposalAccepted:
                    // toast.success(toastMessage("Proposal Accepted"));
                    break;
                case NotificationEventType.CampaignPostProposalRejected:
                    // toast.success(toastMessage("Proposal Rejected"));
                    break;
                case NotificationEventType.PaymentSucceeded:
                    // toast.success(toastMessage("Payment Succeeded"));
                    break;
                default:
                    // toast.success(toastMessage("Notification"));
                    break;
            }
        });

        return () => {
            socketService.removeCommonNotificationListener();
        };
    }, [router, handleNotification]); // Include handleNotification in dependencies

    const joinGroup = (joinData: JoinData): void => {
        socketService.emitJoinData(joinData);
    };

    return {
        isConnected,
        joinGroup,
    };
}

export default useNotificationSocket;