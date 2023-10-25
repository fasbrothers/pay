import {
	Navigate,
	RouteObject,
	redirect,
	createBrowserRouter,
	LoaderFunctionArgs,
} from 'react-router-dom';
import React from 'react';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import { SingleService } from '../components/single-service';
import { getFromCookie } from '../utils/cookies';
import { store } from '../store/store';
import { deleteParams, getParams } from '../store/slices/authSlice';

const Main = React.lazy(() => import('../pages/main'));
const NotFound = React.lazy(() => import('../pages/not-found'));
const MainLayout = React.lazy(() => import('../layouts/main-layout'));
const RootLayout = React.lazy(() => import('../layouts/root-layout'));
const SignInUpLayout = React.lazy(() => import('../layouts/sign-in-up-layout'));
const Cards = React.lazy(() => import('../pages/cards'));
const AddCard = React.lazy(() => import('../pages/add-card'));
const ProfileSettings = React.lazy(() => import('../pages/profile-settings'));
const SingleCard = React.lazy(() => import('../pages/single-card'));
const Transactions = React.lazy(() => import('../pages/transactions'));
const Transfer = React.lazy(() => import('../pages/transfer'));
const Payments = React.lazy(() => import('../pages/payments'));
const QR = React.lazy(() => import('../pages/qr'));

const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Navigate to='cabinet' />,
			},
			{
				path: '/auth',
				element: <SignInUpLayout />,
				loader: () => {
					if (getFromCookie('token')) {
						return redirect('/cabinet/main');
					}
					return null;
				},
				children: [
					{
						index: true,
						element: <Navigate to='login' />,
					},
					{
						children: [
							{ path: 'login', element: <SignIn /> },
							{ path: 'register', element: <SignUp /> },
							{ path: '*', element: <SignIn /> },
						],
					},
				],
			},
			{
				path: '/cabinet',
				element: <MainLayout />,
				loader: ({ request }: LoaderFunctionArgs) => {
					if (!getFromCookie('token')) {
						store.dispatch(
							getParams(request.url.replace(/^https?:\/\/[^/]+/, ''))
						);
						return redirect('/auth/login');
					} else {
						store.dispatch(deleteParams());
					}

					return null;
				},
				errorElement: <Navigate to='/auth/login' />,
				children: [
					{
						index: true,
						element: <Navigate to='main' />,
					},
					{
						children: [
							{ path: 'main', element: <Main /> },
							{ path: 'profile-settings', element: <ProfileSettings /> },
							{ path: 'transfer', element: <Transfer /> },
							{ path: 'transactions', element: <Transactions /> },
							{ path: 'qr/:key', element: <QR /> },
							{
								path: 'payments',
								children: [
									{ index: true, element: <Navigate to='list' /> },
									{
										path: 'list',
										element: <Payments />,
									},
									{
										path: 'item/:service_id',
										element: <SingleService />,
									},
								],
							},
							{
								path: 'cards',
								children: [
									{ index: true, element: <Cards /> },
									{ path: ':id', element: <SingleCard /> },
									{ path: 'add-card', element: <AddCard /> },
								],
							},
						],
					},
				],
			},
			{ path: '*', element: <NotFound /> },
		],
	},
];

export default createBrowserRouter(routes);
