import { Modal, Spin } from 'antd';
import { ModalTransactionProps } from '../../@types/transaction.types';
import { currencyFormat } from '../../utils/currencyFormat';
import dayjs from 'dayjs';
import { TransactionHeader } from './transaction-header';
import { TransactionDetails } from './transaction-details';
import { useTranslation } from 'react-i18next';

function ModalTransaction({
	isModalOpen,
	setIsModalOpen,
	transaction,
	loading,
}: ModalTransactionProps) {
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const { t } = useTranslation();

	let isIncome;

	if (!loading) {
		isIncome = transaction.type === 'income';
	}

	return (
		<Modal
			title={t('transactions.details.title')}
			open={isModalOpen}
			onCancel={handleCancel}
			className='profile__modal'
		>
			<div>
				{loading ? (
					<div className='py-5 flex justify-center'>
						<Spin />
					</div>
				) : (
					<>
						<TransactionHeader
							title={
								isIncome
									? t('transactions.details.from')
									: t('transactions.details.to')
							}
							image={
								isIncome
									? transaction.sender?.image_url
									: transaction.receiver?.image_url
							}
							amount={+transaction.amount}
							name={
								isIncome ? transaction.sender?.name : transaction.receiver?.name
							}
							date={dayjs(transaction.created_at).format('dddd, MMMM D, YYYY')}
						/>
						<div className='mt-5 space-y-2'>
							<TransactionDetails
								label={t('transactions.details.transfer')}
								value={`#${transaction.id.slice(0, 23)}`}
							/>
							<TransactionDetails
								label={
									isIncome
										? t('transactions.details.receive')
										: t('transactions.details.send')
								}
								value={
									isIncome
										? transaction.sender?.name
										: transaction.receiver?.name
								}
							/>
							{isIncome ? (
								<TransactionDetails
									label={t('transactions.details.card')}
									value={transaction.sender.pan.split('').slice(-8).join('')}
								/>
							) : transaction.receiver.pan ? (
								<TransactionDetails
									label={t('transactions.details.card')}
									value={transaction?.receiver?.pan
										?.split('')
										.slice(-8)
										.join('')}
								/>
							) : null}
							<TransactionDetails
								label={t('transactions.details.amount')}
								value={currencyFormat(+transaction.amount)}
							/>
						</div>
						<div className='mt-2 space-y-2'>
							{transaction.fields?.map(field => (
								<TransactionDetails
									key={field.id}
									label={field.name}
									value={field.value}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}

export default ModalTransaction;
