import { Outlet } from 'react-router-dom';
import { SidebarInMain } from '../components/sidebar-in-main';
import { HeaderMain } from '../components/header-main';
import { FooterMain } from '../components/footer-main';

export default function MainLayout() {
	return (
		<div className='w-full h-screen flex'>
			<SidebarInMain />
			<div className='w-5/6 px-20'>
				<HeaderMain />
				<div className='h-[84vh]'>
					<Outlet />
				</div>
				<FooterMain />
			</div>
		</div>
	);
}
