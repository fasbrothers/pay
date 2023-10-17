import { ButtonPrimary } from '../button';
import { Form, Input } from 'antd';

import { MaskedInput } from 'antd-mask-input';

interface ICardFormProps {
	setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
	mutate: () => void;
	isLoading: boolean;
}

export const CardForm = ({ setInputs, mutate, isLoading }: ICardFormProps) => {
	const [form] = Form.useForm();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputs(inputs => ({ ...inputs, [name]: value }));
	};

	return (
		<Form
			form={form}
			name='add card'
			onFinish={mutate}
			scrollToFirstError
			className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
		>
			<Form.Item
				name='name'
				label='Name'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: 'Please input your name!',
						whitespace: true,
					},
					{ min: 2, message: 'Name must be minumum 2 letters' },
				]}
			>
				<Input
					className='input__style'
					onChange={handleInputChange}
					name='name'
				/>
			</Form.Item>
			<Form.Item
				name='pan'
				label='Card Number'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: 'Please input your card number!' },
					{
						pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
						message: 'Must be a valid card number',
					},
				]}
			>
				<MaskedInput
					maskOptions={{ lazy: true }}
					mask={'0000 0000 0000 0000'}
					name='pan'
					onChange={handleInputChange}
					className='input__style'
				/>
			</Form.Item>
			<Form.Item
				name='expiry'
				label='Expiry'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: 'Please input your expiry month and year!',
					},
					{
						pattern: /^\d{2}\/\d{2}$/,
						message: 'Must be a valid expiry month and year',
					},
				]}
			>
				<MaskedInput
					maskOptions={{ lazy: true }}
					mask={'00/00'}
					name='expiry'
					onChange={handleInputChange}
					className='input__style'
				/>
			</Form.Item>
			<Form.Item
				name='owner_name'
				label='Owner name'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: 'Please input your name!',
						whitespace: true,
					},
					{ min: 2, message: 'Name must be minumum 2 letters' },
				]}
			>
				<Input
					className='input__style'
					onChange={handleInputChange}
					name='owner_name'
				/>
			</Form.Item>

			<Form.Item>
				<ButtonPrimary isLoading={isLoading} title='Add new card' />
			</Form.Item>
		</Form>
	);
};
