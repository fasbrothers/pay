export const PaymentCategory = ({
	category,
	onClick,
}: {
	category: string;
	onClick: () => void;
}) => {
	return (
		<div
			className='border-b border-gray py-4 px-3 cursor-pointer'
			onClick={onClick}
		>
			<h4 className='text-lg font-semibold'>{category}</h4>
		</div>
	);
};
