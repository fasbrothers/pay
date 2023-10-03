import { Link, useLocation } from 'react-router-dom';
import { ButtonPrimary } from '../../components/button';
import { useState } from 'react';
import { DeleteCard } from '../../components/delete-card-modal';
import { CardStructure } from '../../components/card-structure';

function SingleCard() {
	const id = useLocation().pathname.split('/')[3].toString();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={`	${isModalOpen && 'blur-sm'}`}>
			<CardStructure
				name={'Snowden'}
				pan={'4444 5678 9101 1121'}
				expiry_month={'12'}
				expiry_year={'26'}
				balance={'100'}
				id={id}
				customer_id={'1'}
			/>
			<div className='flex items-center gap-3 justify-center mt-5'>
				<Link to='edit' className='border border-dashed px-4 py-3'>
					Edit Card
				</Link>
				<form className='w-2/10' onSubmit={showModal}>
					<ButtonPrimary title={'Delete card'} />
				</form>
			</div>
			<DeleteCard
				id={id}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				handleCancel={handleCancel}
			/>
		</div>
	);
}

export default SingleCard;
