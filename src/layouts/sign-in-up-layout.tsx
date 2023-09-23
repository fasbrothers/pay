import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SignSidebar } from '../components/sign-sidebar';
import { Spin } from 'antd';

export default function SignInUpLayout() {
	return (
		<div>
			<div className='flex flex-col-reverse min:h-screen md:flex-row mx-auto'>
				<Suspense fallback={<AuthContentLoader />}>
					<Outlet />
				</Suspense>
				<SignSidebar />
			</div>
		</div>
	);
}
function AuthContentLoader() {
	return (
		<div className='flex justify-center items-center w-4/6'>
			<Spin size='large' />
		</div>
	);
}
