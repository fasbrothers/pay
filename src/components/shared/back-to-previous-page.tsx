import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export const BackToPreviousPage = ({ title }: { title: string }) => {
	const navigate = useNavigate();

	return (
		<div className='w-[250px] mb-8 mt-3'>
			<button onClick={() => navigate(-1)} className='flex items-center gap-4'>
				<div className='p-2 border border-gray-300 rounded-xl'>
					<KeyboardArrowLeftIcon />
				</div>
				<p className='text-lg font-bold'>{title}</p>
			</button>
		</div>
	);
};
