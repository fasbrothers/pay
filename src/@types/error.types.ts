import { ReactNode } from 'react';

export interface ErrorResponse {
	message: string;
	status: number;
	type: string;
	info: {
		message: string;
		timeLeft: number;
	};
}

export interface ErrorBoundaryProps {
	fallback: ReactNode;
	children: ReactNode;
}

export interface ErrorBoundaryState {
	hasError: boolean;
}
