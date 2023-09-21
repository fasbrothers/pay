import logo from '../../assets/logo.svg';
import { ChangeEvent, useState } from 'react';
import { Form, Input } from 'antd';
import { InputProps } from './sign-up.types';
import { api } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { CheckBox } from '../../components/checkbox';
import './sign-up.scss';
import { ButtonPrimary } from '../../components/button';
import { AuthImageTitle } from '../../components/auth-image-title';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastMessage from '../../utils/toast-message';
import { useMutation } from '@tanstack/react-query';
import { setToken } from '../../utils/cookies';

export default function SignUp() {
	const navigate = useNavigate();
	const [input, setInput] = useState<InputProps>({
		name: '',
		phone: '',
		password: '',
		prefixPhone: '998',
		trust: false,
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setInput({
			...input,
			[name]: value,
		} as InputProps);
	};

	const [form] = Form.useForm();

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const { name, phone, password, trust, prefixPhone } = input;
			const response = await api.post('/customer/register', {
				name,
				phone: prefixPhone + phone,
				password,
				trust,
			});
			console.log(response);
			if (typeof response === 'string') {
				setTimeout(() => {
					toastMessage(response);
				}, 0);
			}
			if (response.status === 200) {
				navigate('/');
				setToken(response.data.token);
			}
		},
	});

	return (
		<div className='w-full md:w-1/2 flex items-center'>
			<div className='w-11/12 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title='Sign Up' />
				<Form form={form} name='register' onFinish={mutate} scrollToFirstError>
					<Form.Item
						name='name'
						label='Name'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: 'Please input your name!',
								whitespace: true,
							},
						]}
					>
						<Input
							className='w-full p-3'
							onChange={handleInput}
							name='name'
							suffix={<AccountCircleIcon className='text-gray-500' />}
						/>
					</Form.Item>
					<Form.Item
						name='password'
						label='Password'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
							{ min: 6, message: 'Password must be minimum 6 characters.' },
							{
								pattern: new RegExp(
									'([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'
								),
								message: 'Password must be at least one number and letter.',
							},
						]}
						hasFeedback
					>
						<Input.Password
							onChange={handleInput}
							className='w-full p-3'
							name='password'
						/>
					</Form.Item>

					<Form.Item
						name='confirm'
						label='Confirm Password'
						dependencies={['password']}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error('The new password that you entered do not match!')
									);
								},
							}),
						]}
					>
						<Input.Password className='w-full p-3' />
					</Form.Item>

					<Form.Item
						name='phone'
						label='Phone Number'
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{ required: true, message: 'Please input your phone number!' },
							{ max: 9, message: 'Phone must be 9 numbers.' },
							{
								pattern: new RegExp(/^[0-9]+$/),
								message: 'Phone must be only numbers.',
							},
							{ min: 9, message: 'Phone must be 9 numbers.' },
						]}
					>
						<Input
							addonBefore={'+' + input.prefixPhone}
							className='input__phone'
							onChange={handleInput}
							name='phone'
							suffix={<PhoneEnabledIcon className='text-gray-500' />}
						/>
					</Form.Item>
					<CheckBox input={input} setInput={setInput} />
					<Form.Item>
						<ButtonPrimary isLoading={isLoading} title='Create account' />
					</Form.Item>
				</Form>
				<div className='flex'>
					<p className='mr-2'>Already registered?</p>
					<Link to='/auth/login' className='text-blue-700 font-medium mb-5 md:mb-0'>
						Sign In
					</Link>
				</div>
			</div>
			<ToastContainer style={{ width: '400px' }} />
		</div>
	);
}
