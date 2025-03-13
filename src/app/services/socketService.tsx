

// // services/socketService.tsx
// import io from 'socket.io-client';

// // Define Socket type based on the return type of io
// type Socket = ReturnType<typeof io>;

// // Define JoinData payload structure
// interface JoinData {
//     userId?: string;
//     groupId: string;
// }

// class SocketService {
//     private socket: Socket | null = null;
//     private connected: boolean = false;

//     connect(): Socket {
//         if (!this.socket) {
//             this.socket = io('https://notif-v2-ws.social27.com/', {
//                 path: '/socket.io',
//                 transports: ['websocket'],
//                 query: {
//                     EIO: '3' // Matches Engine.IO v3, used by Socket.IO v2
//                 }
//             });

//             this.socket.on('connect', () => {
//                 this.connected = true;
//                 console.log('Socket connected:', this.socket?.id);
//             });

//             this.socket.on('disconnect', () => {
//                 this.connected = false;
//                 console.log('Socket disconnected');
//             });

//             this.socket.on('connect_error', (error: Error) => {
//                 console.error('Socket connection error:', error);
//             });
//         }
//         return this.socket;
//     }

//     disconnect(): void {
//         if (this.socket) {
//             this.socket.disconnect();
//             this.socket = null;
//             this.connected = false;
//         }
//     }

//     getSocket(): Socket | null {
//         return this.socket;
//     }

//     isConnected(): boolean {
//         return this.connected;
//     }

//     // Emit joinData to register for a group
//     emitJoinData(joinData: JoinData): void {
//         if (this.socket && this.connected) {
//             this.socket.emit('joinData', joinData);
//             console.log('Joined group:', joinData);
//         } else {
//             console.warn('Socket not connected. Cannot join group.');
//         }
//     }

//     // Listen for userNotification events
//     listenForUserNotifications<T>(callback: (data: T) => void): void {
//         if (this.socket) {
//             this.socket.on('userNotification', (data: T) => {
//                 console.log('User notification received:', data);
//                 callback(data);
//             });
//         }
//     }

//     // Listen for commonNotification events
//     listenForCommonNotifications<T>(callback: (data: T) => void): void {
//         if (this.socket) {
//             this.socket.on('commonNotification', (data: T) => {
//                 console.log('Common notification received:', data);
//                 callback(data);
//             });
//         }
//     }

//     // Remove specific listeners (for cleanup)
//     removeUserNotificationListener(): void {
//         if (this.socket) {
//             this.socket.off('userNotification');
//         }
//     }

//     removeCommonNotificationListener(): void {
//         if (this.socket) {
//             this.socket.off('commonNotification');
//         }
//     }
// }

// const socketService = new SocketService();
// export default socketService;


// services/socketService.tsx
// services/socketService.tsx
import io from 'socket.io-client';

type Socket = ReturnType<typeof io>;

interface JoinData {
    userId?: string;
    groupId: string;
}

export enum NotificationEventType {
    CampaignPostCreated = "campaign_post_created",
    CampaignPostContentUpdated = "campaign_post_content_updated",
    CampaignPostContentCreated = "campaign_post_content_created",
    CampaignPostProposalAccepted = "campaign_post_proposal_accepted",
    CampaignPostProposalRejected = "campaign_post_proposal_rejected",
    CampaignLiveLinkGenerated = "campaign_live_link_generated",
    PostImpressionPosted = "post_impression_posted",
    CampaignPostUpdated = "campaign_post_updated",
    CampaignPostDeleted = "campaign_post_deleted",
    PaymentInitiated = "payment_initiated",
    PaymentSucceeded = "payment_succeeded",
    ContentStatusUpdated = "content_status_updated",
    ApplyCampaign = "apply_campaign",
    CampaignApplicationApproved = "campaign_application_approved",
}

interface NotificationData {
    m: {
        OtherFields: {
            message: string;
            sender_id: string;
            receiver_id: string;
            meta_data: Record<string, any>;
            notification_icon_type: string;
            event_type: NotificationEventType;
            title: string;
            hyperlink: string;
        };
        eventType: string | null;
    };
    id: string;
}

class SocketService {
    private socket: Socket | null = null;
    private connected: boolean = false;

    connect(): Socket {
        if (!this.socket) {
            this.socket = io('https://notif-v2-ws.social27.com/', {
                path: '/socket.io',
                transports: ['websocket'],
                query: {
                    EIO: '3'
                }
            });

            this.socket.on('connect', () => {
                this.connected = true;
                console.log('Socket connected:', this.socket?.id);
            });

            this.socket.on('disconnect', () => {
                this.connected = false;
                console.log('Socket disconnected');
            });

            this.socket.on('connect_error', (error: Error) => {
                console.error('Socket connection error:', error);
            });
        }
        return this.socket;
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
        }
    }

    isConnected(): boolean {
        return this.connected;
    }

    emitJoinData(joinData: JoinData): void {
        if (this.socket && this.connected) {
            this.socket.emit('joinData', joinData);
            console.log('Joined group:', joinData);
        }
    }

    listenForUserNotifications<T>(callback: (data: T) => void): void {
        if (this.socket) {
            this.socket.on('userNotification', (data: T) => {
                console.log('User notification:', data);
                callback(data);
            });
        }
    }

    listenForCommonNotifications(callback: (data: NotificationData) => void): void {
        if (this.socket) {
            this.socket.on('commonNotification', (...args: any[]) => {
                console.log('Common notification raw args:', args);
                // The data is in args[0], not a nested array
                const notificationData = args[0];
                if (notificationData && typeof notificationData === 'object') {
                    callback(notificationData as NotificationData);
                } else {
                    console.error('Unexpected notification format:', notificationData);
                }
            });
        }
    }

    removeUserNotificationListener(): void {
        if (this.socket) {
            this.socket.off('userNotification');
        }
    }

    removeCommonNotificationListener(): void {
        if (this.socket) {
            this.socket.off('commonNotification');
        }
    }
}

const socketService = new SocketService();
export default socketService;
export type { NotificationData };