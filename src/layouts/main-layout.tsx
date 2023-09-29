import { Outlet } from 'react-router-dom';
import { SidebarInMain } from '../components/sidebar-in-main';
import { HeaderMain } from '../components/header-main';
import { FooterMain } from '../components/footer-main';
import { Suspense, useState } from 'react';
import { LoadingLazy } from '../components/loading-lazy';

export default function MainLayout() {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	return (
		<div className='w-full h-screen flex'>
			<SidebarInMain showNavbar={showNavbar} />
			<div
				className={`${
					showNavbar && 'blur-sm'
				} w-full md:w-5/6 px-5 md:px-10 lg:px-20`}
			>
				<HeaderMain setShowNavbar={setShowNavbar} showNavbar={showNavbar} />
				<Suspense fallback={<LoadingLazy />}>
					<div className='lg:h-[84vh]'>
						<Outlet />
					</div>
				</Suspense>
				<FooterMain />
			</div>
		</div>
	);
}
