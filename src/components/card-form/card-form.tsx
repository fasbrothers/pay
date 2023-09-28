import { ButtonPrimary } from '../button';
import { Form, Input } from 'antd';

interface ICardFormProps {
	setInputs: any;
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
			className='w-1/3 mx-auto mt-5'
		>
			<Form.Item
				name='pan'
				label='Card Number'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: 'Please input your card number!' },
					{ max: 16, message: 'Number must be 16 numbers.' },
					{
						pattern: new RegExp(/^[0-9]+$/),
						message: 'Phone must be only numbers.',
					},
					{ min: 16, message: 'Number must be 16 numbers.' },
				]}
			>
				<Input name='pan' onChange={handleInputChange} className='w-full p-3' />
			</Form.Item>
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
					className='w-full p-3'
					onChange={handleInputChange}
					name='name'
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
					{ max: 4, message: 'Expiry must be 4 numbers.' },
					{
						pattern: new RegExp(/^[0-9]+$/),
						message: 'Phone must be only numbers.',
					},
					{ min: 4, message: 'Expiry must be 4 numbers.' },
				]}
			>
				<Input
					name='expiry'
					onChange={handleInputChange}
					className='w-full p-3'
				/>
			</Form.Item>
			<Form.Item>
				<ButtonPrimary isLoading={isLoading} title='Add new card' />
			</Form.Item>
		</Form>
	);
};
