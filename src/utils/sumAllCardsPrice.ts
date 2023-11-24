import { Card } from '../@types/card.types';

export function sumAllCardsPrice(cards: Card[]) {
	return cards.reduce((acc, card) => {
		return acc + parseInt(card.balance);
	}, 0);
}
