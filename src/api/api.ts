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
		config.headers['Accept-Language'] =
			getFromCookie('language') || navigator.language || 'en';
		config.headers['X-Device-Id'] = getFromCookie('uid');
		return config;
	},
	function (error) {
		console.log('error');
		return Promise.reject(error);
	}
);

httpClient.interceptors.response.use(
	function (response: AxiosResponse) {
		return response;
	},
	function (error) {
		if (error.response.data.status === 401) {
			store.dispatch(deleteToken());
		}
		return Promise.reject(error);
	}
);
