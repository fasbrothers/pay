import { useLocation, useNavigate } from 'react-router-dom';
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
import { CheckBox } from '../../components/shared/checkbox';

function SingleCard() {
	const id = useLocation().pathname.split('/')[3].toString();
	const { state } = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const { data, isLoading: loading } = useDataFetching<Card>(
		'card',
		`/customer/card/${id}?type=${state.type}`,
		id
	);

	const query = useQueryClient();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { isLoading, mutate } = useMutation({
		mutationFn: async (values: { name: string; main: boolean }) => {
			const { data } = await httpClient.put('/customer/card', {
				id,
				name: values.name,
				main: values.main !== undefined ? values.main : false,
				type: state.type,
			});
			data.message ? toastSuccessMessage(data.message) : null;
		},
		onSuccess: () => {
			query.invalidateQueries();
			navigate('/cabinet/cards');
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
				<>
					{data && (
						<div>
							<BackToPreviousPage title={t('cards.card_details')} />
							<CardStructure
								name={data.name}
								pan={data.pan}
								expiry_month={data.expiry_month}
								expiry_year={data.expiry_year}
								balance={data.balance}
								id={data.id}
								customer_id={data.customer_id}
								owner_name={data.owner_name}
								single_card={true}
								type={data.type}
							/>

							<Form
								form={form}
								name='add card'
								onFinish={value => mutate(value)}
								scrollToFirstError
								className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
								initialValues={{
									name: data && data?.name,
									main: data && data?.main,
								}}
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
									<Input className='input__style' />
								</Form.Item>
								<CheckBox name='main' title={t('cards.main')} />
								<Form.Item>
									<ButtonPrimary
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
								type={state.type}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default SingleCard;
