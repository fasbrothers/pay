import { useState, ChangeEvent } from 'react';
import logo from '../../assets/logo.svg';
import { Form, Input } from 'antd';
import { api } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';
import { CheckBox } from '../../components/checkbox';
import { ButtonPrimary } from '../../components/button';
import { AuthImageTitle } from '../../components/auth-image-title';
import '../sign-up/sign-up.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastMessage from '../../utils/toast-message';
import { useMutation } from '@tanstack/react-query';
import { setToken } from '../../utils/cookies';

export default function SignIn() {
	const [input, setInput] = useState({
		phone: '',
		password: '',
		otp: '',
		trust: false,
		disabledPhone: false,
		prefixPhone: '998',
		showPassword: false,
		showOtp: false,
	});
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setInput({
			...input,
			[name]: value,
		});
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const { phone, prefixPhone } = input;

			if (!input.showOtp && !input.showPassword) {
				const response = await api.post('/customer/getlogin', {
					phone: prefixPhone + phone,
				});
				if (typeof response === 'string') {
					setTimeout(() => {
						toastMessage(response);
					}, 0);
				}
				if (response.status === 200) {
					const { password } = response.data;
					password
						? setInput({ ...input, showPassword: true, disabledPhone: true })
						: setInput({ ...input, showOtp: true, disabledPhone: true });
				}
			} else {
				const { password, otp, trust } = input;
				const response = await api.post('/customer/login', {
					phone: prefixPhone + phone,
					password,
					otp,
					trust,
				});
				if (typeof response === 'string') {
					setTimeout(() => {
						toastMessage(response);
					}, 0);
				}
				if (response.status === 200) {
					navigate('/');
					setToken(response.data.token);
				}
			}
		},
	});

	return (
		<div className='w-1/2 flex items-center'>
			<div className='w-4/6 xl:w-7/12 mx-auto'>
				<AuthImageTitle logo={logo} title='Sign In' />
				<Form
					form={form}
					name='login'
					onFinish={mutate}
					style={{ maxWidth: 700 }}
					scrollToFirstError
				>
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
							suffix={<PhoneEnabledIcon className='text-gray-500' />}
							name='phone'
							disabled={input.disabledPhone ? true : false}
						/>
					</Form.Item>

					{input.showOtp && (
						<Form.Item
							name='otp'
							label='Verification Code'
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: 'Please input your verification code!',
								},
							]}
						>
							<Input
								onChange={handleInput}
								name='otp'
								suffix={<SecurityIcon className='text-gray-500' />}
								className='w-full p-3'
							/>
						</Form.Item>
					)}
					{input.showPassword && (
						<>
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
								]}
							>
								<Input.Password
									onChange={handleInput}
									name='password'
									className='w-full p-3'
								/>
							</Form.Item>
							<CheckBox input={input} setInput={setInput} />
						</>
					)}
					<Form.Item>
						<ButtonPrimary isLoading={isLoading} title='Sign In' />
					</Form.Item>
				</Form>
				<div className='flex'>
					<p className='mr-2'>You don't have an account?</p>
					<Link to='/auth/register' className='text-blue-700 font-medium'>
						Create an account
					</Link>
				</div>
			</div>
			<ToastContainer style={{ width: '400px' }} />
		</div>
	);
}
