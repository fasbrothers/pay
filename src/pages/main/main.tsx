import { Skeleton } from 'antd';
import { CardStructure } from '../../components/card/card-structure';
import { useDataFetching } from '../../hooks/useDataFetching';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { AllCardsResponse, Cards, Card } from '../../@types/card.types';
import { ButtonPrimary } from '../../components/shared/button';

function Main() {
	const { isLoading, data: cards } = useDataFetching<AllCardsResponse>(
		'cards',
		'customer/card'
	);

	const mainCard = (cards: Cards['uzcard']) => {
		let cardMain: Card | undefined;

		if (cards.length === 0) return null;

		if (cards[0].type === 'uzcard') {
			cardMain = cards.find(uzcard => uzcard.main === true);
		} else {
			cardMain = cards.find(atto => atto.main === true);
		}

		const card = cardMain ? cardMain : cards[0];

		return (
			<CardStructure
				key={card.id}
				name={card.name}
				pan={card.pan}
				expiry_month={card.expiry_month}
				expiry_year={card.expiry_year}
				balance={card.balance}
				id={card.id}
				customer_id={card.customer_id}
				owner_name={card.owner_name}
				type={card.type}
			/>
		);
	};

	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div>
			<div className='mt-5 flex flex-wrap gap-x-2 gap-y-5 md:gap-3 xl:gap-5 justify-center xl:justify-start mb-10 xl:mb-0'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 5 }} />
				) : (
					<>
						{cards && mainCard(cards.cards.uzcard)}
						{cards && mainCard(cards.cards.atto)}
						<div className='w-full max-w-[290px]'>
							<Link
								className='group h-[100px] sm:h-[182px] w-full max-w-[290px] bg-blue-300 border-8 text-white font-bold hover:opacity-80 duration-150 rounded-[14.5px] flex justify-center items-center'
								to={`${
									cards?.count === 0
										? '/cabinet/cards/add-card'
										: '/cabinet/cards'
								}`}
							>
								<span>
									{cards?.count === 0
										? t('main.add_card')
										: t('main.all_cards')}
								</span>
								<ArrowForwardIcon className='text-white ml-2 group-hover:translate-x-1' />
							</Link>
						</div>
					</>
				)}
			</div>
			<div
				className='mt-4 text-[#1F2A66] w-40 mx-auto font-bold text-xl xl:mx-0 mb-4'
				onClick={() => navigate('/cabinet/payments/qr')}
			>
				<ButtonPrimary title='Atto Pay' />
			</div>
		</div>
	);
}

export default Main;
