import { Form, Input } from 'antd';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';
import { CheckBox } from '../shared/checkbox';
import { ButtonPrimary } from '../shared/button';
import { MaskedInput } from 'antd-mask-input';
import { AuthProps, InputValues } from '../../@types/auth.types';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { useEffect } from 'react';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';
import { useTranslation } from 'react-i18next';

function SignInForm({
	additionalProperties,
	mutate,
	isLoading,
	timeLeft,
}: AuthProps) {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	function handleSubmit(values: InputValues) {
		values.phone = values.phone && values.phone.replace(/\s/g, '');
		mutate(values);
	}

	const { minutes, seconds, setMinutes, setSeconds }: TimerState = useTimer({
		initialSeconds: timeLeft || 0,
	});

	useEffect(() => {
		const { minutes, remainingSeconds } = convertSecondsToMinutes(
			timeLeft || 0
		);
		setMinutes(minutes);
		setSeconds(remainingSeconds);
	}, [timeLeft, setMinutes, setSeconds]);

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
					label={t('auth.sign_in.phone.title')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{ required: true, message: t('auth.sign_in.phone.error') },
						{
							pattern: /^\d{2} \d{3} \d{2} \d{2}$/,
							message: t('auth.sign_in.phone.error_pattern'),
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
						label={t('auth.sign_in.otp.title')}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
								message: t('auth.sign_in.otp.error'),
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
							label={t('auth.sign_in.password.title')}
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: t('auth.sign_in.password.error'),
								},
							]}
						>
							<Input.Password name='password' className='input__style' />
						</Form.Item>
						<CheckBox title={t('auth.sign_in.trust_checkbox')} name='trust' />
					</>
				)}
				{seconds > 0 || minutes > 0 ? (
					<p className='mb-3 text-base'>
						{t('auth.sign_in.block.title')} :{' '}
						{minutes < 10 ? `0${minutes}` : minutes}:
						{seconds < 10 ? `0${seconds}` : seconds}
					</p>
				) : null}
				<Form.Item>
					<ButtonPrimary
						disabled={seconds > 0 || minutes > 0}
						isLoading={isLoading}
						title={
							seconds > 0 || minutes > 0
								? t('auth.sign_in.button_blocked')
								: t('auth.sign_in.button')
						}
					/>
				</Form.Item>
			</Form>
		</>
	);
}

export default SignInForm;
