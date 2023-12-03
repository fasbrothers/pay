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
	summary: Summary;
}

export interface Summary {
	expense: string;
	expense_count: string;
	income: string;
	income_count: string;
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
	current: boolean;
}

export interface QrModelProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	setTerminalId: (terminalId: string) => void;
}
export interface QrScreenProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
}

export interface QrReaderProps {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isLoading?: boolean;
	mutate: (val: string) => void;
}

export interface Tabs {
	id: number;
	name: string;
	code: string;
}

export interface SecurityItemProps {
	device: Device;
	showModal: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
	isTrusted: boolean;
}
