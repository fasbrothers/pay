import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './sign-up.scss';
import { AuthImageTitle } from '../../components/auth/auth-image-title';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import SignUpForm from '../../components/auth/sign-up-form';
import { httpClient } from '../../api';
import { InputValues, SendCodeResponse } from '../../@types/auth.types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/error.types';

export default function SignUp() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [showOTP, setShowOTP] = useState(false);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const { t } = useTranslation();

	const handleSubmit = async (values: InputValues) => {
		if (values.otp === undefined) {
			const { data } = await httpClient.post<SendCodeResponse>(
				'/customer/sendcode',
				{
					phone: '998' + values.phone,
				}
			);
			setTimeLeft(data.timeLeft);
		} else {
			const { name, phone, password, trust, otp } = values;
			const { data } = await httpClient.post('/customer/register', {
				name,
				phone: '998' + phone,
				password,
				trust,
				otp,
			});
			dispatch(accessToken(data.token));
			navigate('/cabinet');
		}
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onSuccess: () => {
			setShowOTP(true);
		},
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.data.type === 'NUMBER_TAKEN') {
				navigate('/auth/login');
			}
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center'>
			<div className='w-11/12 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title={t('auth.sign_up.title')} />
				<SignUpForm
					mutate={mutate}
					isLoading={isLoading}
					showOTP={showOTP}
					timeLeft={timeLeft}
					setTimeLeft={setTimeLeft}
				/>
				<div className='flex'>
					<p className='mr-2'>{t('auth.sign_up.account_text')}</p>
					<Link
						to='/auth/login'
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						{t('auth.sign_up.account_link')}
					</Link>
				</div>
			</div>
		</div>
	);
}
