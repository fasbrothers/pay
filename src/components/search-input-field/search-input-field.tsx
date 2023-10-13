import { Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInputField = ({
	value,
	onChange,
}: {
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
	return (
		<Input
			size='large'
			className='p-3'
			value={value}
			onChange={onChange}
			placeholder='Search for payment providers'
			prefix={<SearchIcon className='text-gray-400' />}
		/>
	);
};
