import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './sign-up.scss';
import { AuthImageTitle } from '../../components/auth/auth-image-title';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { accessToken } from '../../store/slices/authSlice';
import SignUpForm from '../../components/auth/sign-up-form';
import { httpClient } from '../../api';
import { InputValues } from '../../@types/auth.types';

export default function SignUp() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (values: InputValues) => {
		const { name, phone, password, trust } = values;
		const { data } = await httpClient.post('/customer/register', {
			name,
			phone: '998' + phone,
			password,
			trust,
		});

		dispatch(accessToken(data.token));
		navigate('/cabinet');
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
	});

	return (
		<div className='w-full md:w-1/2 flex items-center'>
			<div className='w-11/12 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title='Sign Up' />
				<SignUpForm mutate={mutate} isLoading={isLoading} />
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
