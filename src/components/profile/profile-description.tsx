import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../utils/formatNumber';
import { ProfileResponse } from '../../@types/profile.types';

function ProfileDescription({ profile }: { profile: ProfileResponse }) {
	const { t } = useTranslation();

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
		<div className={`flex flex-col-reverse md:flex-row items-center `}>
			<div className='bg-gray-100 w-full md:w-2/3 p-6 rounded-xl'>
				<div className='border-b-2 pb-3 border-gray-200'>
					<p className='text-sm'>{t('profile_settings.name')}</p>
					<h3 className='mt-1 font-bold'>{name}</h3>
				</div>
				<div className='border-b-2 py-3 border-gray-200'>
					<p className='text-sm'>{t('profile_settings.phone')}</p>
					<h3 className='mt-1 font-bold'>+{formatNumber(phone as string)}</h3>
				</div>
				<div className='border-b-2 py-3 border-gray-200'>
					<p className='text-sm'>{t('profile_settings.gender')}</p>
					<h3 className='mt-1 font-bold'>{getGenderString(gender)}</h3>
				</div>
				<div className='pt-3'>
					<p className='text-sm'>{t('profile_settings.dob')}</p>
					<h3 className='mt-1 font-bold'>
						{birth_date ? dayjs(birth_date).format('DD.MM.YYYY') : '-'}
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
	);
}

export default ProfileDescription;
