// hooks/useNotificationSocket.tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import socketService, { NotificationData, NotificationEventType } from '../services/socketService';
import { toast } from 'react-toastify';

type Socket = ReturnType<typeof io>;

interface JoinData {
    userId?: string;
    groupId: string;
}

interface SocketHookReturn {
    isConnected: boolean;
    joinGroup: (joinData: JoinData) => void;
}

function useNotificationSocket(): SocketHookReturn {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const socketInstance = socketService.connect();
        setSocket(socketInstance);
        setIsConnected(socketService.isConnected());

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        socketService.listenForUserNotifications<any>((data) => {
            console.log('User notification:', data);
        });

        socketService.listenForCommonNotifications((data: NotificationData) => {
            console.log('Notification data:', data);
            const { event_type, message } = data.m.OtherFields;
            switch (event_type) {
                case NotificationEventType.CampaignPostCreated:
                    toast.success(`Campaign Post Created: ${message}`);
                    break;
                case NotificationEventType.CampaignPostProposalAccepted:
                    toast.success(`Proposal Accepted: ${message}`);
                    break;
                case NotificationEventType.CampaignPostProposalRejected:
                    toast.success(`Proposal Rejected: ${message}`);
                    break;
                case NotificationEventType.PaymentSucceeded:
                    toast.success(`Payment Succeeded: ${message}`);
                    break;
                default:
                    toast.success(`Notification: ${message}`);
                    break;
            }
        });

        return () => {
            socketService.removeUserNotificationListener();
            socketService.removeCommonNotificationListener();
        };
    }, []);

    const joinGroup = (joinData: JoinData): void => {
        socketService.emitJoinData(joinData);
    };

    return {
        isConnected,
        joinGroup,
    };
}

export default useNotificationSocket;