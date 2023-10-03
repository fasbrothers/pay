import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
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
			const { expiry, name, pan } = inputs;
			const { data } = await httpClient.post<ICardResponse>('/customer/card', {
				pan,
				name,
				expiry_month: expiry.slice(0, 2),
				expiry_year: expiry.slice(2),
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
		<div id='PaymentForm'>
			<Cards
				cvc={inputs.cvc}
				expiry={inputs.expiry}
				name={inputs.name}
				number={inputs.pan}
			/>
			<CardForm isLoading={isLoading} setInputs={setInputs} mutate={mutate} />
		</div>
	);
}

export default AddCard;
