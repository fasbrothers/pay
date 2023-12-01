import { Modal } from 'antd';
import { GenerateQr } from '../generate-qr';
import { QrMetroModalProps } from '../../@types/transfer.types';

function QrMetroModal({
	setIsModalOpen,
	isModalOpen,
	qrLink,
}: QrMetroModalProps) {
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Modal
			title={'Qr Payment'}
			open={isModalOpen}
			onCancel={handleCancel}
			className='profile__modal'
			width={300}
		>
			<div className='flex justify-center'>
				<GenerateQr url={qrLink} />
			</div>
		</Modal>
	);
}

export default QrMetroModal;
