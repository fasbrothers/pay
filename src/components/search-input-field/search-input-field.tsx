import { Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInputField = ({
	value,
	onChange,
	setWidth,
}: {
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	setWidth?: string;
}) => {
	return (
		<Input
			size='large'
			className={`p-3 ${setWidth}`}
			value={value}
			onChange={onChange}
			placeholder='Search for payment providers'
			prefix={<SearchIcon className='text-gray-400' />}
		/>
	);
};
