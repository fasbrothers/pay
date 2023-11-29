import { AllCardsResponse } from './card.types';
import { ProfileResponse } from './profile.types';

export interface Navigation {
	id: number;
	title: string;
	icon: string;
	url: string;
	name: string;
}

export interface HeaderMainProps {
	setShowNavbar: (showNavbar: boolean) => void;
	showNavbar: boolean;
	title?: string;
	isLoading: boolean;
	profile: ProfileResponse;
}

export interface SidebarInMainProps {
	showNavbar: boolean;
	title: string;
	setShowNavbar: (showNavbar: boolean) => void;
	cards: AllCardsResponse;
}

export interface ButtonPrimaryProps {
	title: string;
	weight?: string;
	isLoading?: boolean;
	disabled?: boolean;
	bgColor?: string;
}

export interface FooterLinks {
	id: number;
	title: string;
}
