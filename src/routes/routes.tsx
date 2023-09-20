import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import React from 'react';

const LazySignIn = React.lazy(() => import('../pages/sign-in'));
const LazySignUp = React.lazy(() => import('../pages/sign-up'));
const LazyMain = React.lazy(() => import('../pages/main'));
const LazyNotFound = React.lazy(() => import('../pages/not-found'));
const LazyMainLayout = React.lazy(() => import('../layouts/main-layout'));
const LazyRootLayout = React.lazy(() => import('../layouts/root-layout'));
const LazySignInUpLayout = React.lazy(
	() => import('../layouts/sign-in-up-layout')
);


const routes: RouteObject[] = [
	{
		path: '/',
		element: <LazyRootLayout />,
		children: [
			{
				path: '/auth',
				element: <LazySignInUpLayout />,
				children: [
					{
						index: true,
						element: <Navigate to='login' />,
					},
					{
						children: [
							{ path: 'login', element: <LazySignIn /> },
							{ path: 'register', element: <LazySignUp /> },
						],
					},
				],
			},
			{
				path: '/',
				element: <LazyMainLayout />,
				children: [
					{ path: '', element: <LazyMain /> },
				],
			},
			{ path: '*', element: <LazyNotFound /> },
		],
	},
];

export function Routes() {
	return useRoutes([...routes]);
}
