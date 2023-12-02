import { QRCode } from 'antd';

export const GenerateQr = ({ url, size }: { url: string; size: number }) => {
	return (
		<div id='myqrcode' className='mb-5'>
			<QRCode value={url} bgColor='#fff' size={size} />
		</div>
	);
};
