import { io, Socket } from 'socket.io-client';
import { getFromCookie } from '../utils/cookies';

export const socket: Socket = io(import.meta.env.VITE_REACT_APP_API_URL, {
	autoConnect: false,
	transportOptions: {
		polling: {
			extraHeaders: {
				deviceId: getFromCookie('uid'),
			},
		},
	},
});

export const connectSocket = () => {
	socket.connect();
};

export const disconnectSocket = () => {
	socket.disconnect();
};
