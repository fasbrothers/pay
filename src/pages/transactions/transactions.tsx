import { Button, Space } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { useState } from 'react';
import type { TableProps } from 'antd';
import type {
	ColumnsType,
	FilterValue,
	SorterResult,
} from 'antd/es/table/interface';
import { currencyFormat } from '../../utils/currencyFormat';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { dateFormat, dayjs } from '../../utils/date';
import { DateRangeForm } from '../../components/data-range-form';
import { Table } from '../../components/table';
import {
	Transaction,
	TransactionResponse,
} from '../../@types/transaction.types';

function Transactions() {
	const [dateRange, setDateRange] = useState([dayjs().add(-7, 'd'), dayjs()]);

	const {
		mutate: fetchInitialData,
		isLoading: isLoadingInitialData,
		data: initialData,
	} = useMutation(async () => {
		const fromDate = dateRange[0].format(dateFormat);
		const toDate = dateRange[1].format(dateFormat);

		const { data } = await httpClient.post<TransactionResponse>(
			'/transaction',
			{
				fromDate,
				toDate,
				offset: new Date().getTimezoneOffset() / 60,
			}
		);

		return data;
	});

	const {
		mutate: fetchDataOnFormSubmit,
		isLoading: isLoadingFormSubmit,
		data: formSubmitData,
	} = useMutation(async (values: { rangePicker: string[] }) => {
		const { data } = await httpClient.post<TransactionResponse>(
			'/transaction',
			{
				fromDate: dayjs(values.rangePicker[0]).format(dateFormat),
				toDate: dayjs(values.rangePicker[1]).format(dateFormat),
				offset: new Date().getTimezoneOffset() / 60,
			}
		);
		return data;
	});

	useEffect(() => {
		fetchInitialData();
	}, [fetchInitialData]);

	const handleFormSubmit = (values: { rangePicker: string[] }) => {
		fetchDataOnFormSubmit(values);
		setDateRange(values.rangePicker.map(date => dayjs(date)));
	};

	const [filteredInfo, setFilteredInfo] = useState<
		Record<string, FilterValue | null>
	>({});
	const [sortedInfo, setSortedInfo] = useState<SorterResult<Transaction>>({});

	const handleChange: TableProps<Transaction>['onChange'] = (
		pagination,
		filters,
		sorter
	) => {
		console.log('Various parameters', pagination, filters, sorter);
		setFilteredInfo(filters);
		setSortedInfo(sorter as SorterResult<Transaction>);
	};

	const clearFilters = () => {
		setFilteredInfo({});
	};

	const clearAll = () => {
		setFilteredInfo({});
		setSortedInfo({});
	};

	const setAgeSort = () => {
		setSortedInfo({
			order: 'descend',
			columnKey: 'type',
		});
	};

	const columns: ColumnsType<Transaction> = [
		{
			title: 'Date',
			dataIndex: 'created_at',
			key: 'date',
			sorter: (a, b) => a.created_at.localeCompare(b.created_at),
			sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
			ellipsis: true,
			width: '15%',
			render: (_, record) => (
				<div className='flex gap-x-2'>
					<p>{dayjs(record.created_at).format('DD MMM YYYY')}</p>
					<p>{dayjs(record.created_at).format('HH:mm')}</p>
				</div>
			),
		},
		{
			title: 'Details',
			dataIndex: 'details',
			key: 'details',
			width: '30%',
			render: (_, record) => (
				<>
					{record.type === 'income' ? (
						<div className='flex items-center gap-x-2'>
							{record.sender.image_url ? (
								<img
									src={record.sender.image_url}
									className='w-10 h-10 object-cover rounded-full '
									alt=''
								/>
							) : (
								<AccountCircleIcon className='text-gray-600' fontSize='large' />
							)}
							<div>
								<h3 className='font-semibold text-base'>
									{record.sender.name}{' '}
									{record.sender.pan.split('').slice(-6).join('')}
								</h3>
								<p>To {record.receiver.name}</p>
							</div>
						</div>
					) : (
						<div className='flex items-center gap-x-2'>
							{record.receiver.image_url ? (
								<img
									src={record.receiver.image_url}
									className='w-10 h-10 object-cover rounded-full'
									alt=''
								/>
							) : (
								<AccountCircleIcon className='text-gray-600' fontSize='large' />
							)}
							<div>
								<h3 className='font-semibold text-base'>
									{record.receiver.name}{' '}
									{record.receiver.pan &&
										record.receiver.pan.split('').slice(-6).join('')}
								</h3>
								<p>From {record.sender.name}</p>
							</div>
						</div>
					)}
				</>
			),
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: '15%',
			filters: [
				{ text: 'Expense', value: 'expense' },
				{ text: 'Income', value: 'income' },
			],
			filteredValue: filteredInfo.type || null, // Change this line
			onFilter: (value, record) => record.type === value,
			sorter: (a, b) => a.type.localeCompare(b.type), // Change the sorter function
			sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			sorter: (a, b) => a.action.length - b.action.length,
			sortOrder: sortedInfo.columnKey === 'action' ? sortedInfo.order : null,
			ellipsis: true,
			width: '10%',
			render: (_, record) => (
				<>
					{record.action === 'transfer' ? (
						<p className='bg-green-300 rounded-2xl px-2 py-1 text-center text-white'>
							{record.action}
						</p>
					) : (
						<p className='bg-red-300 rounded-2xl px-2 py-1 text-center text-white'>
							{record.action}
						</p>
					)}
				</>
			),
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			sorter: (a, b) => {
				const aAmount = a.type === 'income' ? +a.amount : -a.amount;
				const bAmount = b.type === 'income' ? +b.amount : -b.amount;

				return aAmount - bAmount;
			},
			sortOrder: sortedInfo.columnKey === 'amount' ? sortedInfo.order : null,
			ellipsis: true,
			width: '15%',
			render: (_, record) => (
				<p className='font-semibold'>
					{record.type === 'income' ? <span>+</span> : <span>-</span>}
					<span>{currencyFormat(+record.amount)} sum</span>
				</p>
			),
		},
	];
	const getRowClassName = (record: Transaction) => {
		return record.type === 'income'
			? 'bg-green-50 cursor-pointer'
			: 'bg-red-50 cursor-pointer';
	};

	return (
		<div>
			<DateRangeForm
				onSubmit={handleFormSubmit}
				isLoading={isLoadingFormSubmit}
			/>
			<Space style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap' }}>
				<Button onClick={setAgeSort}>Sort Type</Button>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button>
			</Space>
			<Table
				columns={columns}
				data={
					(formSubmitData?.transactions.map(transaction => ({
						...transaction,
						key: transaction.id,
					})) as Transaction[]) ||
					initialData?.transactions.map(transaction => ({
						...transaction,
						key: transaction.id,
					}))
				}
				onChange={handleChange}
				isLoading={isLoadingFormSubmit || isLoadingInitialData}
				rowClassName={getRowClassName}
			/>
		</div>
	);
}

export default Transactions;
