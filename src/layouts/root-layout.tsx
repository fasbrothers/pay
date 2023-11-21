import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { token } from '../store/slices/authSlice';

export default function RootLayout() {
	const tokenNum = useAppSelector(token);
	const { pathname } = useLocation();
	const getParams = useAppSelector(state => state.auth.params);

	if (tokenNum && pathname.includes('auth')) {
		return <Navigate to={getParams.length > 0 ? getParams : '/cabinet/main'} />;
	}
	if (!tokenNum && !pathname.includes('auth')) {
		return <Navigate to={`/auth/login`} />;
	}
	return <Outlet />;
}
