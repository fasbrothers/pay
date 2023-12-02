import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import { QrScreenProps } from '../../@types/profile.types';
import QrReader from '../shared/qr-reader';

function QrScreen({ setIsModalOpen }: QrScreenProps) {
	const { isLoading, mutate } = useMutation({
		mutationFn: async (value: string) => {
			const newValue = value.split('&');
			const { data } = await httpClient.post('/customer/login/qr', {
				key: newValue[0],
				allowDeviceId: newValue[1],
			});
			return data;
		},
		onSuccess: data => {
			data.message ? toastSuccessMessage(data.message) : null;
			setIsModalOpen(false);
		},
	});

	return (
		<QrReader
			setIsModalOpen={setIsModalOpen}
			isLoading={isLoading}
			mutate={mutate}
		/>
	);
}

export default QrScreen;
