import axios, { AxiosResponse } from 'axios';
import { getFromCookie } from '../utils/cookies';

export const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

const token = getFromCookie('token');

api.interceptors.request.use(
	function (config) {
		// Add auth token to requests
		config.headers.Authorization = token ? token : undefined;
		config.headers['Accept-Language'] = 'uz';
		config.headers['X-Device-Id'] = getFromCookie('uid');
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (response: AxiosResponse) {
		// Handle success
		return response;
	},
	function (error) {
		// Handle error
		return error?.response?.data || error.message;
	}
);
