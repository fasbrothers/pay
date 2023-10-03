import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { handleExpiry } from '../../utils/handleExpiry';
import { Card } from '../../pages/cards/cards';

export const CardStructure = ({
	name,
	pan,
	expiry_month,
	expiry_year,
}: Card) => {
	return (
		<Cards
			cvc={''}
			expiry={handleExpiry(expiry_month, expiry_year)}
			name={name}
			number={pan}
		/>
	);
};
