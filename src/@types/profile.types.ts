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

export interface DevicesResponse {
	count: number;
	rows: Device[];
}

export interface Device {
	id: number;
	name: string;
	last_login: string;
	device_id: string;
}

export interface QrModelProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
}

export interface Tabs {
	id: number;
	name: string;
}
