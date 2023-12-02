import { Modal } from 'antd';
import { GenerateQr } from '../generate-qr';
import DoneIcon from '@mui/icons-material/Done';
import { QrBusModalProps } from '../../@types/transfer.types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function QrBusModal({ setIsModalOpen, isModalOpen, qrData }: QrBusModalProps) {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleCancel = () => {
		setIsModalOpen(false);
		navigate('/cabinet/transactions');
	};

	return (
		<Modal
			title={t('atto_qr.bus.title')}
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
					<h4>{t('atto_qr.bus.fee')}</h4>
					<p className='font-medium md:text-base'>
						{qrData.details.fee} {t('cards.currency_title')}
					</p>
				</div>
				<div className='flex gap-x-3'>
					<h4>{t('atto_qr.bus.order_number')}</h4>
					<p className='font-medium md:text-base'>
						{qrData.details.orderNumber}
					</p>
				</div>
				<div className='flex gap-x-3'>
					<h4>{t('atto_qr.bus.number')}</h4>
					<p className='font-medium md:text-base'>
						{qrData.details.bus.routeName}, {qrData.details.bus.regNumber}
					</p>
				</div>
			</div>
		</Modal>
	);
}

export default QrBusModal;
