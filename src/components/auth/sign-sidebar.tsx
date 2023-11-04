import { useLocation } from 'react-router-dom';
import hero from '../../assets/hero.png';
import logo from '../../assets/logo.svg';
import { useTranslation } from 'react-i18next';

export const SignSidebar = () => {
	const login = useLocation().pathname.includes('login');
	const { t } = useTranslation();

	return (
		<div
			className={`w-full md:w-1/2 ${
				login ? 'h-auto' : 'h-40'
			} md:h-screen bg__color`}
		>
			<div
				className={`flex justify-center ${login ? 'mt-10' : 'mt-20'} md:hidden`}
			>
				<img src={logo} alt='logo' className='w-1/4 h-1/4' />
			</div>
			<div className='flex-col items-center justify-center h-full flex'>
				<div className='w-full hidden md:flex justify-center'>
					<img
						src={hero}
						alt='hero'
						className='w-5/6 lg:w-4/6 h-full object-contain'
					/>
				</div>
				<div
					className={`text-center ${
						login ? 'block' : 'hidden md:block'
					} text-white w-5/6 lg:w-1/2 mx-auto my-10 md:mb-0`}
				>
					<h4 className='font-bold md:text-lg lg:text-xl'>
						{t('auth.sign_sidebar.description')}
					</h4>
					<h5 className='mt-5 font-extrabold text-lg'>
						{t('auth.sign_sidebar.name')}{' '}
						<span className='text-sm opacity-70'>
							({t('auth.sign_sidebar.job')})
						</span>
					</h5>
				</div>
			</div>
		</div>
	);
};
