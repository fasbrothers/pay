import { Form, Modal, Select } from 'antd';
import { Service } from '../../@types/inputs-type';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { currencyFormat } from '../../utils/currencyFormat';
import { ButtonPrimary } from '../button';
import { useDataFetching } from '../../hooks/useDataFetching';
import { ICardAllResponse } from '../../pages/cards/cards';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';

interface ServicePaymentModal {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	service: Service;
}

export const ServicePaymentModal = ({
	setIsModalOpen,
	isModalOpen,
	service,
}: ServicePaymentModal) => {
	const [form] = Form.useForm();

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const query = useQueryClient();

	const { isLoading, data: cards } = useDataFetching<ICardAllResponse>(
		'cards',
		'customer/card'
	);

	const { isLoading: loading, mutate } = useMutation(
		async (value: { card: string }) => {
			await httpClient.post('/transaction/pay', {
				serviceId: service.id,
				fromCardId: value.card,
			});
		},
		{
			onSuccess: () => {
				toastSuccessMessage('Successfully payed');
				query.invalidateQueries(['profile']);
				setIsModalOpen(false);
			},
		}
	);

	const { name, price, image_url } = service;
	return (
		<>
			<Modal
				title={name}
				open={isModalOpen}
				onCancel={handleCancel}
				className='profile__modal'
			>
				<div className='text-center'>
					<div className='flex justify-center'>
						{image_url ? (
							<img
								src={image_url}
								className='w-[150px] h-[150px] object-contain rounded-full'
							/>
						) : (
							<AccountCircleIcon
								fontSize='large'
								style={{ fontSize: '150px' }}
								className='text-gray-600'
							/>
						)}
					</div>
					<p className='bg-gray-100 text-gray-600 py-2 px-3 w-1/3 mx-auto rounded-xl font-semibold mt-4'>
						{currencyFormat(+price)} sum
					</p>
					<Form
						form={form}
						name='update'
						onFinish={mutate}
						scrollToFirstError
						className='profile__form'
					>
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
								{cards?.cards
									.filter(card => +card.balance > service.price)
									.map(card => (
										<Select.Option key={card.id} value={card.id}>
											{card.pan}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
						<Form.Item>
							<ButtonPrimary isLoading={loading} title='Pay' />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	);
};
