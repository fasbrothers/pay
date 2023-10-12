import React, { useState, useEffect, useMemo } from 'react';
import { Input, Select } from 'antd';
import Skeleton from 'antd/lib/skeleton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Service, Services } from '../../@types/inputs-type';
import { currencyFormat } from '../../utils/currencyFormat';

function Payments() {
	const [title, setTitle] = useState<string>('');

	const [search, setSearch] = useState<string>('');
	const { data, isLoading } = useDataFetching<Services>('services', '/service');

	const categories = useMemo(() => {
		return data?.services
			? [...new Set(data.services.map(service => service.category_name))]
			: [];
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
						<InputField
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearch(e.target.value)
							}
						/>
						{categories.map(category => (
							<PaymentCategory
								key={category}
								category={category}
								onClick={() => setTitle(category)}
							/>
						))}
					</div>
					<div className='md:hidden p-5 w-full flex flex-col items-center'>
						<InputField
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
						<div className='flex p-4 flex-wrap gap-y-5'>
							{data?.services
								.filter(service =>
									search.length > 0
										? service.name.toLowerCase().includes(search.toLowerCase())
										: service.category_name === title
								)
								.map(service => (
									<ServiceItem key={service.id} service={service} />
								))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Payments;

function PaymentCategory({
	category,
	onClick,
}: {
	category: string;
	onClick: () => void;
}) {
	return (
		<div
			className='border-b border-gray py-4 px-3 cursor-pointer'
			onClick={onClick}
		>
			<h4 className='text-lg font-semibold'>{category}</h4>
		</div>
	);
}

function ServiceItem({ service }: { service: Service }) {
	return (
		<div className='text-center w-1/2 md:w-3/4 xl:w-1/4 hover:shadow-xl transition duration-300 rounded-xl py-3 cursor-pointer'>
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
			<p className='bg-gray-100 text-gray-600 py-2 px-3 w-3/4 mx-auto'>
				{currencyFormat(+service.price)} sum
			</p>
		</div>
	);
}

function InputField({
	value,
	onChange,
}: {
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
	return (
		<Input
			size='large'
			className='p-3'
			value={value}
			onChange={onChange}
			placeholder='Search for payment providers'
			prefix={<SearchIcon className='text-gray-400' />}
		/>
	);
}
