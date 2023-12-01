import { Form, TreeSelect } from 'antd';
import { QrProps, ResponseMetroStations } from '../../@types/transfer.types';
import { ButtonPrimary } from '../shared/button';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useState } from 'react';
import QrMetroModal from './qr-metro-modal';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';

function QrMetro({ activeIndex, cards }: QrProps) {
	const { data, isLoading } = useDataFetching<ResponseMetroStations>(
		'stations',
		'transport/metro-stations'
	);

	const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
	const [qrLink, setQrLink] = useState<string>('');
	const [form] = Form.useForm();

	const { mutate, isLoading: qrLoading } = useMutation({
		mutationFn: async (values: { station: string }) => {
			const { data } = await httpClient.post('/transport/qr/generate', {
				stationId: values.station,
				cardId: cards[activeIndex].id,
				type: cards[activeIndex].type,
			});
			setQrLink(data.qr);
		},
		onSuccess: () => {
			setIsQrOpen(true);
		},
	});

	return (
		<>
			<Form
				name='payment'
				form={form}
				onFinish={mutate}
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
					<ButtonPrimary title={'Generate QR code'} isLoading={qrLoading} />
				</Form.Item>
			</Form>
			{isQrOpen && (
				<QrMetroModal
					isModalOpen={isQrOpen}
					setIsModalOpen={setIsQrOpen}
					qrLink={qrLink}
				/>
			)}
		</>
	);
}

export default QrMetro;
