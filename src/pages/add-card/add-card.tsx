import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CardForm } from '../../components/card-form';
import { ErrorResponse, ICardResponse } from '../../@types/inputs-type';
import { AxiosError } from 'axios';
import toastMessage, { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../api';

function AddCard() {
	const [inputs, setInputs] = useState<{ [key: string]: string }>({
		cvc: '',
		expiry: '',
		name: '',
		pan: '',
	});

	const navigate = useNavigate();

	const { isLoading, mutate } = useMutation({
		mutationFn: async () => {
			const pan = inputs.pan && inputs.pan.replace(/\s/g, '');
			const expiry = inputs.expiry && inputs.expiry.replace(/\s/g, '');
			const { data } = await httpClient.post<ICardResponse>('/customer/card', {
				pan,
				name: inputs.name,
				expiry_month: expiry.slice(0, 2),
				expiry_year: expiry.slice(3),
			});
			navigate('/cabinet/cards');
			return data;
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
		onSuccess: () => {
			toastSuccessMessage('Card added successfully');
		},
	});

	return (
		<CardForm
			isLoading={isLoading}
			setInputs={setInputs}
			mutate={mutate}
			inputs={inputs}
		/>
	);
}

export default AddCard;
