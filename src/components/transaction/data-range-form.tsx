import { Form, DatePicker } from 'antd';
import { dayjs, dateFormat } from '../../utils/date';
import type { TimeRangePickerProps } from 'antd';
import { ButtonPrimary } from '../shared/button';
import { DateRangeFormProps } from '../../@types/transaction.types';

const rangePresets: TimeRangePickerProps['presets'] = [
	{ label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
	{ label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
	{ label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
	{ label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

export const DateRangeForm = ({ onSubmit, isLoading }: DateRangeFormProps) => {
	const [form] = Form.useForm();
	const { RangePicker } = DatePicker;

	return (
		<Form
			form={form}
			scrollToFirstError
			name='transactions_form'
			onFinish={onSubmit}
			className='w-full md:w-2/3 xl:w-1/2 flex gap-x-5 items-end'
		>
			<Form.Item
				label='Select Date'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				name='rangePicker'
				rules={[
					{
						required: true,
						message: 'Please select date!',
					},
					{
						validator: async (_, value) => {
							if (value[0] > dayjs() || value[1] > dayjs()) {
								return Promise.reject(
									new Error('Date cannot be in the future!')
								);
							}
						},
					},
				]}
			>
				<RangePicker
					presets={rangePresets}
					format={dateFormat}
					className='w-full p-3'
				/>
			</Form.Item>
			<Form.Item>
				<ButtonPrimary isLoading={isLoading} title='Filter' />
			</Form.Item>
		</Form>
	);
};

export default DateRangeForm;
