import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes';
import './utils/generateUniqueId';
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import toastMessage from './utils/toast-message';
import { ErrorResponse } from './@types/error.types';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		},
	},
	mutationCache: new MutationCache({
		onError: (error: unknown) => {
			const axiosError = error as AxiosError<ErrorResponse>;
			toastMessage(
				axiosError?.response?.data.message || axiosError?.message || 'Error'
			);
		},
	}),
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<RouterProvider router={routes} />
				<ToastContainer style={{ width: '400px' }} />
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
