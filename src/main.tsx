import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import './i18n';
import { LoadingLazy } from './components/shared/loading-lazy';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<LoadingLazy />}>
			<ErrorBoundary fallback='There was an error'>
				<App />
			</ErrorBoundary>
		</Suspense>
	</React.StrictMode>
);
