import { Link, Outlet } from 'react-router-dom';
import { Skeleton } from '../../components';
import { useDataFetching } from '../../hooks/useDataFetching';
import { CardStructure } from '../../components/card-structure';
import { AddTitle } from '../../components/add-title';

function AllCards() {
	const { isLoading, data: cards } = useDataFetching<ICardAllResponse>(
		'cards',
		'customer/card'
	);

	function sumAllCardsPrice(cards: Card[]) {
		return cards.reduce((acc, card) => {
			return acc + parseInt(card.balance);
		}, 0);
	}

	return (
		<div>
			<div className='flex flex-col sm:flex-row justify-between items-center py-5'>
				<div className='mb-2 sm:mb-0'>
					<h4 className='text-2xl text-center sm:text-left lg:text-4xl font-bold'>
						{cards?.cards &&
							sumAllCardsPrice(cards?.cards as ICardAllResponse['cards'])}
						sum
					</h4>
					<p className='text-sm text-gray-600'>
						Total balance from all accounts
					</p>
				</div>
				<AddTitle title='Add new card' />
			</div>
			<div className='mt-5 flex flex-wrap gap-x-2 gap-y-5 md:gap-3 xl:gap-5 justify-center xl:justify-start mb-10 xl:mb-0'>
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
