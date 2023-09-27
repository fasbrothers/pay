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
}

export interface AuthProps {
	additionalProperties?: SignInProps;
	mutate: (values: InputValues) => void;
	isLoading: boolean;
}
