import axios, { AxiosResponse } from 'axios';
import { getFromCookie } from '../utils/cookies';
export const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

let token = getFromCookie('token');

const language = getFromCookie('language');

api.interceptors.request.use(
	function (config) {
		config.headers.Authorization = token ? token : undefined;
		config.headers['Accept-Language'] = language ? language : 'uz';
		config.headers['X-Device-Id'] = getFromCookie('uid');
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(function (response: AxiosResponse) {
	const newToken = response.data?.token;
	if (newToken) {
		token = newToken;
	}
	return response;
});
