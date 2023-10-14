import { Service } from '../../@types/inputs-type';
import { currencyFormat } from '../../utils/currencyFormat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';

export const ServiceItem = ({
	service,
	showModal,
}: {
	service: Service;
	showModal: (serviceInfo: Service) => void;
}) => {
	const [starClicked, setStarClicked] = useState(service.saved);
	const handleStarClick = (e: React.MouseEvent, serviceId: string) => {
		e.stopPropagation();
		setStarClicked(!starClicked);
		mutate(serviceId);
	};

	const handleItemClick = () => {
		showModal(service);
	};

	const query = useQueryClient();

	const { mutate } = useMutation(async (serviceId: string) => {
		if (starClicked) {
			await httpClient.post('/customer/services', {
				serviceId,
			});
			toastSuccessMessage('Successfully added to saved category');
		} else {
			await httpClient.delete('/customer/services', {
				data: { serviceId },
			});
			toastSuccessMessage('Successfully deleted to saved category');
		}
		query.invalidateQueries(['services']);
	});

	return (
		<div
			onClick={handleItemClick}
			className='text-center w-full md:w-3/4 xl:w-1/4 hover:shadow-lg border border-gray transition duration-300 rounded-xl py-3 cursor-pointer relative'
		>
			<div className='flex justify-center'>
				{service.image_url ? (
					<img
						src={service.image_url}
						alt={service.name}
						className=' w-16 h-16 object-contain'
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
			<div
				onClick={e => handleStarClick(e, service.id)}
				className='text-gray-600 absolute top-2 right-5'
			>
				{starClicked ? <StarIcon /> : <StarBorderIcon />}
			</div>
		</div>
	);
};
