import { Link } from 'react-router-dom';
import { LogoMain } from '../logo-main';
import { icons } from './sidebar-icons';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from 'antd';

export const SidebarInMain = ({
	showNavbar,
	title,
	setShowNavbar,
}: {
	showNavbar: boolean;
	title: string;
	setShowNavbar: (showNavbar: boolean) => void;
}) => {
	const highlightedStyle = 'border-blue-600 text-blue-900 border-r-2';
	return (
		<div
			className={`${
				showNavbar ? 'fixed w-2/3 sm:w-2/5 z-30' : 'hidden'
			} md:block md:w-2/6 xl:w-1/6 bg-gray-100 pl-4 lg:pl-8 h-screen md:sticky top-0 `}
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
				<h5 className={` text-gray-500 font-light text-sm`}>Navigation</h5>
				<div>
					<ul>
						{icons.map(item => (
							<Link
								to={item.url}
								key={item.id}
								className={`flex items-center text-gray-500 py-5 cursor-pointer hover:text-blue-900 duration-300 hover:border-r-2 ${
									title === item.title && highlightedStyle
								} hover:border-blue-600`}
							>
								<item.icon />
								<p className={` ml-4 font-medium`}>{item.title}</p>
							</Link>
						))}
					</ul>
				</div>
			</div>
			<div
				className={`h-[8vh] flex items-center text-gray-500 cursor-pointer hover:text-blue-900 duration-300  ${
					title === 'Profile Settings' && highlightedStyle
				}`}
			>
				<SettingsOutlinedIcon />
				<Link to='/cabinet/profile-settings' className={`ml-4 font-medium`}>
					Profile Settings
				</Link>
			</div>
		</div>
	);
};
