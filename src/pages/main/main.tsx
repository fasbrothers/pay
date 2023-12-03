import { Skeleton } from 'antd';
import { CardStructure } from '../../components/card/card-structure';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { Cards, Card, OutletContextType } from '../../@types/card.types';
import { ButtonPrimary } from '../../components/shared/button';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import { currencyFormat } from '../../utils/currencyFormat';

function Main() {
	const [isLoading, cards, summary] = useOutletContext() as OutletContextType;

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
			<Link
				to={`/cabinet/cards/${card.id}`}
				key={card.id}
				state={{ type: card.type }}
			>
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
			</Link>
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
						{cards && mainCard(cards.uzcard)}
						{cards && mainCard(cards.atto)}
						<div className='w-full max-w-[290px]'>
							<Link
								className='group h-[100px] sm:h-[182px] w-full max-w-[290px] bg-blue-300 border-8 text-white font-bold hover:opacity-80 duration-150 rounded-[14.5px] flex justify-center items-center'
								to={`${
									[...cards.atto, ...cards.uzcard].length === 0
										? '/cabinet/cards/add-card'
										: '/cabinet/cards'
								}`}
							>
								<span>
									{[...cards.atto, ...cards.uzcard].length === 0
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
			{summary ? (
				<div className='mt-5 flex flex-wrap gap-x-2 gap-y-5 md:gap-3 xl:gap-5 justify-center xl:justify-start mb-10 xl:mb-0 cursor-pointer'>
					<div className='border border-gray-300 rounded-xl p-3 w-72 hover:shadow-md duration-300'>
						<div className='flex justify-between'>
							<h5 className='text-gray-500'>{t('transactions.income')}</h5>
							<NorthEastIcon fontSize='small' className='text-green-500' />
						</div>
						<h3 className='font-bold text-2xl mt-2'>
							{currencyFormat(+summary.income)} {t('cards.currency_title')}
						</h3>
						<div className='flex justify-between'>
							<p className='text-sm font-medium'>
								{summary.income_count} {t('navigation.4.title')}
							</p>
							<p className='text-green-500'>
								{+summary.income_count > 0 ? '+6%' : '0%'}
							</p>
						</div>
					</div>
					<div className='border border-gray-300 rounded-xl p-3 w-72 hover:shadow-md duration-300'>
						<div className='flex justify-between'>
							<h5 className='text-gray-500'>{t('transactions.spendings')}</h5>
							<SouthWestIcon fontSize='small' className='text-red-500' />
						</div>
						<h3 className='font-bold text-2xl mt-2'>
							{currencyFormat(+summary.expense)} {t('cards.currency_title')}
						</h3>
						<div className='flex justify-between'>
							<p className='text-sm font-medium'>
								{summary.expense_count} {t('navigation.4.title')}
							</p>
							<p className='text-red-500'>
								{+summary.expense_count > 0 ? '-5%' : '0%'}
							</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Main;
