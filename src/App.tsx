import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes';
import './utils/generateUniqueId';
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorFunc } from './utils/errorFunc';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			cacheTime: 1000 * 60 * 5,
		},
	},
	mutationCache: new MutationCache({
		onError: errorFunc,
	}),
	queryCache: new QueryCache({
		onError: errorFunc,
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
