import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import './i18n';
import { LoadingLazy } from './components/shared/loading-lazy';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary fallback='There was an error'>
			<Suspense fallback={<LoadingLazy />}>
				<App />
			</Suspense>
		</ErrorBoundary>
	</React.StrictMode>
);
