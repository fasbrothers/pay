import { TransactionHeaderProps } from '../../@types/transaction.types';
import { currencyFormat } from '../../utils/currencyFormat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({
	title,
	image,
	amount,
	name,
	date,
}) => {
	const { t } = useTranslation();

	return (
		<div className='flex justify-center flex-col items-center'>
			{image ? (
				<img
					src={image}
					className='w-16 h-16 object-cover rounded-full'
					alt=''
				/>
			) : (
				<AccountCircleIcon className='text-gray-600' fontSize='large' />
			)}
			<h5 className='mt-4 font-bold text-lg'>
				{currencyFormat(amount)} {t('cards.currency_title')} {title} {name}
			</h5>
			<p className='text-sm'>{t("transactions.details.complete")} {date}</p>
		</div>
	);
};
