import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { handleExpiry } from '../../utils/handleExpiry';
import { Card } from '../../pages/cards/cards';
import { currencyFormat } from '../../utils/currencyFormat';

export const CardStructure = ({
	name,
	pan,
	expiry_month,
	expiry_year,
	balance,
	single_card,
}: Card) => {
	return (
		<div className='relative'>
			<Cards
				cvc={''}
				expiry={handleExpiry(expiry_month, expiry_year)}
				name={name}
				number={pan}
			/>
			<div
				className={`absolute top-[35%] ${
					single_card ? 'left-[42%]' : 'left-[10%]'
				} text-red-300`}
			>
				{currencyFormat(+balance)} sum
			</div>
		</div>
	);
};
