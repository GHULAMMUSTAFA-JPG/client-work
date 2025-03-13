// // hooks/useNotificationSocket.tsx
// import { useEffect, useState } from 'react';
// import { Socket } from 'socket.io-client';
// import socketService from '../services/socketService';

// interface SocketHookReturn {
//     socket: Socket | null;
//     isConnected: boolean;
//     emitEvent: (event: string, data: unknown) => void;
// }

// function useNotificationSocket<T>(
//     eventName: string,
//     callback: (data: T) => void
// ): SocketHookReturn {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [isConnected, setIsConnected] = useState<boolean>(false);

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

//         if (eventName && callback) {
//             socketInstance.on(eventName, callback);
//         }

//         return () => {
//             if (eventName && callback) {
//                 socketInstance.off(eventName, callback);
//             }
//         };
//     }, [eventName, callback]);

//     const emitEvent = (event: string, data: unknown): void => {
//         if (socket && isConnected) {
//             socket.emit(event, data);
//         }
//     };

//     return {
//         socket,
//         isConnected,
//         emitEvent,
//     };
// }

// export default useNotificationSocket;



// hooks/useNotificationSocket.tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import socketService from '../services/socketService';

// Define Socket type based on the return type of io
type Socket = ReturnType<typeof io>;

interface SocketHookReturn {
    socket: Socket | null;
    isConnected: boolean;
    emitEvent: (event: string, data: unknown) => void;
}

function useNotificationSocket<T>(
    eventName: string,
    callback: (data: T) => void
): SocketHookReturn {
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

        if (eventName && callback) {
            socketInstance.on(eventName, callback);
        }

        return () => {
            if (eventName && callback) {
                socketInstance.off(eventName, callback);
            }
        };
    }, [eventName, callback]);

    const emitEvent = (event: string, data: unknown): void => {
        if (socket && isConnected) {
            socket.emit(event, data);
        }
    };

    return {
        socket,
        isConnected,
        emitEvent,
    };
}

export default useNotificationSocket;