import React, { useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import Skeleton from 'antd/lib/skeleton';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Service, Services } from '../../@types/inputs-type';
import { PaymentCategory } from '../../components/payment-category';
import { ServiceItem } from '../../components/service-item';
import { SearchInputField } from '../../components/search-input-field';
import { ServicePaymentModal } from '../../components/service-payment-modal';
import { getFromCookie } from '../../utils/cookies';

const categorySaved: { [key: string]: string } = {
	ru: 'Сохраненные услуги',
	uz: 'Saqlangan xizmatlar',
	en: 'Saved services',
};

function Payments() {
	const [title, setTitle] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [service, setService] = useState<object>({});

	const { data, isLoading } = useDataFetching<Services>('services', '/service');

	const showModal = (serviceInfo: Service) => {
		setIsModalOpen(true);
		setService(serviceInfo);
	};

	const userLanguage = getFromCookie('language');
	const savedCategory = categorySaved[userLanguage || ''];
	const categories = useMemo(() => {
		const categoryList = data?.services
			? [...new Set(data.services.map(service => service.category_name))]
			: [];

		return [savedCategory, ...categoryList];
	}, [data]);

	useEffect(() => {
		if (categories.length > 0) {
			setTitle(search ? 'Search results: ' + search : categories[0]);
		}
	}, [categories, search]);

	return (
		<>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 6 }} />
			) : (
				<div className='border border-gray-300 rounded-md my-6 flex w-full flex-col md:flex-row'>
					<div className='hidden md:block md:w-1/2 xl:w-1/3 p-5 border-r border-gray'>
						<SearchInputField
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearch(e.target.value)
							}
						/>
						<div className='mt-3'>
							{categories.map(category => (
								<PaymentCategory
									key={category}
									category={category}
									activeCategory={title}
									onClick={() => setTitle(category)}
								/>
							))}
						</div>
					</div>
					<div className='md:hidden p-5 w-full flex flex-col items-center'>
						<SearchInputField
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearch(e.target.value)
							}
						/>
						<Select
							className='w-full sm:w-2/3 select__category mt-3'
							placeholder='Select a category'
							onChange={value => setTitle(value)}
						>
							{categories.map((category, i) => (
								<Select.Option key={i} value={category}>
									{category}
								</Select.Option>
							))}
						</Select>
					</div>
					<div className='w-full md:w-1/2 xl:w-2/3'>
						<div className='p-4 border-b border-gray'>
							<h4 className='text-lg font-semibold text-center md:text-left'>
								{title}
							</h4>
						</div>
						<div className='flex p-4 flex-wrap gap-y-5 justify-around gap-x-2'>
							{data?.services
								.filter(service =>
									search.length > 0
										? service.name.toLowerCase().includes(search.toLowerCase())
										: title === categorySaved[userLanguage || '']
										? service.saved
										: service.category_name === title
								)
								.map(service => (
									<ServiceItem
										key={service.id}
										service={service}
										showModal={showModal}
									/>
								))}
						</div>
					</div>
				</div>
			)}
			<ServicePaymentModal
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
				service={service as Service}
			/>
		</>
	);
}

export default Payments;
