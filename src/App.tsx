import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './utils/generateUniqueId';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
	const queryClient = new QueryClient();
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<div>
					<Routes />
				</div>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
