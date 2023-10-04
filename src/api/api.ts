import axios, { AxiosResponse } from 'axios';
import { getFromCookie } from '../utils/cookies';
import { store } from '../store/store.ts';
import { deleteToken, getToken } from '../store/slices/authSlice.ts';

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

httpClient.interceptors.request.use(
	function (config) {
		const token = getToken(store.getState());

		config.headers.Authorization = token ? token : undefined;
		config.headers['Accept-Language'] = getFromCookie('language') || 'uz';
		config.headers['X-Device-Id'] = getFromCookie('uid');
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

httpClient.interceptors.response.use(function (response: AxiosResponse) {
	if (response.data.type === 'EXPIRED_TOKEN') {
		store.dispatch(deleteToken()); // another way, not to use useDispatch
		console.log('expired token');
	}
	return response;
});
