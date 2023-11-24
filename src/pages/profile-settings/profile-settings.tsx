import { ButtonPrimary } from '../../components/shared/button';
import { Skeleton } from 'antd';
import { useState } from 'react';
import ModelForm from './components/model-form';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useTranslation } from 'react-i18next';
import { ProfileResponse, Tabs } from '../../@types/profile.types';
import Tab from '../../components/shared/tab';
import SecurityTab from '../../components/profile/security-tab';
import QrReader from '../../components/profile/qr-reader';
import ProfileDescription from '../../components/profile/profile-description';

function ProfileSettings() {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
	const [isSecurity, setIsSecurity] = useState<boolean>(false);
	const profileType: Tabs[] = t('profile_settings.profile_tab', {
		returnObjects: true,
	}) as Tabs[];

	const [activeTabName, setActiveTabName] = useState<string>(
		profileType[0].code
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
							<ProfileDescription profile={profile as ProfileResponse} />
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
