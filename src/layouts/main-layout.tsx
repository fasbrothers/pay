import { Outlet, useLocation } from 'react-router-dom';
import { SidebarInMain } from '../components/sidebar-in-main';
import { HeaderMain } from '../components/header-main';
import { FooterMain } from '../components/footer-main';
import { Suspense, useState } from 'react';
import { LoadingLazy } from '../components/loading-lazy';
import { IProfileResponse } from '../pages/profile-settings/profile-settings';
import { setUIDorLanguage } from '../utils/cookies';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../api';
import { useAppDispatch } from '../hooks/redux-hooks';
import { getLanguage } from '../store/slices/authSlice';

export default function MainLayout() {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const title = useLocation()
		.pathname.split('/')[2]
		?.split('-')
		?.map(el => el[0].toUpperCase() + el.slice(1))
		.join(' ');

	const dispatch = useAppDispatch();

	const { data: profile, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const { data } = await httpClient.get<IProfileResponse>('/customer/profile');
			dispatch(getLanguage(data.lang));
			return data;
		},
	});

	!isLoading && setUIDorLanguage('language', profile?.lang as string);

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
					isLoading={isLoading}
					profile={profile as IProfileResponse}
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
