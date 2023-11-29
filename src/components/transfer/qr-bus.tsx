import { QrProps } from '../../@types/transfer.types';
import { useState } from 'react';
import QrReader from '../profile/qr-reader';
import { ButtonPrimary } from '../shared/button';

function QrBus({ activeIndex }: QrProps) {
	const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
	const showQr = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsQrOpen(true);
		console.log(activeIndex);
	};

	return (
		<div className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'>
			<form className='w-60 mx-auto mt-10' onSubmit={showQr}>
				<ButtonPrimary title='Scan QR' />
			</form>
			{isQrOpen && <QrReader setIsModalOpen={setIsQrOpen} />}
		</div>
	);
}

export default QrBus;
