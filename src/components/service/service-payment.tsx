import { Form, Select, Input } from 'antd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { currencyFormat } from '../../utils/currencyFormat';
import { ButtonPrimary } from '../shared/button';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { useNavigate } from 'react-router-dom';
import { AllCardsResponse } from '../../@types/card.types';
import { Service } from '../../@types/service.types';
import { MaskedInput } from 'antd-mask-input';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { Rule } from 'antd/lib/form';

export const ServicePayment = ({ service }: { service: Service }) => {
	const [form] = Form.useForm();

	const query = useQueryClient();
	const navigate = useNavigate();

	const { isLoading, data: cards } = useDataFetching<AllCardsResponse>(
		'cards',
		'customer/card'
	);

	const { isLoading: loading, mutate } = useMutation(
		async (value: { card: string; amount: string }) => {
			const fields: { [key: string]: string } = {};
			service.fields &&
				service.fields.forEach(field => {
					if (field.type === 'phone') {
						const fieldValue = form.getFieldValue(`fields.${field.id}`);
						form.setFieldsValue({
							[`fields.${field.id}`]:
								fieldValue && '998' + fieldValue.replace(/\s/g, ''),
						});
					}
					fields[field.id] = form.getFieldValue(`fields.${field.id}`);
				});

			const { data } = await httpClient.post('/transaction/pay', {
				serviceId: service.id,
				fromCardId: value.card,
				amount: +value.amount,
				fields,
			});
			data.message ? toastSuccessMessage(data.message) : null;
		},
		{
			onSuccess: () => {
				query.invalidateQueries(['profile']);
				navigate('/cabinet/transactions');
			},
		}
	);

	const { image_url } = service;
	return (
		<div className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'>
			<div className='flex justify-center'>
				{image_url ? (
					<img
						src={image_url}
						className='w-[150px] h-[150px] object-cover rounded-[25%]'
					/>
				) : (
					<AccountCircleIcon
						fontSize='large'
						style={{ fontSize: '150px' }}
						className='text-gray-600'
					/>
				)}
			</div>
			<Form
				form={form}
				name='update'
				onFinish={mutate}
				scrollToFirstError
				className='profile__form'
			>
				<Form.Item
					name='amount'
					label='Amount'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Please input your amount!',
							whitespace: true,
						},
						{
							pattern: /^[1-9]\d*$/,
							message: 'Amount must be a positive number',
						},
					]}
				>
					<MaskedInput
						maskOptions={{ lazy: true }}
						mask={'000000000000'}
						className='input__style'
					/>
				</Form.Item>
				{service.fields &&
					service.fields.map(field => {
						return (
							<Form.Item
								key={field.id}
								name={`fields.${field.id}`}
								label={field.name}
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								rules={[
									{
										required: true,
										message: `Please input your ${field.name}!`,
										whitespace: true,
									},
									field.type === 'phone'
										? {
												pattern: /^\d{2} \d{3} \d{2} \d{2}$/,
												message: 'Must be a valid phone number',
										}
										: ({
												required: true,
												message: 'Input is required',
										} as Rule),
								]}
							>
								{field.type === 'phone' ? (
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
								) : (
									<Input type={field.type} className='input__style' />
								)}
							</Form.Item>
						);
					})}
				<Form.Item
					label='Select a card'
					name='card'
					className='gender__select mb-10'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Please select a card!',
						},
					]}
				>
					<Select placeholder='Select a card' loading={isLoading}>
						{cards?.cards.map(card => (
							<Select.Option key={card.id} value={card.id}>
								{currencyFormat(+card.balance)} sum - {card.name}-{' '}
								{card.pan.split('').slice(-6).join('')}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item>
					<ButtonPrimary isLoading={loading} title='Pay' />
				</Form.Item>
			</Form>
		</div>
	);
};
