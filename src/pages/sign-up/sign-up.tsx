import logo from '../../assets/logo.svg';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { InputProps } from './sign-up.types';
import { api } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';


export default function SignUp() {
	const navigate = useNavigate();
	const [input, setInput] = useState<InputProps>({
		name: '',
		phone: '',
		password: '',
		prefixPhone: '998',
		trust: false,
	});

	const onChange = (e: CheckboxChangeEvent) => {
		setInput({
			...input,
			trust: e.target.checked,
		} as InputProps);
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setInput({
			...input,
			[name]: value,
		} as InputProps);
	};

	const [form] = Form.useForm();

	const handleSubmit = async () => {
		const { name, phone, password, trust, prefixPhone } = input;

		const response = await api.post('/customer/register', {
			name,
			phone: prefixPhone + phone,
			password,
			trust,
		});
		console.log(response);
		if (response.status === 200) {
			navigate('/main');
			console.log(response.data.token);
			localStorage.setItem('token', response.data.token);
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
					name='register'
					onFinish={handleSubmit}
					style={{ maxWidth: 700 }}
					scrollToFirstError
				>
					<Form.Item
						name='name'
						label='Name'
						rules={[
							{
								required: true,
								message: 'Please input your name!',
								whitespace: true,
							},
						]}
					>
						<Input onChange={handleInput} name='name' suffix={<AccountCircleIcon/>} />
					</Form.Item>
					<Form.Item
						name='password'
						label='Password'
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
						<Input.Password onChange={handleInput} name='password' />
					</Form.Item>

					<Form.Item
						name='confirm'
						label='Confirm Password'
						dependencies={['password']}
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
						<Input.Password />
					</Form.Item>

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
							name='phone'
							suffix= {<PhoneEnabledIcon/>}
						/>
					</Form.Item>
					<Form.Item>
						<Checkbox onChange={onChange}>Trusted device</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button
							className='bg-white text-blue-600 px-4 py-2 rounded-md mt-4'
							htmlType='submit'
						>
							Create account
						</Button>
					</Form.Item>
				</Form>
				<Link to='/auth/login'>Sign Up</Link>
			</div>
		</div>
	);
}
