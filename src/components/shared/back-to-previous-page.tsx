import { Link, useLocation } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export const BackToPreviousPage = ({ title }: { title: string }) => {
	const backToLink = useLocation().pathname.split('/').slice(0, 3).join('/');

	return (
		<div className='w-[250px] mb-8 mt-3'>
			<Link to={backToLink} className='flex items-center gap-4'>
				<div className='p-2 border border-gray-300 rounded-xl'>
					<KeyboardArrowLeftIcon />
				</div>
				<p className='text-lg font-bold'>{title}</p>
			</Link>
		</div>
	);
};
