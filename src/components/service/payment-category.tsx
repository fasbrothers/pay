export const PaymentCategory = ({
	category,
	onClick,
	activeCategory,
}: {
	category: string;
	onClick: () => void;
	activeCategory: boolean;
}) => {
	return (
		<div
			className={`border-b border-gray py-4 px-3 cursor-pointer hover:bg-gray-100 hover:text-gray-600 duration-200 ${
				activeCategory ? 'bg-gray-100 text-gray-600' : ''
			}`}
			onClick={onClick}
		>
			<h4 className='text-lg font-semibold'>{category}</h4>
		</div>
	);
};
