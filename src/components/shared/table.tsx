import { Table as TableT } from 'antd';
import {
	Transaction,
	TransactionTableProps,
} from '../../@types/transaction.types';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../api';
import ModalTransaction from '../transaction/modal-transaction';

export const Table = ({
	columns,
	data,
	onChange,
	isLoading,
	rowClassName,
	totalTransactions,
	page,
	pageSize,
}: TransactionTableProps) => {
	const [transactionValues, setTransactionValues] = useState({
		id: '',
		action: '',
	});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleRowClick = (record: Transaction) => {
		setTransactionValues({ id: record.id, action: record.action });
		setIsModalOpen(true);
	};

	const { data: rowData, isFetching: rowLoading } = useQuery(
		['tranaction', transactionValues],
		() => {
			return httpClient.get(
				`/transaction/${transactionValues.action}/${transactionValues.id}`
			);
		},

		{ enabled: transactionValues.id !== '' }
	);

	return (
		<>
			<TableT
				columns={columns}
				scroll={{ x: 'max-content' }}
				dataSource={data}
				onChange={onChange}
				loading={isLoading}
				rowClassName={rowClassName}
				rowKey={record => record.id}
				pagination={{
					total: totalTransactions,
					showSizeChanger: true,
					defaultCurrent: +page,
					defaultPageSize: +pageSize,
				}}
				onRow={record => {
					return {
						onClick: () => handleRowClick(record),
					};
				}}
			/>
			{isModalOpen && (
				<ModalTransaction
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					transaction={rowData?.data}
					loading={rowLoading}
				/>
			)}
		</>
	);
};

export default Table;
