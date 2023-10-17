import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export const icons = [
	{
		id: 1,
		title: 'Main',
		icon: PieChartOutlineRoundedIcon,
		url: '/cabinet/main',
	},
	{
		id: 2,
		title: 'Cards',
		icon: CreditCardIcon,
		url: '/cabinet/cards',
	},
	{
		id: 3,
		title: 'Transfer',
		icon: MultipleStopIcon,
		url: '/cabinet/transfer',
	},
	{
		id: 4,
		title: 'Payments',
		icon: PaymentsOutlinedIcon,
		url: '/cabinet/payments',
	},
	{
		id: 5,
		title: 'Transactions',
		icon: BarChartOutlinedIcon,
		url: '/cabinet/transactions',
	},
];
