import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { Skeleton } from 'antd';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/inputs-type';
import toastMessage from '../../utils/toast-message';

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

function AllCards() {
	function handleExpiry(card: Card) {
		return card.expiry_month.length === 1
			? '0' + card.expiry_month + card.expiry_year
			: card.expiry_month + card.expiry_year;
	}

	const { isLoading, data: cards } = useQuery({
		queryKey: ['cards'],
		queryFn: async () => {
			const { data } = await api.get<ICardAllResponse>('customer/card');
			return data;
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
	});
	return (
		<div>
			<Link to='add-card'>Add Card</Link>
			<div className='mt-5 flex flex-wrap gap-4'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 5 }} />
				) : (
					cards?.cards.map(card => (
						<Link to={card.id}>
							<Cards
								key={card.id}
								cvc={''}
								expiry={handleExpiry(card)}
								name={card.name}
								number={card.pan}
							/>
						</Link>
					))
				)}
			</div>
		</div>
	);
}

export default AllCards;
