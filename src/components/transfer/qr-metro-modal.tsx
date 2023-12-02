import { Modal } from 'antd';
import { GenerateQr } from '../generate-qr';
import { QrMetroModalProps } from '../../@types/transfer.types';
import useTimer, { TimerState } from '../../hooks/useTimer';
import { convertSecondsToMinutes } from '../../utils/convertSecondsToMinutes';
import { useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';

function QrMetroModal({
	setIsModalOpen,
	isModalOpen,
	qrData,
}: QrMetroModalProps) {
	const navigate = useNavigate();

	const handleCancel = () => {
		setIsModalOpen(false);
		navigate('/cabinet/transactions');
	};

	const { minutes, seconds, setMinutes, setSeconds }: TimerState = useTimer({
		initialSeconds: qrData.expireIn || 0,
	});

	useEffect(() => {
		const { minutes, remainingSeconds } = convertSecondsToMinutes(
			qrData.expireIn || 0
		);
		setMinutes(minutes);
		setSeconds(remainingSeconds);
	}, [qrData.expireIn, setMinutes, setSeconds]);

	useEffect(() => {
		if (minutes === 0 && seconds === 0) {
			setIsModalOpen(false);
		}
	}, [minutes, seconds, setIsModalOpen]);

	return (
		<Modal
			title={'QR Payment for metro'}
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
				<GenerateQr url={qrData.qr} size={300} />
				<p>Code expiration time: </p>
				<span className='font-bold text-xl'>
					{minutes < 10 ? `0${minutes}` : minutes}:
					{seconds < 10 ? `0${seconds}` : seconds}
				</span>
			</div>
		</Modal>
	);
}

export default QrMetroModal;
