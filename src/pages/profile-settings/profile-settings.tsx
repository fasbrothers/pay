import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ButtonPrimary } from '../../components/button';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getUserData } from '../../store/slices/authSlice';
import ModelForm from './components/model-form';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/inputs-type';
import toastMessage from '../../utils/toast-message';

export interface IProfileResponse {
	id: string;
	name: string;
	phone: string;
	image_url: string | null;
	reg_date: string;
	is_blocked: boolean;
	safe_login_after: number;
	last_login_attempt: string | null;
}

function ProfileSettings() {
	const [image, setImage] = useState<Blob | undefined>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const profile = useAppSelector(state => state.auth.user);

	const { isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async function () {
			const { data } = await api.get<IProfileResponse>('/customer/profile');
			dispatch(getUserData(data));
			return data;
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
		staleTime: 60 * 30,
	});

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<div>
			<h4 className='font-bold text-xl mb-3'>Account Information</h4>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 4 }} />
			) : (
				<>
					<div className='flex flex-col-reverse md:flex-row'>
						<div className='bg-gray-100 w-full md:w-2/3 p-6 rounded-xl'>
							<div className='border-b-2 pb-3 border-gray-200'>
								<p className='text-sm'>Full name</p>
								<h3 className='mt-1 font-bold'>{profile.name}</h3>
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
								<h3 className='mt-1 font-bold'>+{profile.phone}</h3>
							</div>
						</div>
						<div className='w-full md:w-1/3 flex justify-center items-center pl-5'>
							<div>
								{profile.image_url ? (
									<div className='m-auto mb-5'>
										<img
											src={profile.image_url}
											className='rounded-[50%] w-[200px] md:w-[250px] object-contain'
											alt={profile.name}
										/>
									</div>
								) : (
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
					<ModelForm
						image={image}
						setImage={setImage}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
				</>
			)}
		</div>
	);
}

export default ProfileSettings;
