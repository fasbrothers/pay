export interface ServicesResponse {
	count: number;
	services: Service[];
}

export interface Service {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	price: number;
	image_url: string;
	is_active?: boolean;
	category_code: string;
	saved: boolean;
	category_name: string;
}

export interface Category {
	name: string;
	code: string;
}

export interface ServiceItemProps {
	service: Service;
	showModal: (serviceInfo: Service) => void;
}

export interface ServicePaymentModalProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	service: Service;
	onCancel: () => void;
}
