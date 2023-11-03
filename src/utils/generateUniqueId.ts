import { getFromCookie, setUIDorLanguage } from './cookies';

function generateId() {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < 30; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export default function saveToStorage() {
	const uid = getFromCookie('uid');

	if (!uid) {
		setUIDorLanguage('uid', generateId());
	}
}

saveToStorage();
