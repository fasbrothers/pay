import { Form, TreeSelect } from 'antd';
import { QrProps, ResponseMetroStations } from '../../@types/transfer.types';
import { ButtonPrimary } from '../shared/button';
import { useDataFetching } from '../../hooks/useDataFetching';

function QrMetro({ activeIndex }: QrProps) {
	console.log(activeIndex);

	const { data, isLoading } = useDataFetching<ResponseMetroStations>(
		'stations',
		'transport/metro-stations'
	);
	console.log(data);

	const [form] = Form.useForm();
	const handleSubmit = (values: { station: string }) => {
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
					<TreeSelect
						loading={isLoading}
						treeData={
							data?.lines.map(station => ({
								title: station.name,
								value: station.name,
								children: station.stations.map(line => ({
									title: line.name,
									value: line.id,
									key: line.id,
								})),
							})) || []
						}
						placeholder='Please select station'
					/>
				</Form.Item>
				<Form.Item>
					<ButtonPrimary title={'Generate QR code'} />
				</Form.Item>
			</Form>
		</>
	);
}

export default QrMetro;
