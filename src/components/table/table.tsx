import { Table as TableT } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Transaction } from '../../@types/inputs-type';
import {
	TablePaginationConfig,
	FilterValue,
	SorterResult,
	TableCurrentDataSource,
} from 'antd/lib/table/interface';

interface TransactionTableProps {
	columns: ColumnsType<Transaction>;
	data: Transaction[];
	onChange: (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<Transaction> | SorterResult<Transaction>[],
		extra: TableCurrentDataSource<Transaction>
	) => void;
	isLoading: boolean;
	rowClassName: (record: Transaction) => string;
}

export const Table = ({
	columns,
	data,
	onChange,
	isLoading,
	rowClassName,
}: TransactionTableProps) => {
	return (
		<TableT
			columns={columns}
			scroll={{ x: 'max-content' }}
			dataSource={data}
			onChange={onChange}
			loading={isLoading}
			rowClassName={rowClassName}
		/>
	);
};

export default Table;
