import { getFromCookie, setUIDorLanguage } from './cookies';

function generateId() {
	return Math.random().toString(36).substr(2, 72);
}

export default function saveToStorage() {
	const uid = getFromCookie('uid');

	if (!uid) {
		setUIDorLanguage('uid', generateId());
	}
}

saveToStorage();
