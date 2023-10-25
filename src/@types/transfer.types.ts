import { ChangeEvent } from 'react';

export interface TransferFormProps {
	onFinish: (values: { amount: string }) => void;
	isLoading: boolean;
	isPanLoading: boolean;
	panUser: { owner: { name: string } } | undefined;
	isPayCardSelf: boolean;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
