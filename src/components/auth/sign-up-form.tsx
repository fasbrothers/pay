import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { Form, Input } from 'antd';
import { CheckBox } from '../shared/checkbox';
import { ButtonPrimary } from '../shared/button';
import { MaskedInput } from 'antd-mask-input';
import { AuthProps, InputValues } from '../../@types/auth.types';
import { useTranslation } from 'react-i18next';

const SignUpForm = ({ mutate, isLoading }: AuthProps) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();

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
				label={t('auth.sign_up.name.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('auth.sign_up.name.error'),
						whitespace: true,
					},
					{
						min: 2,
						message: t('auth.sign_up.name.error_length'),
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
				label={t('auth.sign_up.password.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('auth.sign_up.password.error'),
					},
					{ min: 6, message: t('auth.sign_up.password.error_length') },
					{
						pattern: new RegExp('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'),
						message: t('auth.sign_up.password.error_pattern'),
					},
				]}
				hasFeedback
			>
				<Input.Password className='input__style' name='password' />
			</Form.Item>

			<Form.Item
				name='confirm'
				label={t('auth.sign_up.password_confirmation.title')}
				dependencies={['password']}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				hasFeedback
				rules={[
					{
						required: true,
						message: t('auth.sign_up.password_confirmation.error'),
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error(t('auth.sign_up.password_confirmation.error_match'))
							);
						},
					}),
				]}
			>
				<Input.Password className='input__style' />
			</Form.Item>

			<Form.Item
				name='phone'
				label={t('auth.sign_up.phone.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: t('auth.sign_up.phone.error') },
					{
						pattern: /^\d{2} \d{3} \d{2} \d{2}$/,
						message: t('auth.sign_up.phone.error_pattern'),
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
			<CheckBox title={t('auth.sign_in.trust_checkbox')} name='trust' />
			<Form.Item>
				<ButtonPrimary isLoading={isLoading} title={t('auth.sign_up.button')} />
			</Form.Item>
		</Form>
	);
};

export default SignUpForm;
