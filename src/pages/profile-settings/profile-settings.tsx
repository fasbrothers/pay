import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ButtonPrimary } from '../../components/button';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { Modal, Skeleton } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { token } from '../../store/slices/authSlice';

export interface IProfileResponse {
	id: string;
	name: string;
	phone: string;
	photo_url: string | null;
	reg_date: string;
	is_blocked: boolean;
	safe_login_after: number;
	last_login_attempt: string | null;
}

function ProfileSettings() {
	const tokenUser = useAppSelector(token)

	const { isLoading, data: profile } = useQuery({
		queryKey: ['profile', tokenUser],
		queryFn: fetchProfile,
		staleTime: Infinity
	});

	async function fetchProfile() {
    const {data} = await api.get<IProfileResponse>('/customer/profile');
			return data;
		
	}

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<h4 className='font-bold text-xl mb-3'>Account Information</h4>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 4 }} />
			) : (
				<>
					<div className='flex'>
						<div className='bg-gray-100 w-2/3 p-6 rounded-xl'>
							<div className='border-b-2 pb-3 border-gray-200'>
								<p className='text-sm'>Full name</p>
								<h3 className='mt-1 font-bold'>{profile?.name}</h3>
							</div>
							<div className='border-b-2 py-3 border-gray-200'>
								<p className='text-sm'>Gender</p>
								<h3 className='mt-1 font-bold'>Male</h3>
							</div>
							<div className='border-b-2 py-3 border-gray-200'>
								<p className='text-sm'>Date of birth</p>
								<h3 className='mt-1 font-bold'>January 24, 2001</h3>
							</div>
							<div className='py-3'>
								<p className='text-sm'>Phone number</p>
								<h3 className='mt-1 font-bold'>+{profile?.phone}</h3>
							</div>
						</div>
						<div className='w-1/3 flex justify-center items-center'>
							<div>
                {profile?.photo_url ? (profile?.photo_url): (
                  <AccountCircleIcon
                    fontSize='large'
                    style={{ fontSize: '250px' }}
                    className='text-gray-600'
                  />
                )}
							</div>
						</div>
					</div>
					<form className='w-48 mt-10' onSubmit={showModal}>
						<ButtonPrimary title='Update Settings' />
					</form>
				</>
			)}
			<Modal
				title='Update User Profile'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</div>
	);
}

export default ProfileSettings;
