export const transferType = [
	{
		id: 1,
		name: 'Transfer to card',
	},
	{
		id: 2,
		name: 'Transfer to self',
	},
];

export interface PanResponse {
	owner: {
		name: string;
	};
}

