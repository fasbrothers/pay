import { Outlet, useLocation } from 'react-router-dom';
import { SidebarInMain } from '../components/main/sidebar-in-main';
import { HeaderMain } from '../components/main/header-main';
import { FooterMain } from '../components/main/footer-main';
import { Suspense, useMemo, useState } from 'react';
import { LoadingLazy } from '../components/shared/loading-lazy';
import { setLanguage } from '../utils/cookies';
import { useDataFetching } from '../hooks/useDataFetching';
import { ProfileResponse } from '../@types/profile.types';

export default function MainLayout() {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const { pathname } = useLocation();

	const title = useMemo(() => {
		if (pathname.split('/')[2].length > 0) {
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

	!isLoading && setLanguage('language', profile?.lang as string);

	return (
		<div className='w-full flex min-h-screen'>
			<SidebarInMain
				showNavbar={showNavbar}
				setShowNavbar={setShowNavbar}
				title={title}
				balance={profile?.balance || ''}
			/>
			<div
				onClick={() => showNavbar && setShowNavbar(!showNavbar)}
				className={`${
					showNavbar && 'blur-sm'
				} w-full md:w-4/6 lg:w-[78%] xl:w-5/6 px-5 md:px-10 lg:px-20 flex flex-col`}
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
