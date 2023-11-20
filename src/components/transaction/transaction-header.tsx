import { TransactionHeaderProps } from '../../@types/transaction.types';
import { currencyFormat } from '../../utils/currencyFormat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({
	title,
	image,
	amount,
	name,
	date,
}) => (
	<div className='flex justify-center flex-col items-center'>
		{image ? (
			<img src={image} className='w-16 h-16 object-cover rounded-full' alt='' />
		) : (
			<AccountCircleIcon className='text-gray-600' fontSize='large' />
		)}
		<h5 className='mt-4 font-bold text-lg'>
			{currencyFormat(amount)} sum {title} {name}
		</h5>
		<p className='text-sm'>Completed {date}</p>
	</div>
);
