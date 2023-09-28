import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export const icons = [
	{
		id: 1,
		title: 'Dashboard',
		icon: PieChartOutlineRoundedIcon,
		url: '/cabinet/dashboard',
	},
	{
		id: 2,
		title: 'Cards',
		icon: CreditCardIcon,
		url: '/cabinet/cards',
	},
	{
		id: 3,
		title: 'Transactions',
		icon: MultipleStopIcon,
		url: '/cabinet/transactions',
	},
	{
		id: 4,
		title: 'Payments',
		icon: PaymentsOutlinedIcon,
		url: '/cabinet/payments',
	},
	{
		id: 5,
		title: 'Reports',
		icon: BarChartOutlinedIcon,
		url: '/cabinet/reports',
	},
];
