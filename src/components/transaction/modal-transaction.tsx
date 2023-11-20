import { Modal, Spin } from 'antd';
import { ModalTransactionProps } from '../../@types/transaction.types';
import { currencyFormat } from '../../utils/currencyFormat';
import dayjs from 'dayjs';
import { TransactionHeader } from './transaction-header';
import { TransactionDetails } from './transaction-details';



function ModalTransaction({
	isModalOpen,
	setIsModalOpen,
	transaction,
	loading,
}: ModalTransactionProps) {
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	let isIncome;

	if (!loading) {
		isIncome = transaction.type === 'income';
	}

	return (
		<Modal
			title={'Transaction Details'}
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
							title={isIncome ? 'from' : 'to'}
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
								label='Transfer'
								value={`#${transaction.id.slice(0, 23)}`}
							/>
							<TransactionDetails
								label={isIncome ? 'Received from' : 'Send To'}
								value={
									isIncome
										? transaction.sender?.name
										: transaction.receiver?.name
								}
							/>
							{isIncome ? (
								<TransactionDetails
									label='Card'
									value={transaction.sender.pan.split('').slice(-8).join('')}
								/>
							) : transaction.receiver.pan ? (
								<TransactionDetails
									label='Card'
									value={transaction?.receiver?.pan
										?.split('')
										.slice(-8)
										.join('')}
								/>
							) : null}
							<TransactionDetails
								label='Amount'
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
