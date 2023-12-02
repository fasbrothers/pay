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
	qrData: {
		qr: string;
		expireIn: number;
		message: string;
	};
}

export interface QrBusModalProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	qrData: ResponseQrBusPayment;
}
export interface ResponseQrBus {
	regNumber: string;
	routeName: string;
	fee: number;
	success: boolean;
}

export interface ResponseQrBusPayment {
	success: boolean;
	message: string;
	details: Details;
}

export interface Details {
	qr: string;
	orderNumber: string;
	fee: number;
	bus: Bus;
}

export interface Bus {
	regNumber: string;
	routeName: string;
}
