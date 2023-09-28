import { Link } from 'react-router-dom';
import { LogoMain } from '../logo-main';
import { icons } from './sidebar-icons';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const SidebarInMain = ({showNavbar}: {showNavbar: boolean}) => {

	return (
		<div
			className={`${
				showNavbar ? 'w-2/3 sm:w-1/3 fixed z-30' : 'hidden'
			} md:block md:w-2/6 xl:w-1/6 bg-gray-100 pl-4 lg:pl-8 h-screen`}
		>
			<div className='h-[12vh]'>
				<LogoMain />
			</div>
			<div className='h-[80vh]'>
				<h5 className={` text-gray-500 font-light text-sm`}>
					Navigation
				</h5>
				<div>
					<ul>
						{icons.map(item => (
							<Link to={item.url}
								key={item.id}
								className='flex items-center text-gray-500 py-5 cursor-pointer hover:text-black duration-300 hover:border-r-2 hover:border-blue-600'
							>
								<item.icon />
								<p className={` ml-4 font-medium`}>{item.title}</p>
							</Link>
						))}
					</ul>
				</div>
			</div>
			<div className='h-[8vh] flex items-center text-gray-500 cursor-pointer hover:text-black duration-300'>
				<SettingsOutlinedIcon />
				<Link to='/cabinet/profile-settings' className={`ml-4 font-medium`}>
					Profile Settings
				</Link>
			</div>
		</div>
	);
};
