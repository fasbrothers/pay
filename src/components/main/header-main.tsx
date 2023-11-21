import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import logo from '../../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import { HeaderMainProps, Navigation } from '../../@types/layout.types';

export const HeaderMain = ({
	setShowNavbar,
	showNavbar,
	title,
	isLoading,
	profile,
}: HeaderMainProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const handleLogout = () => {
		dispatch({ type: 'logout' });
		queryClient.removeQueries();
		navigate('/auth');
	};

	const nav: Navigation[] = t('navigation', {
		returnObjects: true,
	}) as Navigation[];

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link to='/cabinet/profile-settings'>{t('main.profile')}</Link>,
		},
		{
			key: '2',
			label: <button onClick={() => handleLogout()}>{t('main.logout')}</button>,
		},
	];

	return (
		<div className='h-[8vh] flex justify-between items-center'>
			<div className='hidden sm:block md:hidden'>
				<Link to='/cabinet' className='flex items-center h-full'>
					<img src={logo} alt='logo' className='w-4/5 h-4/5' />
				</Link>
			</div>
			<h4 className='text-xl font-extrabold'>
				{nav
					.filter(el => (el.name === title ? el.title : ''))
					.map(el => (
						<Fragment key={el.name}>{el.title}</Fragment>
					))}
			</h4>
			<div className='flex items-center'>
				<Dropdown menu={{ items }} placement='bottom'>
					<Button className='flex items-center border-none shadow-none'>
						{isLoading ? (
							<Skeleton.Avatar active size={'default'} shape='circle' />
						) : profile?.image_url ? (
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
