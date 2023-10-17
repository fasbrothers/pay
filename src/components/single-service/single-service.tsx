import { useLocation, useNavigate } from 'react-router-dom';
import { ServicePaymentModal } from '../service-payment-modal';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Service } from '../../@types/inputs-type';
import { useState } from 'react';

export const SingleService = () => {
	const serviceId = useLocation().pathname.split('/')[4];
	const { data: service, isLoading } = useDataFetching<Service>(
		'single-service',
		'/service/public/' + serviceId
	);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
	const navigate = useNavigate();

	const handleCancel = () => {
		setIsModalOpen(false);
		navigate('/cabinet/main');
	};

	return (
		<>
			{!isLoading && (
				<ServicePaymentModal
					setIsModalOpen={handleCancel}
					isModalOpen={isModalOpen}
					service={service as Service}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
};
