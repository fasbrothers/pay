import {
	QrProps,
	ResponseQrBus,
	ResponseQrBusPayment,
} from '../../@types/transfer.types';
import { useState } from 'react';
import { ButtonPrimary } from '../shared/button';
import QrModal from './qr-modal';
import { httpClient } from '../../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QrBusModal from './qr-bus-modal';

function QrBus({ activeIndex, cards }: QrProps) {
	const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const showQr = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsQrOpen(true);
	};
	const [terminalId, setTerminalId] = useState<string | null>(null);

	const { data: qrInfo } = useQuery({
		queryKey: ['bus-info'],
		queryFn: async () => {
			const { data } = await httpClient.get<ResponseQrBus>(
				`/transport/bus?terminalId=${terminalId}`
			);
			setIsQrOpen(false);
			return data;
		},
		enabled: !!terminalId,
	});

	const {
		isLoading,
		mutate,
		data: payInfo,
	} = useMutation({
		mutationKey: ['bus-pay'],
		mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const { data } = await httpClient.post<ResponseQrBusPayment>(
				`/transport/qr/bus`,
				{
					terminalId: terminalId,
					cardId: cards[activeIndex].id,
				}
			);
			return data;
		},
		onSuccess: () => {
			setIsModalOpen(true);
			queryClient.invalidateQueries(['cards']);
		},
	});

	return (
		<div className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'>
			<form className='w-60 mx-auto mt-10' onSubmit={showQr}>
				<ButtonPrimary title='Scan QR' />
			</form>
			{isQrOpen && (
				<QrModal setIsModalOpen={setIsQrOpen} setTerminalId={setTerminalId} />
			)}
			{qrInfo && (
				<div className='mt-4 flex flex-col items-center'>
					<div className='flex gap-x-3'>
						<h4>Transport fee: </h4>
						<p className='font-medium text-lg'>{qrInfo.fee} sum</p>
					</div>
					<div className='flex gap-x-3'>
						<h4>Bus Number:</h4>
						<p className='font-medium text-lg'>
							{qrInfo.routeName}, {qrInfo.regNumber}
						</p>
					</div>
					<form className='w-60 mx-auto my-5' onSubmit={mutate}>
						<ButtonPrimary isLoading={isLoading} title='Pay' />
					</form>
				</div>
			)}
			{isModalOpen && (
				<QrBusModal
					setIsModalOpen={setIsModalOpen}
					isModalOpen={isModalOpen}
					qrData={payInfo as ResponseQrBusPayment}
				/>
			)}
		</div>
	);
}

export default QrBus;
