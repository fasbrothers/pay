import { Skeleton } from 'antd';
import { DevicesResponse } from '../../@types/profile.types';
import DeleteCard from '../card/delete-card-modal';
import { ButtonPrimary } from '../shared/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import SecurityItem from './security-item';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setIsTrusted } from '../../store/slices/authSlice';

function SecurityTab() {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [id, setId] = useState<string>('');
	const isTrusted = useAppSelector(state => state.auth.isTrusted);
	const dispatch = useAppDispatch();

	const { isLoading, data } = useQuery(
		['devices'],
		async () => {
			const { data } = await httpClient.get<DevicesResponse>(
				`/customer/device`
			);
			return data;
		},
		{
			onSuccess: response => {
				dispatch(setIsTrusted(response.rows.some(device => device.current)));
			},
		}
	);

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
							isTrusted={isTrusted}
							key={device.id}
						/>
					))}
					{isTrusted ? (
						<DeleteCard
							deviceId={id}
							isModalOpen={isModalOpen}
							setIsModalOpen={setIsModalOpen}
							handleCancel={handleCancel}
							url='/customer/device'
							navigateUrl='/cabinet/profile-settings'
							modalTitle={t('profile_settings.delete_title')}
							modalMessage={t('profile_settings.delete_text')}
						/>
					) : null}
					{data?.count === 0 && (
						<p>{t('profile_settings.security_not_found')}</p>
					)}
					{isTrusted ? (
						<form onSubmit={e => mutate(e)} className='mt-4'>
							<ButtonPrimary
								title={t('profile_settings.security_button_sessions')}
								bgColor='bg-red-500'
								weight='w-[220px]'
								isLoading={isDeleting}
							/>
						</form>
					) : null}
				</div>
			)}
		</div>
	);
}

export default SecurityTab;
