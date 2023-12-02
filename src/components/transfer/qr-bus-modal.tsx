import { Modal } from 'antd';
import { GenerateQr } from '../generate-qr';
import DoneIcon from '@mui/icons-material/Done';
import { QrBusModalProps } from '../../@types/transfer.types';
import { useNavigate } from 'react-router-dom';

function QrBusModal({ setIsModalOpen, isModalOpen, qrData }: QrBusModalProps) {
	const navigate = useNavigate();

	const handleCancel = () => {
		setIsModalOpen(false);
		navigate('/cabinet/transactions');
	};

	return (
		<Modal
			title={'QR Payment for bus'}
			open={isModalOpen}
			onCancel={handleCancel}
			className='profile__modal'
			width={400}
		>
			<div className='flex justify-center flex-col items-center'>
				<div className='flex items-center gap-x-2 my-2 text-green-500 justify-center'>
					<p className='text-base sm:text-lg'>{qrData.message}</p>
					<DoneIcon fontSize='small' />
				</div>
				<GenerateQr url={qrData.details.qr} size={300} />
				<div className='flex gap-x-3'>
					<h4>Transport fee: </h4>
					<p className='font-medium text-base'>{qrData.details.fee} sum</p>
				</div>
				<div className='flex gap-x-3'>
					<h4>Order Number:</h4>
					<p className='font-medium text-base'>{qrData.details.orderNumber}</p>
				</div>
				<div className='flex gap-x-3'>
					<h4>Bus Number:</h4>
					<p className='font-medium text-base'>
						{qrData.details.bus.routeName}, {qrData.details.bus.regNumber}
					</p>
				</div>
			</div>
		</Modal>
	);
}

export default QrBusModal;
