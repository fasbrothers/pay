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
	balance: string;
}

export interface ButtonPrimaryProps {
	title: string;
	isLoading?: boolean;
	disabled?: boolean;
}

export interface FooterLinks {
	id: number;
	title: string;
}