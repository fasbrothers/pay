import { Link } from 'react-router-dom';
import { LogoMain } from './logo-main';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from 'antd';
import { currencyFormat } from '../../utils/currencyFormat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { Navigation, SidebarInMainProps } from '../../@types/layout.types';

export const SidebarInMain = ({
	showNavbar,
	title,
	setShowNavbar,
	balance,
}: SidebarInMainProps) => {
	const [showBalance, setShowBalance] = useState<boolean>(true);
	const highlightedStyle = 'border-blue-600 text-blue-900 border-r-2';
	const { t } = useTranslation();

	const nav: Navigation[] = t('navigation', {
		returnObjects: true,
	}) as Navigation[];

	return (
		<div
			className={`${
				showNavbar ? 'fixed w-2/3 sm:w-2/5 z-30' : 'hidden'
			} md:block md:w-2/6 lg:w-[22%] xl:w-1/6 bg-gray-100 pl-4 lg:pl-8 h-screen md:sticky top-0 `}
		>
			<div className='h-[12vh]'>
				<LogoMain />
			</div>
			{showNavbar && (
				<Button
					className='border-none shadow-none absolute top-6 right-0'
					onClick={() => setShowNavbar(!showNavbar)}
				>
					<ClearIcon />
				</Button>
			)}
			<div className='h-[80vh]'>
				<h5 className={`text-gray-500 font-light text-sm`}>
					{t('navigation_name.0')}
				</h5>
				<div>
					<ul>
						{nav.slice(0, -1).map((item: Navigation) => (
							<Link
								to={item.url}
								key={item.id}
								onClick={() => setShowNavbar(false)}
								className={`flex items-center  py-5 cursor-pointer hover:text-blue-900 duration-300 hover:border-r-2 ${
									title === item.name ? highlightedStyle : 'text-gray-500'
								} hover:border-blue-600`}
							>
								{item.icon === 'pie' && <PieChartOutlineRoundedIcon />}
								{item.icon === 'credit' && <CreditCardIcon />}
								{item.icon === 'exchange' && <MultipleStopIcon />}
								{item.icon === 'payments' && <PaymentsOutlinedIcon />}
								{item.icon === 'bar' && <BarChartOutlinedIcon />}
								<p className={` ml-4 font-medium`}>{item.title}</p>
							</Link>
						))}
					</ul>
				</div>
				<h5 className={`text-gray-500 font-light text-sm`}>
					{t('navigation_name.1')}
				</h5>
				<div className='mt-3 flex gap-x-3 text-gray-500 items-center'>
					<div
						onClick={() => setShowBalance(!showBalance)}
						className='cursor-pointer'
					>
						{showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
					</div>
					<h4>
						{showBalance ? (
							currencyFormat(+balance) + 'sum'
						) : (
							<span className='mr-2'>* * * * * *</span>
						)}
					</h4>
				</div>
			</div>
			{nav.slice(-1).map((item: Navigation) => (
				<div
					key={item.id}
					className={`cursor-pointer hover:text-blue-900 duration-300 ${
						title === item.name ? highlightedStyle : 'text-gray-500 '
					}`}
				>
					<Link
						to={item.url}
						className='flex items-center h-[8vh]'
						onClick={() => setShowNavbar(false)}
					>
						{item.icon === 'settings' && <SettingsOutlinedIcon />}
						<p className='font-medium ml-4'>{item.title}</p>
					</Link>
				</div>
			))}
		</div>
	);
};
