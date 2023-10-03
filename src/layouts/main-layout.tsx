import { Outlet, useLocation } from 'react-router-dom';
import { SidebarInMain } from '../components/sidebar-in-main';
import { HeaderMain } from '../components/header-main';
import { FooterMain } from '../components/footer-main';
import { Suspense, useState } from 'react';
import { LoadingLazy } from '../components/loading-lazy';

export default function MainLayout() {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const title = useLocation()
		.pathname.split('/')[2]
		?.split('-')
		?.map(el => el[0].toUpperCase() + el.slice(1))
		.join(' ');

	return (
		<div className='w-full flex min-h-screen'>
			<SidebarInMain
				showNavbar={showNavbar}
				setShowNavbar={setShowNavbar}
				title={title}
			/>
			<div
				className={`${
					showNavbar && 'blur-sm'
				} w-full md:w-5/6 px-5 md:px-10 lg:px-20 flex flex-col`}
			>
				<HeaderMain
					setShowNavbar={setShowNavbar}
					showNavbar={showNavbar}
					title={title}
				/>
				<Suspense fallback={<LoadingLazy />}>
					<div className='grow'>
						<Outlet />
					</div>
				</Suspense>
				<FooterMain />
			</div>
		</div>
	);
}
