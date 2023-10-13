import { Service } from '../../@types/inputs-type';
import { currencyFormat } from '../../utils/currencyFormat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ServiceItem = ({
	service,
	showModal,
}: {
	service: Service;
	showModal: (serviceInfo: Service) => void;
}) => {
	return (
		<div
			onClick={() => showModal(service)}
			className='text-center w-1/2 md:w-3/4 xl:w-1/4 hover:shadow-xl transition duration-300 rounded-xl py-3 cursor-pointer'
		>
			<div className='flex justify-center'>
				{service.image_url ? (
					<img
						src={service.image_url}
						alt={service.name}
						className='rounded-full w-16 h-16 object-contain'
					/>
				) : (
					<AccountCircleIcon
						fontSize='large'
						style={{ fontSize: '64px' }}
						className='text-gray-600'
					/>
				)}
			</div>
			<h5 className='font-semibold my-3'>{service.name}</h5>
			<p className='bg-gray-100 text-gray-600 py-2 px-3 w-3/4 mx-auto rounded-xl font-semibold'>
				{currencyFormat(+service.price)} sum
			</p>
		</div>
	);
};
