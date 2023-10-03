import { toast } from 'react-toastify';

export default function toastMessage(message: string) {
	return toast.error(message, {
		position: 'top-center',
		hideProgressBar: false,
		autoClose:3000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		closeButton: true,
	});
}
export function toastSuccessMessage(message: string) {
	return toast.success(message, {
		position: 'top-center',
		hideProgressBar: false,
		autoClose: 3000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		closeButton: true,
	});
}
