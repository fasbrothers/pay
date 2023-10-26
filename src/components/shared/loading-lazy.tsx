import Logo from '../../assets/logo.svg'
import './loading-lazy.scss'

export const LoadingLazy = () => {
  return (
		<div className='w-full h-screen flex justify-center text-center loader__img'>
			<img
				src={Logo}
				className='h-[50%] w-[30%] self-center'
				alt='loading'
			/>
		</div>
	);
}
