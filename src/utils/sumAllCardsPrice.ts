import { Card } from '../@types/card.types';

export function sumAllCardsPrice(cards: Card[]) {
	return cards.reduce((acc, card) => {
		return card.balance !== null ? acc + parseInt(card.balance) : acc;
	}, 0);
}
