import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CardForm } from '../../components/card/card-form';
import { httpClient } from '../../api';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { BackToPreviousPage } from '../../components/shared/back-to-previous-page';
import { useTranslation } from 'react-i18next';
import VerificationCodeForm from '../../components/card/verification-code-form';

function AddCard() {
	const [inputs, setInputs] = useState<{ [key: string]: string }>({
		cvc: '',
		expiry: '',
		name: '',
		pan: '',
		owner_name: '',
	});

	const { t } = useTranslation();
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [showCode, setShowCode] = useState<boolean>(false);

	const { isLoading, mutate } = useMutation({
		mutationFn: async () => {
			const pan = inputs.pan && inputs.pan.replace(/\s/g, '');
			const expiry = inputs.expiry && inputs.expiry.replace(/\s/g, '');
			const { data } = await httpClient.post('/customer/card', {
				pan,
				name: inputs.name,
				expiry_month: expiry.slice(0, 2),
				expiry_year: expiry.slice(3),
			});
			setTimeLeft(data.info.timeLeft);
		},
		onSuccess: () => {
			setShowCode(true);
		},
	});

	return (
		<div id='PaymentForm'>
			<BackToPreviousPage title={t('cards.add_card.title')} />
			{showCode ? (
				<VerificationCodeForm timeLeft={timeLeft} />
			) : (
				<>
					<Cards
						cvc={inputs.cvc}
						expiry={inputs.expiry}
						name={inputs.owner_name}
						number={inputs.pan}
					/>
					<CardForm
						isLoading={isLoading}
						setInputs={setInputs}
						mutate={mutate}
					/>
				</>
			)}
		</div>
	);
}

export default AddCard;
