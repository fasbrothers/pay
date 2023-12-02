import Logo from '../../assets/logo.jpg';
import './loading-lazy.scss';

export const LoadingLazy = () => {
	return (
		<div className='w-full h-screen flex justify-center text-center loader__img'>
			<img src={Logo} className='h-[45%] w-[45%] self-center' alt='loading' />
		</div>
	);
};
