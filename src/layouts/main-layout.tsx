import { Outlet, useLocation } from 'react-router-dom';
import { SidebarInMain } from '../components/sidebar-in-main';
import { HeaderMain } from '../components/header-main';
import { FooterMain } from '../components/footer-main';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { LoadingLazy } from '../components/loading-lazy';
import { setLang } from '../utils/cookies';
import { useDataFetching } from '../hooks/useDataFetching';
import { ProfileResponse } from '../@types/profile.types';

export default function MainLayout() {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const { pathname } = useLocation();

	const title = useMemo(() => {
		if (pathname.split('/')[1] === 'cabinet') {
			return pathname
				.split('/')[2]
				?.split('-')
				?.map(el => el[0].toUpperCase() + el.slice(1))
				.join(' ')
				.toLowerCase();
		} else {
			return '';
		}
	}, [pathname]);

	const {
		data: profile,
		isLoading,
		isError,
	} = useDataFetching<ProfileResponse>('profile', '/customer/profile');

	useEffect(() => {
		!isLoading && setLang(profile?.lang as string);
	}, [isLoading, profile?.lang]);

	return (
		<div className='w-full flex min-h-screen'>
			<SidebarInMain
				showNavbar={showNavbar}
				setShowNavbar={setShowNavbar}
				title={title}
				balance={profile?.balance || ''}
			/>
			<div
				className={`${
					showNavbar && 'blur-sm'
				} w-full md:w-4/6 lg:w-3/4 xl:w-5/6 px-3 md:px-10 lg:px-20 flex flex-col`}
			>
				<HeaderMain
					setShowNavbar={setShowNavbar}
					showNavbar={showNavbar}
					title={title}
					isLoading={isLoading}
					profile={profile as ProfileResponse}
				/>
				<Suspense fallback={<LoadingLazy />}>
					<div className='grow'>
						<Outlet />
					</div>
				</Suspense>
				{!isLoading && !isError && (
					<FooterMain language={profile.lang as string} />
				)}
			</div>
		</div>
	);
}
