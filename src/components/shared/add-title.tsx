import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddTitle = ({ title }: { title: string }) => {
	return (
		<Link
			to='add-card'
			className='flex items-center font-semibold gap-2 w-[150px]'
		>
			<AddCircleOutlineIcon />
			{title}
		</Link>
	);
};
