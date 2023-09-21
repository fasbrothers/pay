import Cookies from 'js-cookie';

export function getToken() {
	return Cookies.get('token');
}

export function setToken(token: string) {
	Cookies.set('token', token, { expires: 7 });
}

export function removeToken() {
	return Cookies.remove('token');
}

export function getUID() {
	return Cookies.get('uid');
}

export function setUID(uid: string) {
	return Cookies.set('uid', uid, { expires: 365 });
}

export function removeUID() {
	return Cookies.remove('uid');
}
