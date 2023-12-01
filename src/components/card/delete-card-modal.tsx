import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toastSuccessMessage } from '../../utils/toast-message';
import { DeleteCardProps } from '../../@types/card.types';
import { useTranslation } from 'react-i18next';

export function DeleteCard({
	id,
	deviceId,
	isModalOpen,
	setIsModalOpen,
	handleCancel,
	url,
	navigateUrl,
	modalTitle,
	modalMessage,
	type,
}: DeleteCardProps) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await httpClient.delete(url, {
				data: {
					id,
					deviceId,
					type,
				},
			});
			setIsModalOpen(false);
			data.message ? toastSuccessMessage(data.message) : null;
		},
		onSuccess: () => {
			navigate(navigateUrl);
			if (deviceId) {
				queryClient.invalidateQueries(['devices']);
			}
			if (id) {
				queryClient.invalidateQueries(['cards']);
			}
		},
	});
	return (
		<Modal
			title={modalTitle}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={[
				<Button key='back' onClick={handleCancel}>
					{t('cards.delete_cancel')}
				</Button>,
				<Button
					key='submit'
					loading={isLoading}
					className='bg-red-500 text-white  hover:bg-white hover:border'
					onClick={() => {
						mutate();
					}}
				>
					{t('cards.delete_button')}
				</Button>,
			]}
		>
			<h4>{modalMessage}</h4>
		</Modal>
	);
}

export default DeleteCard;
