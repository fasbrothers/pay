import { getUID, setUID } from './cookies';

function generateId() {
	return Math.random().toString(36).substr(2, 72);
}

export default function saveToStorage() {
	const uid = getUID();

	if (!uid) {
		setUID(generateId());
	}
}

saveToStorage();
