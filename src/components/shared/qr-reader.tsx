import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button, Spin } from 'antd';
import toastMessage from '../../utils/toast-message';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { QrReaderProps } from '../../@types/profile.types';

const qrConfig = { fps: 10, qrbox: { width: 380, height: 350 } };
let html5QrCode: any;

function QrReader({ setIsModalOpen, mutate, isLoading }: QrReaderProps) {
	const [started, setStarted] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		html5QrCode = new Html5Qrcode('reader');
	}, []);

	const handleClickAdvanced = () => {
		setStarted(true);
		const qrCodeSuccessCallback = (decodedText: string) => {
			mutate(decodedText);
			handleStop();
		};
		html5QrCode.start(
			{ facingMode: 'environment' },
			qrConfig,
			qrCodeSuccessCallback
		);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		handleStop();
	};

	const handleStop = () => {
		setStarted(false);
		try {
			html5QrCode
				.stop()
				.then(() => {
					html5QrCode.clear();
				})
				.catch((err: any) => {
					toastMessage(err.message);
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='fixed h-screen top-0 bottom-0 left-0 right-0 bg-black text-white z-20'>
			<div className='flex justify-end p-4'>
				<button onClick={() => handleCancel()}>
					<CloseIcon fontSize='large' />
				</button>
			</div>
			<div
				id='reader'
				className='w-[95%] h-[350px] sm:h-auto lg:w-[50%] 2xl:w-[40%] mx-auto mt-10'
			></div>
			<div className='text-center mt-20 lg:mt-32'>
				{!started ? (
					<Button onClick={() => handleClickAdvanced()} className='text-white'>
						{t('profile_settings.qr_button_active')}
					</Button>
				) : (
					<Button onClick={() => handleStop()} className='text-white'>
						{t('profile_settings.qr_button_deactive')}
					</Button>
				)}
				{isLoading && <Spin />}
			</div>
		</div>
	);
}

export default QrReader;
