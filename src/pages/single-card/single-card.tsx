import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../../components/button';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/inputs-type';
import toastMessage from '../../utils/toast-message';
import { httpClient } from '../../api';

function SingleCard() {
	const id = useLocation().pathname.split('/')[3].toString();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await httpClient.delete(`/customer/card`, { data: { id } });
			navigate('/cabinet/cards');
			setIsModalOpen(false);
			return data;
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
	});

	return (
		<div>
			<form className='w-1/6' onSubmit={showModal}>
				<ButtonPrimary title={'Delete card'} />
			</form>
			<Link to='edit'>Edit Card</Link>
			<Modal
				title='Delete Card'
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[
					<Button key='back' onClick={handleCancel}>
						Return
					</Button>,
					<Button
						key='submit'
						loading={isLoading}
						onClick={() => {
							mutate();
						}}
					>
						Submit
					</Button>,
				]}
			>
				<h4>Do you really want to delete this card?</h4>
			</Modal>
		</div>
	);
}

export default SingleCard;
