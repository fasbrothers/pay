import { TransactionDetailsProps } from '../../@types/transaction.types';

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({
	label,
	value,
}) => (
	<div className='flex justify-between'>
		<p>{label}</p>
		<p className='font-semibold'>{value}</p>
	</div>
);
