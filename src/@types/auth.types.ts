export interface AuthProps {
	additionalProperties?: SignInProps;
	mutate: (values: InputValues) => void;
	isLoading: boolean;
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
	datePicker?: Date | null;
}

export interface SignInProps {
	showPassword: boolean;
	showOtp: boolean;
}

export interface AuthImageTitleProps {
	logo: string;
	title: string;
}

export interface AuthState {
	token: string | undefined;
	params: string;
}
