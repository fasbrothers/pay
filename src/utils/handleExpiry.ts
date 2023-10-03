export function handleExpiry(expiry_month: string, expiry_year: string) {
	return expiry_month.length === 1
		? '0' + expiry_month + expiry_year
		: expiry_month + expiry_year;
}
