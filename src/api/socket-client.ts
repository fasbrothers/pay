import { io, Socket } from 'socket.io-client';
import { getFromCookie } from '../utils/cookies';

const url = new URL(import.meta.env.VITE_REACT_APP_API_URL);

export const socket: Socket = io(url.origin, {
	path: url.pathname + 'socket.io',
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
