import { Form, Input } from 'antd';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';
import { CheckBox } from '../../../components/checkbox';
import { ButtonPrimary } from '../../../components/button';
import { MaskedInput } from 'antd-mask-input';
import { InputValues, AuthProps } from '../../../@types/inputs-type';

function SignInForm({ additionalProperties, mutate, isLoading }: AuthProps) {
	const [form] = Form.useForm();

	function handleSubmit(values: InputValues) {
		values.phone = values.phone && values.phone.replace(/\s/g, '');
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
							className='input__style'
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
							<Input.Password name='password' className='input__style' />
						</Form.Item>
						<CheckBox title='Trusted Device' name='trust' />
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
