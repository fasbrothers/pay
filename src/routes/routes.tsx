import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React from 'react';
import ProfileSettings from '../pages/profile-settings';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';

const Main = React.lazy(() => import('../pages/main'));
const NotFound = React.lazy(() => import('../pages/not-found'));
const MainLayout = React.lazy(() => import('../layouts/main-layout'));
const RootLayout = React.lazy(() => import('../layouts/root-layout'));
const SignInUpLayout = React.lazy(
	() => import('../layouts/sign-in-up-layout')
);


const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/auth',
				element: <SignInUpLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='login' />,
					},
					{
						children: [
							{ path: 'login', element: <SignIn /> },
							{ path: 'register', element: <SignUp /> },
						],
					},
				],
			},
			{
				path: '/',
				element: <MainLayout />,
				children: [
					{ path: '', element: <Main /> },
					{ path: 'profile-settings', element: <ProfileSettings /> },
				],
			},
			{ path: '*', element: <NotFound /> },
		],
	},
];

export function Routes() {
	return useRoutes([...routes]);
}
