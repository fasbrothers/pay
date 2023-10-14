export const PaymentCategory = ({
	category,
	onClick,
	activeCategory,
}: {
	category: string;
	onClick: () => void;
	activeCategory: string;
}) => {
	return (
		<div
			className={`border-b border-gray py-4 px-3 cursor-pointer hover:bg-gray-100 hover:text-gray-600 duration-200 ${
				activeCategory === category && 'bg-gray-100 text-gray-600'
			}`}
			onClick={onClick}
		>
			<h4 className='text-lg font-semibold'>{category}</h4>
		</div>
	);
};
