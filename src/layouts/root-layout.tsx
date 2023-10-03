import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { token } from '../store/slices/authSlice';

export default function RootLayout() {
	const tokenNum = useAppSelector(token);
	const { pathname } = useLocation();

	if (tokenNum && pathname.includes('auth')) {
		return <Navigate to='/cabinet/dashboard' />;
	}
	if (!tokenNum && !pathname.includes('auth')) {
		return <Navigate to='/auth/login' />;
	}
	

	return <Outlet />;
}
