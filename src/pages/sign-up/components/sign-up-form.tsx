import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { Form, Input } from 'antd';
import { CheckBox } from '../../../components/checkbox';
import { ButtonPrimary } from '../../../components/button';
import { AuthProps, InputValues } from '../../../@types/inputs-type';

const SignUpForm = ({ mutate, isLoading }: AuthProps) => {
	const [form] = Form.useForm();

	const handleSubmit = (values: InputValues) =>{
		mutate(values)
	}
	return (
		<Form form={form} name='register' onFinish={handleSubmit} scrollToFirstError>
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
						pattern: new RegExp('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'),
						message: 'Password must be at least one number and letter.',
					},
				]}
				hasFeedback
			>
				<Input.Password className='w-full p-3' name='password' />
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
					addonBefore={'+998'}
					className='input__phone'
					name='phone'
					suffix={<PhoneEnabledIcon className='text-gray-500' />}
				/>
			</Form.Item>
			<CheckBox />
			<Form.Item>
				<ButtonPrimary isLoading={isLoading} title='Create account' />
			</Form.Item>
		</Form>
	);
};

export default SignUpForm;
