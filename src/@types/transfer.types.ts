import { ChangeEvent } from 'react';

export interface TransferFormProps {
	onFinish: (values: { amount: string }) => void;
	isLoading: boolean;
	isPanLoading: boolean;
	panUser: { owner: { name: string } } | undefined;
	isPayCardSelf: boolean;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface QrProps {
	activeIndex: number;
}

export interface ResponseMetroStations {
	success: boolean;
	lines: Line[];
}

export interface Line {
	name: string;
	stations: Station[];
}

export interface Station {
	id: number;
	name: string;
}
