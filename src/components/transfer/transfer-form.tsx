import { Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { ButtonPrimary } from '../shared/button';
import { TransferFormProps } from '../../@types/transfer.types';
import { useTranslation } from 'react-i18next';

const TransferForm: React.FC<TransferFormProps> = ({
	onFinish,
	isLoading,
	panUser,
	handleInputChange,
	isPanLoading,
	isPayCardSelf,
	isAtto,
}) => {
	const { t } = useTranslation();

	return (
		<Form
			name='transfer payment'
			onFinish={onFinish}
			scrollToFirstError
			className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
		>
			{!isPayCardSelf && !isAtto && (
				<Form.Item
					name='toCardPan'
					label={t('transfer.card_number.title')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
							message: t('transfer.card_number.error_length'),
						},
					]}
				>
					<MaskedInput
						maskOptions={{ lazy: true }}
						mask={'0000 0000 0000 0000'}
						onChange={handleInputChange}
						className='input__style'
						disabled={isPanLoading}
					/>
				</Form.Item>
			)}
			{!isPayCardSelf && !isAtto && (
				<h4 className='font-bold -mt-4 text-base'>{panUser?.owner.name}</h4>
			)}
			<Form.Item
				name='amount'
				label={t('transfer.amount.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('transfer.amount.error'),
					},
					{
						pattern: /^[1-9]\d*$/,
						message: t('transfer.amount.error_length'),
					},
				]}
			>
				<MaskedInput
					maskOptions={{ lazy: true }}
					mask={'000000000000'}
					className='input__style'
				/>
			</Form.Item>
			<Form.Item>
				<ButtonPrimary
					disabled={!isAtto && !isPayCardSelf && !panUser?.owner.name}
					isLoading={isLoading}
					title={t('transfer.button')}
				/>
			</Form.Item>
		</Form>
	);
};

export default TransferForm;
