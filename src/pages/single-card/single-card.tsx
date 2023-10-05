import { useLocation } from 'react-router-dom';
import { ButtonPrimary } from '../../components/button';
import { useState } from 'react';
import { DeleteCard } from '../../components/delete-card-modal';
import { CardStructure } from '../../components/card-structure';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Card, ErrorResponse } from '../../@types/inputs-type';
import { Form, Input, Skeleton } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { AxiosError } from 'axios';
import toastMessage, { toastSuccessMessage } from '../../utils/toast-message';
import BackToPreviousPage from '../../components/back-to-previous-page/back-to-previous-page';

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

	const { isLoading, mutate } = useMutation({
		mutationFn: async () => {
			const { data } = await httpClient.put('/customer/card', {
				id,
				name: nameInput,
			});
			return data;
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
		onSuccess: () => {
			query.invalidateQueries(['card']);
			toastSuccessMessage('Card updated successfully');
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
		<div className={`${isModalOpen && 'blur-sm'}`}>
			{loading ? (
				<div className='lg:w-1/2 mx-auto'>
					<Skeleton active paragraph={{ rows: 4 }} />
				</div>
			) : (
				<>
					<BackToPreviousPage title='All Cards' />
					<CardStructure
						name={data?.name || ''}
						pan={data?.pan || ''}
						expiry_month={data?.expiry_month || ''}
						expiry_year={data?.expiry_year || ''}
						balance={data?.balance || ''}
						id={data?.id || ''}
						customer_id={data?.customer_id || ''}
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
							label='Name'
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							rules={[
								{
									required: true,
									message: 'Please input your name!',
									whitespace: true,
								},
								{ min: 2, message: 'Name must be minumum 2 letters' },
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
								title='Edit'
							/>
						</Form.Item>
					</Form>
					<form
						className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto'
						onSubmit={showModal}
					>
						<ButtonPrimary title={'Delete card'} />
					</form>
					<DeleteCard
						id={id}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						handleCancel={handleCancel}
					/>
				</>
			)}
		</div>
	);
}

export default SingleCard;
