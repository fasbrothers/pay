import { toast } from 'react-toastify';

export default function toastMessage(message: string) {
	return toast.error(message, {
		position: 'top-center',
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		closeButton: true,
	});
}
