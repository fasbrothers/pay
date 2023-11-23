export interface AuthProps {
	additionalProperties?: SignInProps;
	mutate: (values: InputValues) => void;
	isLoading: boolean;
	showOTP?: boolean;
	timeLeft: number;
	setTimeLeft?: (time: number) => void;
}

export interface InputValues {
	phone?: string;
	otp: string | undefined;
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
	token: string | null;
	params: string;
	isTrusted: boolean
}

export interface SendCodeResponse {
	success: boolean;
	timeLeft: number;
}

export interface QRCodeResponse {
	key: string;
}
