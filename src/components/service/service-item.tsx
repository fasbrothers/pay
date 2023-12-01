import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { httpClient } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Service } from '../../@types/service.types';
import { motion } from 'framer-motion';

export const ServiceItem = ({
	service,
	index,
}: {
	service: Service;
	index: number;
}) => {
	const [starClicked, setStarClicked] = useState(service.saved);
	const handleStarClick = (e: React.MouseEvent, serviceId: string) => {
		e.stopPropagation();
		setStarClicked(!starClicked);
		mutate(serviceId);
	};
	const navigate = useNavigate();

	const handleItemClick = () => {
		navigate(`/cabinet/payments/item/${service.id}`);
	};

	const query = useQueryClient();

	const { mutate } = useMutation(async (serviceId: string) => {
		if (starClicked) {
			await httpClient.post('/customer/services', {
				serviceId,
			});
		} else {
			await httpClient.delete('/customer/services', {
				data: { serviceId },
			});
		}
		query.invalidateQueries(['services']);
	});

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.7 }}
			animate={{
				opacity: 1,
				scale: 1,
				transition: { duration: 0.01, delay: 0.1 * index },
			}}
			whileHover={{ scale: 0.98 }}
			onClick={handleItemClick}
			className='text-center w-[49%] sm:w-[32%] md:w-[45%] xl:w-[24%] 2xl:w-[22%] hover:shadow-lg border border-gray transition duration-300 rounded-xl py-3 cursor-pointer relative'
		>
			<div className='flex justify-center'>
				{service.image_url ? (
					<img
						src={service.image_url}
						alt={service.name}
						className=' w-16 h-16 object-cover rounded-[25%] border border-gray-300'
					/>
				) : (
					<AccountCircleIcon
						fontSize='large'
						style={{ fontSize: '64px' }}
						className='text-gray-600 border border-gray-300 rounded-[25%]'
					/>
				)}
			</div>
			<h5 className='font-semibold my-3'>{service.name}</h5>
			<div
				onClick={e => handleStarClick(e, service.id)}
				className='text-gray-600 absolute top-2 right-5'
			>
				{starClicked ? <StarIcon /> : <StarBorderIcon />}
			</div>
		</motion.div>
	);
};
