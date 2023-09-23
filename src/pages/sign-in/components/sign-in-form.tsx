import { Form, Input } from 'antd';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import SecurityIcon from '@mui/icons-material/Security';
import { CheckBox } from '../../../components/checkbox';
import { ButtonPrimary } from '../../../components/button';
import { ChangeEvent } from 'react';
import { InputProps } from '../../../@types/inputs-type';
import { SignInProps } from '../sign-in-type';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IResponse, IResponsePassOrOtp } from '../sign-in';

interface SignInFormProps {
	inputs: InputProps;
  setInputs: React.Dispatch<React.SetStateAction<InputProps>>;
	additionalProperties: SignInProps;
	mutate: UseMutateFunction<AxiosResponse<IResponsePassOrOtp | IResponse, any> | undefined, unknown, void, unknown>
	isLoading: boolean;
	isLoadingNumber: boolean;
}

function SignInForm({
	inputs,
	setInputs,
	additionalProperties,
	mutate,
	isLoading,
	isLoadingNumber
}: SignInFormProps) {
	const [form] = Form.useForm();

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};
	return (
		<>
			<Form
				form={form}
				name='login'
				onFinish={mutate}
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
						addonBefore={'+' + inputs.prefixPhone}
						className='input__phone'
						onChange={handleInput}
						suffix={<PhoneEnabledIcon className='text-gray-500' />}
						name='phone'
					/>
				</Form.Item>

				{additionalProperties.showOtp && (
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
							onChange={handleInput}
							name='otp'
							suffix={<SecurityIcon className='text-gray-500' />}
							className='w-full p-3'
						/>
					</Form.Item>
				)}
				{additionalProperties.showPassword && (
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
							<Input.Password
								onChange={handleInput}
								name='password'
								className='w-full p-3'
							/>
						</Form.Item>
						<CheckBox input={inputs} setInput={setInputs} />
					</>
				)}
				<Form.Item>
					<ButtonPrimary isLoading={isLoading || isLoadingNumber} title='Sign In' />
				</Form.Item>
			</Form>
		</>
	);
}

export default SignInForm;
