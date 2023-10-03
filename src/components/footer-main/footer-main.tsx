import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import { footerList } from './footer-list';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
	{
		key: '1',
		label: <Link to='/'>Russian</Link>,
	},
	{
		key: '2',
		label: <Link to='/'>Uzbek</Link>,
	},
];

export const FooterMain = () => {
	return (
		<div className='lg:h-[8vh] border-t border-gray-200 flex flex-col md:flex-row justify-between items-center mt-2 xl:mt-0 py-4 lg:py-0'>
			<div>
				{footerList.map((item, index) => (
					<p key={index} className='inline-block mr-6 font-bold text-sm'>
						{item}
					</p>
				))}
			</div>
			<div className='flex gap-3 text-gray-600 mt-4 md:mt-0'>
				<div className='flex items-center'>
					<Dropdown menu={{ items }} placement='top'>
						<Button className='flex items-center border-none shadow-none text-gray-600 hover:text-gray-600'>
							English
						</Button>
					</Dropdown>
				</div>
				<div className='border-2 border-gray-200 p-2.5 rounded-lg hover:bg-gray-400 hover:border-gray-400 hover:text-white duration-300'>
					<Brightness2OutlinedIcon fontSize='small' />
				</div>
			</div>
		</div>
	);
};
