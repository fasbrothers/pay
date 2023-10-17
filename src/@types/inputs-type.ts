import { SignInProps } from '../pages/sign-in/sign-in-type';

export interface IResponse {
	password: boolean;
	otp: boolean;
	token: string;
	customer: Customer;
	success: boolean;
}

export interface Customer {
	id: string;
	name: string;
	phone: string;
	image_url: string | null | undefined;
	reg_date: string;
}

export interface ErrorResponse {
	message: string;
	status: number;
	types: string;
}

export interface InputValues {
	phone?: string;
	otp?: string;
	password?: string;
	trust?: boolean;
	name?: string;
	image_url?: string;
	deleteImage?: boolean;
	image?: any;
	gender?: string;
	datePicker?: any;
}

export interface AuthProps {
	additionalProperties?: SignInProps;
	mutate: (values: InputValues) => void;
	isLoading: boolean;
}

export interface ICardResponse {
	success: boolean;
	card: Card;
}

export interface Card {
	id: string;
	customer_id: string;
	name: string;
	pan: string;
	expiry_month: string;
	expiry_year: string;
	balance: string;
	owner_name: string;
}

export interface IAddCard {
	cvc: string;
	expiry: string;
	name: string;
	pan: string;
}

export interface Services {
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
	is_active: boolean;
	category_code: string;
	saved: boolean;
	category_name: string;
}

export interface ResponseTransaction {
	length: number;
	transactions: Transaction[];
}

export interface Transaction {
	id: string;
	owner_id: string;
	type: string;
	action: string;
	amount: number;
	created_at: string;
	sender: Sender;
	receiver: Receiver;
}

export interface Sender {
	id?: string;
	pan: string;
	name: string;
	image_url?: string;
}

export interface Receiver {
	pan?: string;
	name: string;
	image_url?: string;
	id?: string;
}
