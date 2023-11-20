import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ButtonPrimary } from '../../components/shared/button';
import { Skeleton } from 'antd';
import { useState } from 'react';
import ModelForm from './components/model-form';
import { useDataFetching } from '../../hooks/useDataFetching';
import dayjs from 'dayjs';
import { formatNumber } from '../../utils/formatNumber';
import { useTranslation } from 'react-i18next';
import { ProfileResponse, Tabs } from '../../@types/profile.types';
import Tab from '../../components/shared/tab';
import SecurityTab from '../../components/profile/security-tab';
import QrReader from '../../components/profile/qr-reader';

function ProfileSettings() {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
	const [isSecurity, setIsSecurity] = useState<boolean>(false);
	const profileType: Tabs[] = t('profile_settings.profile_tab', {
		returnObjects: true,
	}) as Tabs[];

	const [activeTabName, setActiveTabName] = useState<string>(
		profileType[0].name
	);
	const { isLoading, data: profile } = useDataFetching<ProfileResponse>(
		'profile',
		'customer/profile'
	);

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const showQr = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsQrOpen(true);
	};

	const getGenderString = (gender: string | null | undefined): string => {
		switch (gender) {
			case 'M':
				return t('profile_settings.gender_one');
			case 'F':
				return t('profile_settings.gender_two');
			default:
				return t('profile_settings.gender_three');
		}
	};

	const { name, gender, birth_date, phone, image_url } = profile || {};

	return (
		<div>
			<div className='h-16 bg-gray-100 rounded-2xl flex justify-around items-center w-[230px] p-2 gap-x-2 mt-2 mb-4'>
				<Tab
					tabsType={profileType}
					activeTabName={activeTabName}
					setActiveTabName={setActiveTabName}
					isSecondTabActive={isSecurity}
					setIsSecondTabActive={setIsSecurity}
				/>
			</div>
			{isSecurity ? (
				<SecurityTab />
			) : (
				<>
					<h4 className='font-bold text-xl mb-3'>
						{t('profile_settings.information')}
					</h4>
					{isLoading ? (
						<Skeleton active paragraph={{ rows: 4 }} />
					) : (
						<>
							<div
								className={`flex flex-col-reverse md:flex-row items-center `}
							>
								<div className='bg-gray-100 w-full md:w-2/3 p-6 rounded-xl'>
									<div className='border-b-2 pb-3 border-gray-200'>
										<p className='text-sm'>{t('profile_settings.name')}</p>
										<h3 className='mt-1 font-bold'>{name}</h3>
									</div>
									<div className='border-b-2 py-3 border-gray-200'>
										<p className='text-sm'>{t('profile_settings.phone')}</p>
										<h3 className='mt-1 font-bold'>
											+{formatNumber(phone as string)}
										</h3>
									</div>
									<div className='border-b-2 py-3 border-gray-200'>
										<p className='text-sm'>{t('profile_settings.gender')}</p>
										<h3 className='mt-1 font-bold'>
											{getGenderString(gender)}
										</h3>
									</div>
									<div className='pt-3'>
										<p className='text-sm'>{t('profile_settings.dob')}</p>
										<h3 className='mt-1 font-bold'>
											{birth_date
												? dayjs(birth_date).format('DD.MM.YYYY')
												: '-'}
										</h3>
									</div>
								</div>
								<div className='w-full md:w-1/3 flex justify-center items-center pl-5'>
									{image_url ? (
										<div className='m-auto mb-5'>
											<img
												src={image_url}
												className='rounded-full w-[200px] md:w-[250px] object-contain'
												alt={name}
											/>
										</div>
									) : (
										<AccountCircleIcon
											fontSize='large'
											style={{ fontSize: '250px' }}
											className='text-gray-600'
										/>
									)}
								</div>
							</div>
							<div className='flex justify-center lg:justify-between w-full md:w-2/3 my-10 flex-wrap gap-x-4 lg:gap-x-0 gap-y-2'>
								<form className='w-60' onSubmit={showModal}>
									<ButtonPrimary title={t('profile_settings.update_button')} />
								</form>
								<form className='w-60' onSubmit={showQr}>
									<ButtonPrimary title={t('profile_settings.qr_button')} />
								</form>
							</div>
							<ModelForm
								isModalOpen={isModalOpen}
								setIsModalOpen={setIsModalOpen}
								profile={profile}
							/>
							{isQrOpen && <QrReader setIsModalOpen={setIsQrOpen} />}
						</>
					)}
				</>
			)}
		</div>
	);
}

export default ProfileSettings;
