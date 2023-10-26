import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthImageTitle } from '../../components/auth/auth-image-title';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import '../sign-up/sign-up.scss';
import SignInForm from '../../components/auth/sign-in-form';
import { httpClient } from '../../api';
import { InputValues, SignInProps } from '../../@types/auth.types';

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
			navigate('/cabinet');
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
						to={`/auth/register`}
						className='text-blue-700 font-medium mb-5 md:mb-0'
					>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
}
