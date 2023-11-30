import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input } from 'antd';
import { httpClient } from '../../api';
import { ButtonPrimary } from '../shared/button';
import { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { useEffect } from 'react';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';
import { useTranslation } from 'react-i18next';

function VerificationCodeForm({ timeLeft }: { timeLeft: number }) {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const queryClient = useQueryClient();

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

	const showTimer = (seconds: number, minutes: number) => {
		return (
			<p className='time__for-block'>
				{t('auth.sign_up.block.title')}:{' '}
				{minutes < 10 ? `0${minutes}` : minutes}:
				{seconds < 10 ? `0${seconds}` : seconds}
			</p>
		);
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: async (code: string) => {
			const { data } = await httpClient.post('/customer/card/verify', code);
			return data;
		},
		onSuccess: data => {
			data.message ? toastSuccessMessage(data.message) : null;
			queryClient.invalidateQueries(['cards']);
			navigate('/cabinet/cards');
		},
	});

	return (
		<Form
			form={form}
			name='add card'
			onFinish={mutate}
			scrollToFirstError
			className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
		>
			<Form.Item
				name='code'
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
				<Input className='input__style' />
			</Form.Item>
			<div className='flex justify-between text-base mb-2'>
				<>{seconds > 0 || minutes > 0 ? showTimer(seconds, minutes) : null}</>
			</div>
			<Form.Item>
				<ButtonPrimary
					isLoading={isLoading}
					title={t('auth.sign_up.button_verify')}
				/>
			</Form.Item>
		</Form>
	);
}

export default VerificationCodeForm;
