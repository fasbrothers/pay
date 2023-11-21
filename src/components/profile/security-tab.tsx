import { Skeleton } from 'antd';
import { DevicesResponse } from '../../@types/profile.types';
import { useDataFetching } from '../../hooks/useDataFetching';
import DeleteCard from '../card/delete-card-modal';
import { ButtonPrimary } from '../shared/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import SecurityItem from './security-item';

function SecurityTab() {
	const { isLoading, data } = useDataFetching<DevicesResponse>(
		'devices',
		'customer/device'
	);

	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [id, setId] = useState<string>('');

	const showModal = (e: React.FormEvent<HTMLFormElement>, id: number) => {
		e.preventDefault();
		setIsModalOpen(true);
		setId(id.toString());
	};

	const { mutate, isLoading: isDeleting } = useMutation({
		mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const { data } = await httpClient.post(`/customer/endsessions`);
			return data;
		},
		onSuccess: response => {
			response.message ? toastSuccessMessage(response.message) : null;
		},
	});

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<h4 className='font-bold text-xl mb-3'>
				{t('profile_settings.security_title')}
			</h4>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 4 }} />
			) : (
				<div className='w-full xl:w-2/3'>
					{data?.rows?.map(device => (
						<SecurityItem
							device={device}
							showModal={showModal}
							key={device.id}
						/>
					))}
					<DeleteCard
						deviceId={id}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						handleCancel={handleCancel}
						url='/customer/device'
						navigateUrl='/cabinet/profile-settings'
						modalTitle={'Delete a device'}
						modalMessage={'Are you sure you want to delete this device?'}
					/>
					{data?.count === 0 && <p>{t('profile_settings.security_not_found')}</p>}
					<form onSubmit={e => mutate(e)} className='mt-4'>
						<ButtonPrimary
							title={t('profile_settings.security_button_sessions')}
							bgColor='bg-red-500'
							weight='w-[200px]'
							isLoading={isDeleting}
						/>
					</form>
				</div>
			)}
		</div>
	);
}

export default SecurityTab;
