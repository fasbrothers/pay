import { useMutation } from '@tanstack/react-query';
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthImageTitle } from '../../components/auth/auth-image-title';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import '../sign-up/sign-up.scss';
import SignInForm from '../../components/auth/sign-in-form';
import { connectSocket, disconnectSocket, httpClient, socket } from '../../api';
import {
	InputValues,
	QRCodeResponse,
	SignInProps,
} from '../../@types/auth.types';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/error.types';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { GenerateQr } from '../../components/generate-qr';
import { getFromCookie } from '../../utils/cookies';
import toastMessage from '../../utils/toast-message';
import { ButtonPrimary } from '../../components/shared/button';

export default function SignIn() {
	const [additionalProperties, setAdditionalProperties] = useState<SignInProps>(
		{
			showPassword: false,
			showOtp: false,
		}
	);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [qrData, setQrData] = useState<QRCodeResponse>({
		key: '',
	});
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const deviceId = getFromCookie('uid');
	const getParams = useAppSelector(state => state.auth.params);

	const handleSubmit = async (values: InputValues) => {
		const { password, otp, phone, trust } = values;

		if (!additionalProperties.showOtp && !additionalProperties.showPassword) {
			const { data } = await httpClient.post('/customer/getlogin', {
				phone: '998' + phone,
			});

			setAdditionalProperties({
				showPassword: data.password,
				showOtp: data.otp,
			});

			return data;
		} else {
			const { data } = await httpClient.post('/customer/login', {
				phone: '998' + phone,
				password,
				otp,
				trust,
			});

			dispatch(accessToken(data.token));
			navigate(getParams.length > 0 ? getParams : '/cabinet/main');
		}
	};

	const handleQrRequest = (e: FormEvent) => {
		e.preventDefault();
		connectSocket();
		setLoading(true);
		socket.emit('qr_login_request');
	};

	useEffect(() => {
		socket.on('qr_login_response', (data: QRCodeResponse) => {
			setQrData(data);
			setLoading(false);
		});

		socket.on('qr_login_allow', (data: { token: string }) => {
			dispatch(accessToken(data.token));
			navigate('/cabinet');
		});

		socket.on('qr_login_deny', (data: { error: string }) => {
			toastMessage(data.error);
		});

		return () => {
			disconnectSocket();
		};
	}, [dispatch, navigate]);

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;
			if (axiosError?.response?.data.type === 'USER_BLOCKED') {
				setTimeLeft(axiosError.response.data?.info?.timeLeft);
			}
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center md:h-screen'>
			<div className='w-11/12 xl:w-7/12 mx-auto mt-5 md:mt-0'>
				<AuthImageTitle logo={logo} title={t('auth.sign_in.title')} />

				{qrData?.key && qrData.key.length > 0 ? (
					<GenerateQr url={`${qrData.key}&${deviceId}`} />
				) : (
					<SignInForm
						additionalProperties={additionalProperties}
						mutate={mutate}
						isLoading={isLoading}
						timeLeft={timeLeft}
						setTimeLeft={setTimeLeft}
					/>
				)}
				<form className='mb-3' onSubmit={handleQrRequest}>
					<ButtonPrimary
						title={t('auth.sign_in.qr_button')}
						isLoading={loading}
					/>
				</form>
				<div className='flex flex-col lg:flex-row	mt-3'>
					<p className='mr-2'>{t('auth.sign_in.account_text')}</p>
					<Link
						to={`/auth/register`}
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						{t('auth.sign_in.account_link')}
					</Link>
				</div>
			</div>
		</div>
	);
}
