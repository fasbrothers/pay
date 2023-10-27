import { Table as TableT } from 'antd';
import { TransactionTableProps } from '../../@types/transaction.types';

export const Table = ({
	columns,
	data,
	onChange,
	isLoading,
	rowClassName,
	totalPassengers,
}: TransactionTableProps) => {
	return (
		<TableT
			columns={columns}
			scroll={{ x: 'max-content' }}
			dataSource={data}
			onChange={onChange}
			loading={isLoading}
			rowClassName={rowClassName}
			rowKey={record => record.id}
			pagination={{
				total: totalPassengers,
			}}
		/>
	);
};

export default Table;
