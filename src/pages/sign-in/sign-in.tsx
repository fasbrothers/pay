import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorResponse, IResponse, InputValues } from '../../@types/inputs-type';
import { api } from '../../api';
import logo from '../../assets/logo.svg';
import { AuthImageTitle } from '../../components/auth-image-title';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken, getUserData } from '../../store/slices/authSlice';
import '../sign-up/sign-up.scss';
import SignInForm from './components/sign-in-form';
import { SignInProps } from './sign-in-type';
import { AxiosError } from 'axios';
import toastMessage from '../../utils/toast-message';

export default function SignIn() {
	const [additionalProperties, setAdditionalProperties] = useState<SignInProps>(
		{
			showPassword: false,
			showOtp: false,
		}
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (values: InputValues) => {
		const { password, otp, phone, trust } = values;

		if (!additionalProperties.showOtp && !additionalProperties.showPassword) {
			const { data } = await api.post<IResponse>('/customer/getlogin', {
				phone: '998' + phone,
			});

			setAdditionalProperties({
				showPassword: data.password,
				showOtp: data.otp,
			});

			return data;
		} else {
			const { data } = await api.post<IResponse>('/customer/login', {
				phone: '998' + phone,
				password,
				otp,
				trust,
			});

			navigate('/');
			dispatch(accessToken(data.token));
			dispatch(getUserData(data.customer));
		}
	};

	const { mutate, isLoading } = useMutation<
		any,
		AxiosError<ErrorResponse>,
		any
	>({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center md:h-screen'>
			<div className='w-11/12 xl:w-7/12 mx-auto mt-5 md:mt-0'>
				<AuthImageTitle logo={logo} title='Sign In' />
				<SignInForm
					additionalProperties={additionalProperties}
					mutate={mutate}
					isLoading={isLoading}
				/>
				<div className='flex flex-col lg:flex-row'>
					<p className='mr-2'>You don't have an account?</p>
					<Link
						to='/auth/register'
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
}
