export interface Card {
	id: string;
	customer_id: string;
	name: string;
	pan: string;
	expiry_month: string;
	expiry_year: string;
	balance: string;
	owner_name: string;
	main?: boolean;
	single_card?: boolean;
	index?: number;
}

export interface CardSwiperProps {
	cards: Card[];
	onSlideChange: (index: number) => void;
}

export interface CardFormProps {
	setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
	mutate: (values: CardFormInputs) => void;
	isLoading: boolean;
}

export interface DeleteCardProps {
	id?: string;
	deviceId?: string;
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	handleCancel: () => void;
	url: string;
	navigateUrl: string;
	modalTitle: string;
	modalMessage: string;
}

export interface AllCardsResponse {
	count: number;
	cards: Card[];
}

export interface PanResponse {
	owner: {
		name: string;
	};
}

export interface CardFormInputs {
	name: string;
	pan: string;
	expiry: string;
	main: boolean;
}

export type OutletContextType = [boolean, AllCardsResponse];
