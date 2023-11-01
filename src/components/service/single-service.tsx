import { useLocation } from 'react-router-dom';
import { ServicePayment } from './service-payment';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Service } from '../../@types/service.types';
import { Spin } from 'antd';

export const SingleService = () => {
	const serviceId = useLocation().pathname.split('/')[4];
	const { data: service, isFetching } = useDataFetching<Service>(
		'single-service',
		'/service/public/' + serviceId
	);

	return (
		<>
			{isFetching ? (
				<div className='flex justify-center items-center h-[50vh]'>
					<Spin size='large' />
				</div>
			) : (
				<ServicePayment service={service as Service} />
			)}
		</>
	);
};
