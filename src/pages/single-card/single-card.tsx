import { useLocation } from 'react-router-dom';
import { ButtonPrimary } from '../../components/shared/button';
import { useState } from 'react';
import { DeleteCard } from '../../components/card/delete-card-modal';
import { CardStructure } from '../../components/card/card-structure';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Form, Input, Skeleton } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { BackToPreviousPage } from '../../components/shared/back-to-previous-page';
import { Card } from '../../@types/card.types';
import { useTranslation } from 'react-i18next';

function SingleCard() {
	const id = useLocation().pathname.split('/')[3].toString();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const { data, isLoading: loading } = useDataFetching<Card>(
		'card',
		`/customer/card/${id}`,
		id
	);
	const [nameInput, setNameInput] = useState<string | undefined>(data?.name);
	const [disabled, setDisabled] = useState<boolean>(true);
	const query = useQueryClient();
	const { t } = useTranslation();

	const { isLoading, mutate } = useMutation({
		mutationFn: async () => {
			const { data } = await httpClient.put('/customer/card', {
				id,
				name: nameInput,
			});
			data.message ? toastSuccessMessage(data.message) : null;
			return data;
		},
		onSuccess: () => {
			query.invalidateQueries(['card']);
		},
	});

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			{loading ? (
				<div className='lg:w-1/2 mx-auto'>
					<Skeleton active paragraph={{ rows: 4 }} />
				</div>
			) : (
				<div>
					<BackToPreviousPage title={t('cards.card_details')} />
					<CardStructure
						name={data?.name || ''}
						pan={data?.pan || ''}
						expiry_month={data?.expiry_month || ''}
						expiry_year={data?.expiry_year || ''}
						balance={data?.balance || ''}
						id={data?.id || ''}
						customer_id={data?.customer_id || ''}
						owner_name={data?.owner_name || ''}
						single_card={true}
					/>

					<Form
						form={form}
						name='add card'
						onFinish={value => mutate(value)}
						scrollToFirstError
						className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
						initialValues={{ name: data && data?.name }}
					>
						<Form.Item
							name='name'
							label={t('cards.name.title')}
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: t('cards.name.error'),
									whitespace: true,
								},
								{ min: 2, message: t('cards.name.error_length') },
							]}
						>
							<Input
								className='input__style'
								name='name'
								onChange={e => {
									setNameInput(e.target.value);
									setDisabled(false);
								}}
							/>
						</Form.Item>
						<Form.Item>
							<ButtonPrimary
								disabled={disabled}
								isLoading={isLoading}
								title={t('cards.save_button')}
							/>
						</Form.Item>
					</Form>
					<form
						className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto'
						onSubmit={showModal}
					>
						<ButtonPrimary
							bgColor='bg-red-500'
							title={t('cards.delete_button')}
						/>
					</form>
					<DeleteCard
						id={id}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						handleCancel={handleCancel}
						url='/customer/card'
						navigateUrl='/cabinet/cards'
						modalTitle={t('cards.delete_title')}
						modalMessage={t('cards.delete_text')}
					/>
				</div>
			)}
		</div>
	);
}

export default SingleCard;
