import { Form, TreeSelect } from 'antd';
import { QrProps, ResponseMetroStations } from '../../@types/transfer.types';
import { ButtonPrimary } from '../shared/button';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useState } from 'react';
import QrMetroModal from './qr-metro-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { useTranslation } from 'react-i18next';

function QrMetro({ activeIndex, cards }: QrProps) {
	const { data, isLoading } = useDataFetching<ResponseMetroStations>(
		'stations',
		'transport/metro-stations'
	);

	const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
	const [qrData, setQrData] = useState({
		qr: '',
		expireIn: 0,
		message: '',
	});
	const [form] = Form.useForm();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const { mutate, isLoading: qrLoading } = useMutation({
		mutationFn: async (values: { station: string }) => {
			const { data } = await httpClient.post('/transport/qr/metro', {
				stationId: values.station,
				cardId: cards[activeIndex].id,
			});
			setQrData({
				qr: data.qr,
				expireIn: data.expiresIn,
				message: data.message,
			});
		},
		onSuccess: () => {
			setIsQrOpen(true);
			queryClient.invalidateQueries(['cards']);
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
					label={t('atto_qr.metro.station.title')}
					className='station__select mb-10'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: t('atto_qr.metro.station.error'),
						},
					]}
				>
					<TreeSelect
						loading={isLoading}
						treeData={
							data?.lines.map(station => ({
								title: station.name,
								value: station.name,
								selectable: false,
								style: {
									fontWeight: 'medium',
									color: '#000',
								},
								children: station.stations.map(line => ({
									title: line.name,
									value: line.id,
									key: line.id,
									checkable: true,
									style: {
										color: 'blue',
									},
								})),
							})) || []
						}
						placeholder={t('atto_qr.metro.station.title')}
					/>
				</Form.Item>
				<Form.Item>
					<ButtonPrimary
						title={t('atto_qr.metro.button')}
						isLoading={qrLoading}
					/>
				</Form.Item>
			</Form>
			{isQrOpen && (
				<QrMetroModal
					isModalOpen={isQrOpen}
					setIsModalOpen={setIsQrOpen}
					qrData={qrData}
				/>
			)}
		</>
	);
}

export default QrMetro;
