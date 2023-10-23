import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { LoadingLazy } from './components/loading-lazy';
import ErrorBoundary from './components/error-boundary/error-boundary.tsx';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary fallback='There was an error'>
			<Suspense fallback={<LoadingLazy />}>
				<App />
			</Suspense>
		</ErrorBoundary>
	</React.StrictMode>
);
