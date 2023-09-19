import { useState, ChangeEvent } from 'react';
import logo from '../../assets/logo.svg';
import { Button, Checkbox, Form, Input } from 'antd';
import { api } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';

export default function SignIn() {
	const [input, setInput] = useState({
		phone: '',
		password: '',
		otp: '',
		trust: false,
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

	const onChange = (e: CheckboxChangeEvent) => {
		setInput({
			...input,
			trust: e.target.checked,
		});
	};

	const handleSubmit = async () => {
		const { phone,prefixPhone } = input;

		if (!input.showOtp && !input.showPassword) {
			const response = await api.post('/customer/getlogin', {
				phone: prefixPhone + phone,
			});
			console.log(response);
			const { password } = response.data;
			password
				? setInput({ ...input, showPassword: true })
				: setInput({ ...input, showOtp: true });
		} else {
			const { password, otp, trust } = input;
			const response = await api.post('/customer/login', {
				phone: prefixPhone + phone,
				password,
				otp,
				trust,
			});
			console.log(response);
			if (response.status === 200) {
				navigate('/main');
				console.log(response.data.token);
				localStorage.setItem('token', response.data.token);
			}
		}
	};

	return (
		<div className='w-1/2'>
			<div className='flex flex-col justify-center items-center h-screen'>
				<div>
					<img src={logo} alt='' />
				</div>
				<h2 className=' text-lg font-medium'>Sign Up</h2>
				<Form
					form={form}
					name='login'
					onFinish={handleSubmit}
					style={{ maxWidth: 700 }}
					scrollToFirstError
				>
					<Form.Item
						name='phone'
						label='Phone Number'
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
							style={{ width: '100%' }}
							onChange={handleInput}
							suffix= {<PhoneEnabledIcon/>}
							name='phone'
						/>
					</Form.Item>

					{input.showOtp && (
						<Form.Item
							name='otp'
							label='Verification Code'
							rules={[
								{
									required: true,
									message: 'Please input your verification code!',
								},
							]}
						>
							<Input onChange={handleInput} name='otp' suffix={<SecurityIcon/>} />
						</Form.Item>
					)}
					{input.showPassword && (
						<>
						<Form.Item
							name='password'
							label='Password'
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password onChange={handleInput} name='password' />
						</Form.Item>
						<Form.Item>
						<Checkbox onChange={onChange}>Trusted device</Checkbox>
						</Form.Item>
						</>
					)}
					<Form.Item>
						<Button
							htmlType='submit'
							className='bg-white text-blue-600 px-4 py-2 rounded-md mt-4'
						>
							Sign In
						</Button>
					</Form.Item>
				</Form>
				<Link to='/auth/register'>Create account</Link>
			</div>
		</div>
	);
}
