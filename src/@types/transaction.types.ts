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
	fields: Field[];
}

export interface Field {
	id: string;
	name: string;
	type: string;
	value: string;
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

export interface ModalTransactionProps {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	transaction: Transaction;
	loading: boolean;
}

export interface TransactionDetailsProps {
	label: string;
	value: string | number;
}

export interface TransactionHeaderProps {
	title: string;
	image: string | undefined;
	amount: number;
	name: string;
	date: string;
}
