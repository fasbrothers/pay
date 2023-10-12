export function formatNumber(number: string): string {
	return number
		.split(' ')
		.map(
			el =>
				el.slice(0, 3) +
				' ' +
				el.slice(3, 5) +
				' ' +
				el.slice(5, 8) +
				' ' +
				el.slice(8, 10) +
				' ' +
				el.slice(10, 12)
		)
		.join(' ');
}
