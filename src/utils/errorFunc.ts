import { AxiosError } from 'axios';
import { ErrorResponse } from '../@types/error.types';
import toastMessage from './toast-message';

export const errorFunc = (error: unknown) => {
	const axiosError = error as AxiosError<ErrorResponse>;
	toastMessage(
		axiosError?.response?.data.message || axiosError?.message || 'Error'
	);
};
