import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

const token = localStorage.getItem('token');

api.interceptors.request.use(
	function (config) {
		// Add auth token to requests
		config.headers.Authorization = token ? token : undefined;
		config.headers['Accept-Language'] = 'uz';
		config.headers['X-Device-Id'] = localStorage.getItem('uid');
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (response) {
		// Handle success
		return response;
	},
	function (error) {
		// Handle error
		return error?.response?.data?.message || error.message;
	}
);
