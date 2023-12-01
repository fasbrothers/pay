import { ChangeEvent } from 'react';
import { Card } from './card.types';

export interface TransferFormProps {
	onFinish: (values: { amount: string }) => void;
	isLoading: boolean;
	isPanLoading: boolean;
	panUser: { owner: { name: string } } | undefined;
	isPayCardSelf: boolean;
	isAtto: boolean;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface QrProps {
	activeIndex: number;
	cards: Card[];
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
export interface QrMetroModalProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	qrLink: string;
}
