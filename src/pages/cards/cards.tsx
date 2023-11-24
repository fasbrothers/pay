import { Link, Outlet } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { CardStructure } from '../../components/card/card-structure';
import { AddTitle } from '../../components/shared/add-title';
import { currencyFormat } from '../../utils/currencyFormat';
import { AllCardsResponse } from '../../@types/card.types';
import { Skeleton } from 'antd';
import { sumAllCardsPrice } from '../../utils/sumAllCardsPrice';
import { useTranslation } from 'react-i18next';

function AllCards() {
	const { isLoading, data: cards } = useDataFetching<AllCardsResponse>(
		'cards',
		'customer/card'
	);
	const { t } = useTranslation();

	return (
		<div>
			<div className='flex flex-col sm:flex-row justify-between items-center py-5'>
				<div className='mb-2 sm:mb-0'>
					<h4 className='text-2xl text-center sm:text-left lg:text-3xl font-bold'>
						{cards?.cards &&
							currencyFormat(
								sumAllCardsPrice(cards?.cards as AllCardsResponse['cards'])
							)}
						{t('cards.currency_title')}
					</h4>
					<p className='text-sm text-gray-600'>{t('cards.total_balance')}</p>
				</div>
				<AddTitle title={t('cards.add_card_button')} />
			</div>
			<div className='mt-5 flex flex-wrap gap-x-2 gap-y-5 md:gap-3 xl:gap-5 justify-center xl:justify-start mb-10 xl:mb-0'>
				{isLoading ? (
					<Skeleton active paragraph={{ rows: 5 }} />
				) : (
					cards?.cards.map((card, i) => (
						<Link to={card.id} key={card.id}>
							<CardStructure
								name={card.name}
								pan={card.pan}
								expiry_month={card.expiry_month}
								expiry_year={card.expiry_year}
								balance={card.balance}
								id={card.id}
								customer_id={card.customer_id}
								owner_name={card.owner_name}
								index={i}
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
