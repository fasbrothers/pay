import { Navigate, useRoutes } from 'react-router-dom';
import { SignInUpLayout } from '../layouts';
import React from 'react';

const LazySignIn = React.lazy(() => import('../pages/sign-in'));
const LazySignUp = React.lazy(() => import('../pages/sign-up'));
const LazyMain = React.lazy(() => import('../pages/main'));
const LazyNotFound = React.lazy(() => import('../pages/not-found'));

const token = localStorage.getItem('token');

const authRoutes = {
	path: '/',
	children: [
		{
			index: true,
			element: <Navigate to='/auth/login' />,
		},
		{ path: '*', element: <LazyNotFound /> },
		{
			element: <SignInUpLayout />,
			children: [
				{ path: 'auth/login', element: <LazySignIn /> },
				{ path: 'auth/register', element: <LazySignUp /> },
			],
		},
	],
};

const dashboardRoutes = {
	path: '/',
	children: [
		{ path: '/', element: <LazyMain /> },
		{ path: '*', element: <LazyNotFound /> },
	],
};

export function Routes() {
	return useRoutes([token ? dashboardRoutes : authRoutes]);
}
