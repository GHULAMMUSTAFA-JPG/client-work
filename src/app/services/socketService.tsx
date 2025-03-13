// // services/socketService.tsx
// import { io, Socket } from 'socket.io-client';

// class SocketService {
//     private socket: Socket | null = null;
//     private connected: boolean = false;

//     connect(): Socket {
//         if (!this.socket) {
//             this.socket = io('https://notif-v2-ws.social27.com/', {
//                 path: '/socket.io',
//                 transports: ['websocket'],
//                 query: {
//                     EIO: '3'
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
// }

// const socketService = new SocketService();
// export default socketService;


// services/socketService.tsx
import io from 'socket.io-client';

// Define Socket type based on the return type of io
type Socket = ReturnType<typeof io>;

class SocketService {
    private socket: Socket | null = null;
    private connected: boolean = false;

    connect(): Socket {
        if (!this.socket) {
            this.socket = io('https://notif-v2-ws.social27.com/', {
                path: '/socket.io',
                transports: ['websocket'],
                query: {
                    EIO: '3' // Matches Engine.IO v3, used by Socket.IO v2
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

    getSocket(): Socket | null {
        return this.socket;
    }

    isConnected(): boolean {
        return this.connected;
    }
}

const socketService = new SocketService();
export default socketService;