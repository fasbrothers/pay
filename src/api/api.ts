import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://atto-pay.vercel.app',
});

const token = localStorage.getItem('token');

api.interceptors.request.use(
	function (config) {
		// Add auth token to requests
		config.headers.Authorization = token ? token : undefined;
		config.headers['Accept-Language'] = 'uz';
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
		console.log(error.response?.data?.message);
		return error.message;
	}
);
