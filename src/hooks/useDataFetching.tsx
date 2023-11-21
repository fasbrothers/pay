import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toastMessage from '../utils/toast-message';
import { httpClient } from '../api';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../@types/error.types';
import { useAppSelector } from './redux-hooks';

export const useDataFetching = <T,>(
	key: string,
	url: string,
	dependency?: string,
	navigation?: string
) => {
	const navigate = useNavigate();
	const token = useAppSelector(state => state.auth.token);
	return useQuery<T, AxiosError<ErrorResponse>>(
		[key, dependency],
		async () => {
			const { data } = await httpClient.get<T>(url);
			return data;
		},
		{
			onError: error => {
				toastMessage(
					error?.response?.data.message || error?.message || 'Error'
				);
				navigation && navigate(navigation);
			},
			enabled: !!token,
		}
	);
};
