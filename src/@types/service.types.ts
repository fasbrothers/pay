export interface ServicesResponse {
	count: number;
	services: Service[];
}

export interface Service {
	id: string;
	merchant_id: string;
	category_id: number;
	name: string;
	image_url: string;
	is_active?: boolean;
	category_code: string;
	saved: boolean;
	category_name: string;
	fields?: Field[];
}
export interface Field {
	id: string;
	name: string;
	type: string;
	order: number;
}

export interface Category {
	name: string;
	code: string;
}
