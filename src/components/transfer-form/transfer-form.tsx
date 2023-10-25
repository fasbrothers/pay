import { Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { ButtonPrimary } from '../button';
import { TransferFormProps } from '../../@types/transfer.types';


const TransferForm: React.FC<TransferFormProps> = ({
	onFinish,
	isLoading,
	panUser,
	handleInputChange,
	isPanLoading,
	isPayCardSelf,
}) => {
	return (
		<Form
			name='transfer payment'
			onFinish={onFinish}
			scrollToFirstError
			className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
		>
			{!isPayCardSelf && (
				<Form.Item
					name='toCardPan'
					label='Receiver Card Number'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
							message: 'Must be a valid card number',
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
			{!isPayCardSelf && (
				<h4 className='font-bold -mt-4 text-base'>{panUser?.owner.name}</h4>
			)}
			<Form.Item
				name='amount'
				label='Amount'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: 'Please input amount!',
					},
					{
						pattern: /^[1-9]\d*$/,
						message: 'Must be a valid amount',
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
					disabled={!isPayCardSelf && !panUser?.owner.name}
					isLoading={isLoading}
					title='Transfer'
				/>
			</Form.Item>
		</Form>
	);
};

export default TransferForm;
