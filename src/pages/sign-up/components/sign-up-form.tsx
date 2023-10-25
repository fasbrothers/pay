import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { Form, Input } from 'antd';
import { CheckBox } from '../../../components/checkbox';
import { ButtonPrimary } from '../../../components/button';
import { MaskedInput } from 'antd-mask-input';
import { AuthProps, InputValues } from '../../../@types/auth.types';

const SignUpForm = ({ mutate, isLoading }: AuthProps) => {
	const [form] = Form.useForm();

	const handleSubmit = (values: InputValues) => {
		values.phone = values.phone && values.phone.replace(/\s/g, '');
		mutate(values);
	};
	return (
		<Form
			form={form}
			name='register'
			onFinish={handleSubmit}
			scrollToFirstError
		>
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
					name='name'
					className='input__style'
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
						pattern: new RegExp('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'),
						message: 'Password must be at least one number and letter.',
					},
				]}
				hasFeedback
			>
				<Input.Password className='input__style' name='password' />
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
				<Input.Password className='input__style' />
			</Form.Item>

			<Form.Item
				name='phone'
				label='Phone Number'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: 'Please input your phone number!' },
					{
						pattern: /^\d{2} \d{3} \d{2} \d{2}$/,
						message: 'Must be a valid phone number',
					},
				]}
			>
				<MaskedInput
					mask={'00 000 00 00'}
					addonBefore={'+998'}
					maskOptions={{
						lazy: true,
					}}
					className='input__phone'
					name='phone'
					suffix={<PhoneEnabledIcon className='text-gray-500' />}
				/>
			</Form.Item>
			<CheckBox title='Trusted Device' name='trust' />
			<Form.Item>
				<ButtonPrimary isLoading={isLoading} title='Create account' />
			</Form.Item>
		</Form>
	);
};

export default SignUpForm;
