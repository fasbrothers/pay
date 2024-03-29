import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CardForm } from '../../components/card/card-form';
import { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../api';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { BackToPreviousPage } from '../../components/shared/back-to-previous-page';
import { useTranslation } from 'react-i18next';

function AddCard() {
	const [inputs, setInputs] = useState<{ [key: string]: string }>({
		cvc: '',
		expiry: '',
		name: '',
		owner_name: '',
		pan: '',
	});

	const navigate = useNavigate();
	const { t } = useTranslation();

	const { isLoading, mutate } = useMutation({
		mutationFn: async () => {
			const pan = inputs.pan && inputs.pan.replace(/\s/g, '');
			const expiry = inputs.expiry && inputs.expiry.replace(/\s/g, '');
			const { data } = await httpClient.post('/customer/card', {
				pan,
				name: inputs.name,
				owner_name: inputs.owner_name,
				expiry_month: expiry.slice(0, 2),
				expiry_year: expiry.slice(3),
			});
			data.message ? toastSuccessMessage(data.message) : null;
			return data;
		},
		onSuccess: () => {
			navigate('/cabinet/cards');
		},
	});

	return (
		<div id='PaymentForm'>
			<BackToPreviousPage title={t("cards.add_card.title")} />
			<Cards
				cvc={inputs.cvc}
				expiry={inputs.expiry}
				name={inputs.owner_name}
				number={inputs.pan}
			/>
			<CardForm isLoading={isLoading} setInputs={setInputs} mutate={mutate} />
		</div>
	);
}

export default AddCard;
