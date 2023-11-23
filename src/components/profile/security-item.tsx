import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../shared/button';
import { SecurityItemProps } from '../../@types/profile.types';

function SecurityItem({ device, showModal, isTrusted }: SecurityItemProps) {
	const { t } = useTranslation();

	return (
		<div
			key={device.id}
			className={`${
				device.current ? 'bg-slate-200' : 'bg-gray-100'
			} p-6 hover:bg-slate-200 rounded-lg transition duration-300 ease-in-out cursor-pointer mt-2`}
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
				{isTrusted ? (
					<form onSubmit={e => showModal(e, device.id)}>
						<ButtonPrimary
							title={t('profile_settings.security_button')}
							bgColor='bg-red-500'
						/>
					</form>
				) : null}
			</div>
		</div>
	);
}

export default SecurityItem;
