import { Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteToken } from '../../store/slices/authSlice';



export const HeaderMain = () => {
  const navigate = useNavigate();
	const dispatch = useAppDispatch();
  
	const handleLogout = () => {
    dispatch(deleteToken());
		navigate('/auth');
	};

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to='/profile'>Profile</Link>,
    },
    {
      key: '2',
      label: <button onClick={handleLogout}>Logout</button>,
    },
  ];
  
	return (
		<div className='h-[8vh] flex justify-between items-center'>
			<h4 className='text-xl font-extrabold'>Dashboard</h4>
			<div className='gap-4 flex items-center'>
				<Input
					size='large'
					className='w-[350px]'
					placeholder='Type to search...'
					prefix={<SearchIcon className='text-gray-600' />}
				/>
				<Dropdown menu={{ items }} placement='bottom'>
					<Button className='flex items-center border-none shadow-none'>
						<AccountCircleIcon className='text-gray-600' fontSize='large' />
					</Button>
				</Dropdown>
			</div>
		</div>
	);
};
