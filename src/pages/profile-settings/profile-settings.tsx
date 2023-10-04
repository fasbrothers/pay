import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ButtonPrimary } from '../../components/button';
import { Skeleton } from 'antd';
import { useState } from 'react';
import ModelForm from './components/model-form';
import { useDataFetching } from '../../hooks/useDataFetching';

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

	const { isLoading, data: profile } = useDataFetching<IProfileResponse>(
		'profile',
		'customer/profile'
	);

	const showModal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<div className={`${isModalOpen && 'blur'}`}>
			<h4 className='font-bold text-xl mb-3'>Account Information</h4>
			{isLoading ? (
				<Skeleton active paragraph={{ rows: 4 }} />
			) : (
				<>
					<div className={`flex flex-col-reverse md:flex-row `}>
						<div className='bg-gray-100 w-full md:w-2/3 p-6 rounded-xl'>
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
						<div className='w-full md:w-1/3 flex justify-center items-center pl-5'>
							<div>
								{profile?.image_url ? (
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
						profile={profile}
					/>
				</>
			)}
		</div>
	);
}

export default ProfileSettings;
