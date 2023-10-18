import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IResponse, InputValues } from '../../@types/inputs-type';
import logo from '../../assets/logo.svg';
import { AuthImageTitle } from '../../components/auth-image-title';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import '../sign-up/sign-up.scss';
import SignInForm from './components/sign-in-form';
import { SignInProps } from './sign-in-type';
import { httpClient } from '../../api';

export default function SignIn() {
	const [additionalProperties, setAdditionalProperties] = useState<SignInProps>(
		{
			showPassword: false,
			showOtp: false,
		}
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSubmit = async (values: InputValues) => {
		const { password, otp, phone, trust } = values;

		if (!additionalProperties.showOtp && !additionalProperties.showPassword) {
			const { data } = await httpClient.post<IResponse>('/customer/getlogin', {
				phone: '998' + phone,
			});

			setAdditionalProperties({
				showPassword: data.password,
				showOtp: data.otp,
			});

			return data;
		} else {
			const { data } = await httpClient.post<IResponse>('/customer/login', {
				phone: '998' + phone,
				password,
				otp,
				trust,
			});

			navigate(searchParams.get('redirect') || '/cabinet');
			dispatch(accessToken(data.token));
		}
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
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
						to={`/auth/register?redirect=${searchParams.get('redirect')}`}
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
}
