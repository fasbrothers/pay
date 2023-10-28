import Cookies from 'js-cookie';

export function getFromCookie(item: string) {
	return Cookies.get(item);
}

export function removeFromCookie(item: string) {
	return Cookies.remove(item);
}

export function setUIDorLanguage(title: string, value: string) {
	return Cookies.set(title, value);
}

export function setLang(value: string = 'en') {
	return Cookies.set('language', value);
}

export function setToken(token: string) {
	Cookies.set('token', token);
}
