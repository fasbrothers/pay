import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button, Spin } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../api';
import { toastSuccessMessage } from '../../utils/toast-message';
import CloseIcon from '@mui/icons-material/Close';

interface QrReaderProps {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const qrConfig = { fps: 10, qrbox: { width: 380, height: 380 } };
let html5QrCode: any;

function QrReader({ setIsModalOpen }: QrReaderProps) {
	const [started, setStarted] = useState(false);
	const { isLoading, mutate } = useMutation({
		mutationFn: async (value: string) => {
			const newValue = value.split('&');
			const { data } = await httpClient.post('/customer/login/qr', {
				key: newValue[0],
				allowDeviceId: newValue[1],
			});
			return data;
		},
		onSuccess: () => {
			toastSuccessMessage('Successfully logged in');
		},
	});

	useEffect(() => {
		html5QrCode = new Html5Qrcode('reader');
	}, []);

	const handleClickAdvanced = () => {
		setStarted(true);
		const qrCodeSuccessCallback = (decodedText: string) => {
			mutate(decodedText);
			setIsModalOpen(false);
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
					console.log(err.message);
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
				className='w-[95%] lg:w-[50%] 2xl:w-[40%] mx-auto mt-10'
			></div>
			<div className='text-center mt-20 lg:mt-32'>
				{!started ? (
					<Button onClick={() => handleClickAdvanced()} className='text-white'>
						Start Scanning
					</Button>
				) : (
					<Button onClick={() => handleStop()} className='text-white'>
						Stop Scanning
					</Button>
				)}
				{isLoading && <Spin />}
			</div>
		</div>
	);
}

export default QrReader;
