import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { motion } from 'framer-motion';
import { handleExpiry } from '../../utils/handleExpiry';
import { currencyFormat } from '../../utils/currencyFormat';
import { Card } from '../../@types/card.types';
import { useTranslation } from 'react-i18next';

export const CardStructure = ({
	pan,
	expiry_month,
	expiry_year,
	balance,
	single_card,
	owner_name,
	index,
}: Card) => {
	const cardVariants = {
		initial: { opacity: 0, x: index ? index * -20 : -20 },
		animate: {
			opacity: 1,
			x: 0,
			transition: { delay: index && index * 0.2 },
		},
	};
	const { t } = useTranslation();

	return (
		<motion.div
			className='relative'
			variants={cardVariants}
			initial='initial'
			animate='animate'
			whileHover={{ scale: 0.98 }}
		>
			<Cards
				cvc={''}
				expiry={handleExpiry(expiry_month, expiry_year)}
				name={owner_name ? owner_name : '.'}
				number={pan}
			/>
			<div
				className={`absolute top-[35%] ${
					single_card ? 'left-[42%]' : 'left-[10%]'
				} text-red-300`}
			>
				{+balance > 0
					? currencyFormat(+balance) + ' ' + t('cards.currency_title')
					: 'not available'}
			</div>
		</motion.div>
	);
};
