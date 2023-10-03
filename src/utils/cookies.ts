import Cookies from 'js-cookie';

export function getFromCookie(item: string) {
	return Cookies.get(item);
}

export function removeFromCookie(item: string) {
	return Cookies.remove(item);
}

export function setUID(uid: string) {
	return Cookies.set('uid', uid, { expires: 365 });
}

export function setToken(token: string) {
	Cookies.set('token', token, { expires: 2 / 24 });
}
