import { Link, Outlet } from 'react-router-dom';
import { Skeleton } from '../../components';
import { useDataFetching } from '../../hooks/useDataFetching';
import { CardStructure } from '../../components/card-structure';

function AllCards() {
	const { isLoading, data: cards } = useDataFetching<ICardAllResponse>(
		'cards',
		'customer/card'
	);
	return (
		<div>
			<Link to='add-card'>Add Card</Link>
			<div className='mt-5 flex flex-wrap gap-2 md:gap-3 xl:gap-5'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 5 }} />
				) : (
					cards?.cards.map(card => (
						<Link to={card.id} key={card.id}>
							<CardStructure
								name={card.name}
								pan={card.pan}
								expiry_month={card.expiry_month}
								expiry_year={card.expiry_year}
								balance={card.balance}
								id={card.id}
								customer_id={card.customer_id}
							/>
						</Link>
					))
				)}
			</div>
			<Outlet />
		</div>
	);
}

export default AllCards;

export interface ICardAllResponse {
	count: number;
	cards: Card[];
}

export interface Card {
	id: string;
	customer_id: string;
	name: string;
	pan: string;
	expiry_month: string;
	expiry_year: string;
	balance: string;
}
