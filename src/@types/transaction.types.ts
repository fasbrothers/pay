import { ColumnsType } from 'antd/es/table';
import {
	TablePaginationConfig,
	FilterValue,
	SorterResult,
	TableCurrentDataSource,
} from 'antd/lib/table/interface';

export interface TransactionResponse {
	length: number;
	transactions: Transaction[];
	total_count: number;
}

export interface Transaction {
	id: string;
	owner_id: string;
	type: string;
	action: string;
	amount: number;
	created_at: string;
	sender: Sender;
	receiver: Receiver;
}

export interface Sender {
	id?: string;
	pan: string;
	name: string;
	image_url?: string;
}

export interface Receiver {
	pan?: string;
	name: string;
	image_url?: string;
	id?: string;
}

export interface DateRangeFormProps {
	isLoading: boolean;
	onSubmit: (values: { rangePicker: string[] }) => void;
}

export interface TransactionTableProps {
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
	totalTransactions: number;
	page: string;
	pageSize: string;
}
