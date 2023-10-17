import { Button, DatePicker, Form, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { ButtonPrimary } from '../../components/button';
import type { TimeRangePickerProps } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { ResponseTransaction, Transaction } from '../../@types/inputs-type';
import { useState } from 'react';
import type { TableProps } from 'antd';
import type {
	ColumnsType,
	FilterValue,
	SorterResult,
} from 'antd/es/table/interface';
import { currencyFormat } from '../../utils/currencyFormat';
import { useEffect } from 'react';

function Transactions() {
	const [form] = Form.useForm();
	const dateFormat = 'DD/MM/YYYY';
	const { RangePicker } = DatePicker;

	const rangePresets: TimeRangePickerProps['presets'] = [
		{ label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
		{ label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
		{ label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
		{ label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
	];

	const [dateRange, setDateRange] = useState([dayjs().add(-7, 'd'), dayjs()]);

	const {
		mutate: fetchInitialData,
		isLoading: isLoadingInitialData,
		data: initialData,
	} = useMutation(async () => {
		const fromDate = dateRange[0].format(dateFormat);
		const toDate = dateRange[1].format(dateFormat);

		const { data } = await httpClient.post<ResponseTransaction>(
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
		const { data } = await httpClient.post<ResponseTransaction>(
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
		// Fetch initial data when the component mounts
		fetchInitialData();
	}, [fetchInitialData]);

	const handleFormSubmit = (values: { rangePicker: string[] }) => {
		// Trigger API request on form submission
		fetchDataOnFormSubmit(values);
		setDateRange(values.rangePicker.map(date => dayjs(date))); // Update the date range state
	};

	// table

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
			sorter: (a, b) => a.created_at.length - b.created_at.length,
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
							<img
								src={record.sender.image_url}
								className='w-10 h-10 rounded-full'
								alt=''
							/>
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
							<img
								src={record.receiver.image_url}
								className='w-10 h-10 rounded-full'
								alt=''
							/>
							<div>
								<h3 className='font-semibold text-base'>
									{record.receiver.name}{' '}
									{record.sender.pan.split('').slice(-6).join('')}
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
			sorter: (a, b) => a.amount - b.amount,
			sortOrder: sortedInfo.columnKey === 'amount' ? sortedInfo.order : null,
			ellipsis: true,
			width: '15%',
			render: (_, record) => (
				<>
					<p>{currencyFormat(+record.amount)} sum</p>
				</>
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
			<Form
				form={form}
				scrollToFirstError
				name='transactions_form'
				onFinish={handleFormSubmit}
				className='w-1/2 flex gap-x-5 items-end'
			>
				<Form.Item
					label='Select Date'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					name='rangePicker'
					rules={[
						{
							required: true,
							message: 'Please select date!',
						},
					]}
				>
					<RangePicker
						presets={rangePresets}
						format={dateFormat}
						className='w-full p-3'
					/>
				</Form.Item>
				<Form.Item>
					<ButtonPrimary
						isLoading={isLoadingFormSubmit || isLoadingInitialData}
						title='Filter'
					/>
				</Form.Item>
			</Form>
			<Space style={{ marginBottom: 16 }}>
				<Button onClick={setAgeSort}>Sort Type</Button>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button>
			</Space>
			<Table
				columns={columns}
				scroll={{ x: 'max-content' }}
				dataSource={formSubmitData?.transactions || initialData?.transactions}
				onChange={handleChange}
				loading={isLoadingFormSubmit || isLoadingInitialData}
				rowClassName={getRowClassName}
			/>
		</div>
	);
}

export default Transactions;
