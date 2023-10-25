export interface ProfileResponse {
	id: string;
	name: string;
	phone: string;
	image_url: string | null;
	reg_date: string;
	is_blocked: boolean;
	safe_login_after: number;
	last_login_attempt: string | null;
	gender: string | null;
	lang: string;
	birth_date: string | null;
	balance: string;
}

export interface ProfileModelFormProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	profile: ProfileResponse | undefined;
}
