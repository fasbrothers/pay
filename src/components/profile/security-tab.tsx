import { Skeleton } from 'antd';
import { DevicesResponse } from '../../@types/profile.types';
import { useDataFetching } from '../../hooks/useDataFetching';
import { getFromCookie } from '../../utils/cookies';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import dayjs from 'dayjs';
import DeleteCard from '../card/delete-card-modal';
import { ButtonPrimary } from '../shared/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function SecurityTab() {
	const deviceId = getFromCookie('uid');
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
						<div
							key={device.id}
							className={`${
								deviceId === device.device_id ? 'bg-slate-200' : 'bg-gray-100'
							} p-6 `}
						>
							<div className='flex justify-between'>
								<div className='flex gap-x-4 items-center'>
									<div className='p-3 border border-gray-600 rounded-lg hidden sm:block'>
										<LaptopMacIcon className='text-gray-600' />
									</div>
									<div>
										<p className='text-xs'>
											{dayjs(device.last_login).format('MMMM D, YYYY h:mm A')}
										</p>
										<h3 className='mt-1 font-bold flex flex-wrap text-sm lg:text-base'>
											{device.name}
										</h3>
									</div>
								</div>
								<form onSubmit={e => showModal(e, device.id)}>
									<ButtonPrimary
										title={t('profile_settings.security_button')}
										bgColor='bg-red-500'
									/>
								</form>
							</div>
						</div>
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
					{data?.count === 0 && <p>No devices found</p>}
				</div>
			)}
		</div>
	);
}

export default SecurityTab;
