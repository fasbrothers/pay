import logo from '../../assets/logo.svg';
import { useState, useEffect } from 'react';
import { api } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import './sign-up.scss';
import { AuthImageTitle } from '../../components/auth-image-title';
import toastMessage from '../../utils/toast-message';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken, getUserData } from '../../store/slices/authSlice';
import { InputProps } from '../../@types/inputs-type';
import SignUpForm from './components/sign-up-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ServerError, User } from '../sign-in/sign-in';

export interface IResponse {
	success: boolean;
	token: string;
	user: User;
}

export default function SignUp() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [inputs, setInputs] = useState<InputProps>({
		name: '',
		phone: '',
		password: '',
		prefixPhone: '998',
		trust: false,
	});

	const { mutate, isLoading, data } = useMutation({
		mutationFn: async () => {
			const { name, phone, password, trust, prefixPhone } = inputs;
			try {
				const response = await api.post<
					InputProps,
					AxiosResponse<IResponse> | undefined
				>('/customer/register', {
					name,
					phone: prefixPhone + phone,
					password,
					trust,
				});
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

	async function handlerRegister(
		response: AxiosResponse<IResponse> | undefined
	) {
		if (response?.status === 200) {
			navigate('/');
			dispatch(accessToken(response.data?.token));
			dispatch(getUserData(response.data?.user));
		}
	}

	useEffect(() => {
		handlerRegister(data);
	}, [data]);

	return (
		<div className='w-full md:w-1/2 flex items-center'>
			<div className='w-11/12 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title='Sign Up' />
				<SignUpForm
					inputs={inputs}
					setInputs={setInputs}
					mutate={mutate}
					isLoading={isLoading}
				/>
				<div className='flex'>
					<p className='mr-2'>Already registered?</p>
					<Link
						to='/auth/login'
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}
