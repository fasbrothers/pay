import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export const LogoMain = () => {
	return (
		<Link to='/cabinet' className='flex items-center h-full'>
			<img src={logo} alt='logo' className='w-2/5 h-2/5' />
		</Link>
	);
};
