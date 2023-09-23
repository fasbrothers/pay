import { useState, useEffect } from 'react';
import { api } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthImageTitle } from '../../components/auth-image-title';
import { useMutation } from '@tanstack/react-query';
import toastMessage from '../../utils/toast-message';
import logo from '../../assets/logo.svg';
import '../sign-up/sign-up.scss';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken, getUserData } from '../../store/slices/authSlice';
import { InputProps } from '../../@types/inputs-type';
import { SignInProps } from './sign-in-type';
import SignInForm from './components/sign-in-form';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ServerError {
	errorMessage: string;
}
export interface IResponse {
	password: string;
	otp: string;
}
export interface IResponsePassOrOtp {
	token: string;
	user: User;
}

export interface User {
	id: string;
	name: string;
	phone: string;
	photo_url: string | null;
	reg_date: string;
}

export default function SignIn() {
	const [inputs, setInputs] = useState<InputProps>({
		phone: '',
		password: '',
		otp: '',
		trust: false,
		prefixPhone: '998',
	});
	const [additionalProperties, setAdditionalProperties] = useState<SignInProps>(
		{
			disabledPhone: false,
			showPassword: false,
			showOtp: false,
		}
	);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	
	const {
		mutate: mutateNumber,
		isLoading: isLoadingNumber,
		data: response,
	} = useMutation({
		mutationFn: async () => {
			try {
				const response = await api.post<InputProps, AxiosResponse<IResponse>>(
					'/customer/getlogin',
					{
						phone: inputs.prefixPhone + inputs.phone,
					}
				);
				return response;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const serverError = error as AxiosError<ServerError>;
					if (serverError.response) {
						toastMessage(error.response?.data.message);
					} else {
						toastMessage(error.message);
					}
				}
			}
		},
	});
	const { mutate, isLoading, data } = useMutation({
		mutationFn: async () => {
			const { phone, prefixPhone, password, otp, trust } = inputs;
			try {
				const response = await api.post<
					InputProps,
					AxiosResponse<IResponsePassOrOtp> | undefined
				>('/customer/login', {
					phone: prefixPhone + phone,
					password,
					otp,
					trust,
				});
				return response;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const serverError = error as AxiosError<ServerError>;
					if (serverError && serverError.response) {
						toastMessage(error.response?.data.message);
					} else {
						toastMessage(error.message);
					}
				}
			}
		},
	});

	async function submitNumber(response: AxiosResponse<IResponse> | undefined) {
		if (response?.status === 200) {
			const { password } = response.data;
			password
				? setAdditionalProperties({
						...additionalProperties,
						showPassword: true,
						disabledPhone: true,
				})
				: setAdditionalProperties({
						...additionalProperties,
						showOtp: true,
						disabledPhone: true,
				});
		}
	}

	async function submitPassOrOtp(
		response: AxiosResponse<IResponsePassOrOtp> | undefined
	) {
		if (response?.status === 200) {
			navigate('/');
			dispatch(accessToken(response.data?.token));
			dispatch(getUserData(response.data?.user));
		}
	}

	useEffect(() => {
		submitNumber(response);
	}, [response]);

	useEffect(() => {
		submitPassOrOtp(data);
	}, [data]);

	return (
		<div className='w-full md:w-1/2 flex items-center md:h-screen'>
			<div className='w-11/12 xl:w-7/12 mx-auto mt-5 md:mt-0'>
				<AuthImageTitle logo={logo} title='Sign In' />
				<SignInForm
					inputs={inputs}
					setInputs={setInputs}
					additionalProperties={additionalProperties}
					mutate={
						!additionalProperties.showOtp && !additionalProperties.showPassword
							? mutateNumber
							: mutate
					}
					isLoadingNumber={isLoadingNumber}
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
