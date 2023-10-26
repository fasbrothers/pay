import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toastSuccessMessage } from '../../utils/toast-message';
import { DeleteCardProps } from '../../@types/card.types';

export function DeleteCard({
	id,
	isModalOpen,
	setIsModalOpen,
	handleCancel,
	url,
	navigateUrl,
	modalTitle,
	modalMessage,
}: DeleteCardProps) {
	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await httpClient.delete(url, {
				data: { id },
			});
			setIsModalOpen(false);
			data.message ? toastSuccessMessage(data.message) : null;
		},
		onSuccess: () => {
			navigate(navigateUrl);
		},
	});
	return (
		<Modal
			title={modalTitle}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={[
				<Button key='back' onClick={handleCancel}>
					Return
				</Button>,
				<Button
					key='submit'
					loading={isLoading}
					className='bg-red-500 text-white  hover:bg-white hover:border'
					onClick={() => {
						mutate();
					}}
				>
					Delete
				</Button>,
			]}
		>
			<h4>{modalMessage}</h4>
		</Modal>
	);
}

export default DeleteCard;
