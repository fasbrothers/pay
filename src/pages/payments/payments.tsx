import React, { useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import Skeleton from 'antd/lib/skeleton';
import { useDataFetching } from '../../hooks/useDataFetching';
import { PaymentCategory } from '../../components/service/payment-category';
import { ServiceItem } from '../../components/service/service-item';
import { SearchInputField } from '../../components/service/search-input-field';
import { getFromCookie } from '../../utils/cookies';
import { Category, ServicesResponse } from '../../@types/service.types';
import { useSearchParams } from 'react-router-dom';

function Payments() {
	const [selectedCategory, setSelectedCategory] = useState<Category>({
		name: '',
		code: '',
	});
	const [searchParams, setSearchParams] = useSearchParams({ search: '' });

	const search = searchParams.get('search') || '';
	const { data, isLoading } = useDataFetching<ServicesResponse>(
		'services',
		'/service'
	);

	const userLanguage = getFromCookie('language');
	const savedCategory = categorySaved[userLanguage || ''];
	const categories = useMemo(() => {
		const categoryList = data?.services
			? [...new Set(data.services.map(service => service.category_code))].map(
					categoryCode => ({
						name: data.services.filter(
							service => service.category_code === categoryCode
						)[0].category_name,
						code: categoryCode,
					})
			)
			: [];

		return [savedCategory, ...categoryList];
	}, [data, savedCategory]);

	useEffect(() => {
		setSelectedCategory(prev => {
			const matchedCategory = categories.filter(
				category => category.code === prev.code
			);
			return matchedCategory.length > 0 ? matchedCategory[0] : prev;
		});
	}, [categories]);

	useEffect(() => {
		if (categories.length > 0) {
			setSelectedCategory({
				name:
					search.length > 0 ? 'Search results: ' + search : categories[0].name,
				code: search.length > 0 ? 'search' : categories[0].code,
			});
		}
	}, [categories.length, search]);

	const filteredServices = data?.services.filter(service => {
		if (selectedCategory.code === 'search' && search.length > 0) {
			return service.name.toLowerCase().includes(search.toLowerCase());
		} else if (selectedCategory.code === savedCategory.code) {
			return service.saved;
		} else {
			return service.category_name === selectedCategory.name;
		}
	});

	return (
		<>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 6 }} />
			) : (
				<div className='border border-gray-300 rounded-md my-6 flex w-full flex-col xl:flex-row'>
					<div className='hidden xl:block md:w-1/2 xl:w-1/3 p-5 border-r border-gray xl:h-[78vh] overflow-y-auto'>
						<SearchInputField
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearchParams({ search: e.target.value })
							}
						/>
						<div className='mt-3'>
							{categories.map(category => (
								<PaymentCategory
									key={category.code}
									category={category.name}
									activeCategory={selectedCategory.code === category.code}
									onClick={() => setSelectedCategory(category)}
								/>
							))}
						</div>
					</div>
					<div className='xl:hidden p-5 w-full flex flex-col items-center'>
						<SearchInputField
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearchParams({ search: e.target.value })
							}
							setWidth={'w-full sm:w-2/3'}
						/>
						<Select
							className='w-full sm:w-2/3 select__category mt-3'
							placeholder='Select a category'
							onChange={value => setSelectedCategory(value)}
						>
							{categories.map((category, i) => (
								<Select.Option key={i} value={category}>
									{category.name}
								</Select.Option>
							))}
						</Select>
					</div>
					<div className='w-full xl:h-[78vh] overflow-y-auto'>
						<div className='p-4 border-b border-gray'>
							<h4 className='text-lg font-semibold text-center xl:text-left'>
								{selectedCategory.name}
							</h4>
						</div>
						<div className='flex py-4 px-2 flex-wrap gap-y-5 justify-around gap-x-1 xl::gap-x-2'>
							{filteredServices?.map((service, i) => (
								<ServiceItem key={service.id} service={service} index={i} />
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Payments;

const categorySaved: { [key: string]: Category } = {
	ru: {
		code: 'saved',
		name: 'Сохраненные услуги',
	},
	uz: {
		code: 'saved',
		name: 'Saqlangan xizmatlar',
	},
	en: {
		code: 'saved',
		name: 'Saved services',
	},
};
