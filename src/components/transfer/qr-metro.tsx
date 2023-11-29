import { Form, Select } from 'antd';
import { QrProps } from '../../@types/transfer.types';
import { ButtonPrimary } from '../shared/button';

function QrMetro({ activeIndex }: QrProps) {
	console.log(activeIndex);

	const [form] = Form.useForm();
	const handleSubmit = (values: {station: string}) => {
		console.log(values);
	};

	return (
		<>
			<Form
				name='payment'
				form={form}
				onFinish={handleSubmit}
				scrollToFirstError
				className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
			>
				<Form.Item
					name='station'
					label={'Select a station'}
					className='station__select mb-10'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Please, select a station!',
						},
					]}
				>
					<Select placeholder='Select a station'>
						<Select.Option value='demo'>Demo</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<ButtonPrimary title={'Generate QR code'} />
				</Form.Item>
			</Form>
		</>
	);
}

export default QrMetro;
