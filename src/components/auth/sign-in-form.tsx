import { Form, Input } from 'antd';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';
import { CheckBox } from '../shared/checkbox';
import { ButtonPrimary } from '../shared/button';
import { MaskedInput } from 'antd-mask-input';
import { AuthProps, InputValues } from '../../@types/auth.types';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { useEffect, MouseEvent } from 'react';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/error.types';

function SignInForm({
	additionalProperties,
	mutate,
	isLoading,
	timeLeft,
	setTimeLeft,
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

	const { mutate: resendOTP } = useMutation({
		mutationFn: async (phone: string) => {
			const { data } = await httpClient.post('/customer/getlogin', {
				phone: '998' + phone,
			});

			setTimeLeft && setTimeLeft(data.timeLeft);
		},
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.data.type === 'TRY_AGAIN_AFTER') {
				setTimeLeft && setTimeLeft(axiosError.response.data?.info?.timeLeft);
			}
		},
	});

	const handleResend = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let { phone } = form.getFieldsValue(['phone']);
		phone = phone.replace(/\s/g, '');
		resendOTP(phone);
	};

	const showTimer = (seconds: number, minutes: number) => {
		return (
			<p className='time__for-block'>
				{t('auth.sign_up.block.title')}:{' '}
				{minutes < 10 ? `0${minutes}` : minutes}:
				{seconds < 10 ? `0${seconds}` : seconds}
			</p>
		);
	};

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
					</>
				)}
				<div
					className={`${
						additionalProperties?.showPassword || additionalProperties?.showOtp
							? 'hidden'
							: 'flex'
					}`}
				>
					<CheckBox title={t('auth.sign_in.trust_checkbox')} name='trust' />
				</div>

				<div className='flex justify-between text-base mb-2'>
					{additionalProperties?.showOtp ? (
						<>
							{seconds > 0 || minutes > 0 ? (
								showTimer(seconds, minutes)
							) : (
								<p>{t('auth.sign_up.no_block')}</p>
							)}
							<button
								onClick={e => handleResend(e)}
								disabled={seconds > 0 || minutes > 0}
								className={`font-medium mb-2 w-2/10 ml-auto ${
									seconds > 0 || minutes > 0
										? 'text-[#a3a5a7]'
										: 'text-blue-700'
								} `}
							>
								{t('auth.sign_up.block.button')}
							</button>
						</>
					) : (
						<>
							{seconds > 0 || minutes > 0 ? showTimer(seconds, minutes) : null}
						</>
					)}
				</div>

				<Form.Item>
					<ButtonPrimary
						isLoading={isLoading}
						title={t('auth.sign_in.button')}
					/>
				</Form.Item>
			</Form>
		</>
	);
}

export default SignInForm;
