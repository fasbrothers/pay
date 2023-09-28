import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { deleteToken } from '../../store/slices/authSlice';
import logo from '../../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
	setShowNavbar: (showNavbar: boolean) => void;
	showNavbar: boolean;
}

export const HeaderMain = ({ setShowNavbar, showNavbar }: Props) => {
	const title = useLocation()
		.pathname.split('/')[2]
		?.split('-')
		?.map(el => el[0].toUpperCase() + el.slice(1))
		.join(' ');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(deleteToken());
		navigate('/auth');
	};
	const profile = useAppSelector(state => state.auth.user);

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link to='/cabinet/profile-settings'>Profile</Link>,
		},
		{
			key: '2',
			label: <button onClick={handleLogout}>Logout</button>,
		},
	];

	return (
		<div className='h-[8vh] flex justify-between items-center'>
			<div className='hidden sm:block md:hidden'>
				<Link to='/cabinet' className='flex items-center h-full'>
					<img src={logo} alt='logo' className='w-4/5 h-4/5' />
				</Link>
			</div>
			<h4 className='text-xl font-extrabold'>{!title ? 'Dashboard' : title}</h4>
			<div className='flex items-center'>
				<Dropdown menu={{ items }} placement='bottom'>
					<Button className='flex items-center border-none shadow-none'>
						{profile.image_url ? (
							<div>
								<img
									src={profile.image_url}
									className='rounded-[50%] w-[40px] object-contain'
									alt={profile.name}
								/>
							</div>
						) : (
							<AccountCircleIcon className='text-gray-600' fontSize='large' />
						)}
					</Button>
				</Dropdown>
				<Button
					className='md:hidden h-auto'
					onClick={() => setShowNavbar(!showNavbar)}
				>
					<MenuIcon />
				</Button>
			</div>
		</div>
	);
};
