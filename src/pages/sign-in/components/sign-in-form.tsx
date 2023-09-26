import { Form, Input } from 'antd';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';
import { CheckBox } from '../../../components/checkbox';
import { ButtonPrimary } from '../../../components/button';
import { InputValues, AuthProps } from '../../../@types/inputs-type';

function SignInForm({ additionalProperties, mutate, isLoading }: AuthProps) {
	const [form] = Form.useForm();

	function handleSubmit(values: InputValues) {
		mutate(values);
	}
	return (
		<>
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
						addonBefore={'+998'}
						className='input__phone'
						suffix={<PhoneEnabledIcon className='text-gray-500' />}
						name='phone'
					/>
				</Form.Item>

				{additionalProperties?.showOtp && (
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
							name='otp'
							suffix={<SecurityIcon className='text-gray-500' />}
							className='w-full p-3'
						/>
					</Form.Item>
				)}
				{additionalProperties?.showPassword && (
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
							<Input.Password name='password' className='w-full p-3' />
						</Form.Item>
						<CheckBox />
					</>
				)}
				<Form.Item>
					<ButtonPrimary isLoading={isLoading} title='Sign In' />
				</Form.Item>
			</Form>
		</>
	);
}

export default SignInForm;
