import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './utils/generateUniqueId';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
	const queryClient = new QueryClient();
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider	store={store}>
				<div>
					<Routes />
				</div>
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
