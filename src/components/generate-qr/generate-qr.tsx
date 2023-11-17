import { QRCode } from 'antd';

export const GenerateQr = ({ url }: { url: string }) => {
	return (
		<div id='myqrcode' className='mb-5'>
			<QRCode value={url} bgColor='#fff' />
		</div>
	);
};
