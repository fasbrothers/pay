import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CardForm } from '../../components/card/card-form';
import { httpClient } from '../../api';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { BackToPreviousPage } from '../../components/shared/back-to-previous-page';
import { useTranslation } from 'react-i18next';
import VerificationCodeForm from '../../components/card/verification-code-form';
import { CardFormInputs } from '../../@types/card.types';
import { useNavigate } from 'react-router-dom';
import { toastSuccessMessage } from '../../utils/toast-message';

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
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading, mutate } = useMutation({
		mutationFn: async (values: CardFormInputs) => {
			const pan = inputs.pan && inputs.pan.replace(/\s/g, '');
			const expiry = inputs.expiry && inputs.expiry.replace(/\s/g, '');
			const { data } = await httpClient.post('/customer/card', {
				pan,
				name: inputs.name,
				expiry_month: expiry.slice(0, 2),
				expiry_year: expiry.slice(3),
				main: values.main !== undefined ? values.main : false,
			});
			if (data.need_otp) {
				setTimeLeft(data.info.timeLeft);
				setShowCode(true);
			} else {
				setShowCode(false);
				data.message ? toastSuccessMessage(data.message) : null;
				queryClient.invalidateQueries(['cards']);
				navigate('/cabinet/cards');
			}
		},
	});

	return (
		<div id='PaymentForm'>
			<BackToPreviousPage title={t('cards.add_card.title')} />
			{showCode ? (
				<VerificationCodeForm timeLeft={timeLeft} />
			) : (
				<>
					<div className={`relative card_simple`}>
						<Cards
							cvc={inputs.cvc}
							expiry={inputs.expiry}
							name={inputs.owner_name}
							number={inputs.pan}
						/>
					</div>
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
