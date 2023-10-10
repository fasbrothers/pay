import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../@types/inputs-type';
import toastMessage from '../utils/toast-message';
import { httpClient } from '../api';

export const useDataFetching = <T,>(
	key: string,
	url: string,
	dependency?: string,
	language?: boolean
) => {
	return useQuery<T, AxiosError<ErrorResponse>>(
		[key, dependency],
		async () => {
			const { data } = await httpClient.get<T>(url);
			console.log(language);
			return data;
		},
		{
			onError: error => {
				toastMessage(
					error?.response?.data.message || error?.message || 'Error'
				);
			},
		}
	);
};
