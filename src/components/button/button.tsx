import { Button } from 'antd';

interface ButtonPrimaryProps {
  title: string;
	isLoading?: boolean;
}

export const ButtonPrimary = ({title, isLoading}: ButtonPrimaryProps) => {
	return (
		<Button
			className='bg-blue-700 text-white w-full h-full text-lg py-3 text-center rounded-md hover:bg-white'
			htmlType='submit'
			loading={isLoading}
      style={{fontFamily: 'Inter, sans-serif'}}
		>
			{title}
		</Button>
	);
};
