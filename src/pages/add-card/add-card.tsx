import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CardForm } from '../../components/card-form';
import { ICardResponse } from '../../@types/inputs-type';
import { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../api';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import BackToPreviousPage from '../../components/back-to-previous-page/back-to-previous-page';

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
			return data;
		},
		onSuccess: () => {
			navigate('/cabinet/cards');
			toastSuccessMessage('Card added successfully');
		},
	});

	return (
		<div id='PaymentForm'>
			<BackToPreviousPage title='Add Card' />
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
