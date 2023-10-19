import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getParams, token } from '../store/slices/authSlice';

export default function RootLayout() {
	const tokenNum = useAppSelector(token);
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	if (tokenNum && pathname.includes('auth')) {
		return <Navigate to='/cabinet/main' />;
	}
	if (!tokenNum && !pathname.includes('auth')) {
		dispatch(getParams(pathname));
		return <Navigate to={`/auth/login`} />;
	}

	return <Outlet />;
}
