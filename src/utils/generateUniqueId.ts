function generateId() {
	return Math.random().toString(36).substr(2, 72);
}

export default function saveToStorage() {
	const uid = localStorage.getItem('uid');

	if (!uid) {
		localStorage.setItem('uid', generateId());
	}
}

saveToStorage();
