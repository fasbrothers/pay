import { useLocation, useNavigate } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { useEffect } from 'react';
import { Spin } from 'antd';

function Qr() {
	const key = useLocation().pathname.split('/')[3];
	const navigate = useNavigate();

	const { isLoading, data } = useDataFetching<{ id: string }>(
		'qr',
		`service/qr/${key}`,
		key,
		'/cabinet/payments/list'
	);

	useEffect(() => {
		if (data) {
			navigate(`/cabinet/payments/item/${data.id}`);
		}
	}, [data, navigate]);
	return (
		<div className='flex justify-center items-center h-[50vh]'>
			{isLoading && <Spin size='large' />}
		</div>
	);
}

export default Qr;
