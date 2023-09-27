import { Form, Input, Modal } from 'antd';
import { ErrorResponse, InputValues } from '../../../@types/inputs-type';
import { api } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { ButtonPrimary } from '../../../components/button';
import { getUserData } from '../../../store/slices/authSlice';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toastMessage from '../../../utils/toast-message';

interface IModelForm {
	image: Blob | undefined;
	setImage: (image: Blob | undefined) => void;
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
}

function ModelForm({
	image,
	setImage,
	setIsModalOpen,
	isModalOpen,
}: IModelForm) {
	const [form] = Form.useForm();
	const profile = useAppSelector(state => state.auth.user);
	const dispatch = useAppDispatch();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		setImage(file);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (values: InputValues) => {
		const formData = new FormData();
		values?.name && formData.append('name', values.name);
		image && formData.append('avatar', image, image.name);

		const response = await api.put('/customer/profile', formData);
		dispatch(getUserData(response.data.customer));
		setIsModalOpen(false);
		setImage(undefined);
	};

	const { mutate, isLoading } = useMutation<
		any,
		AxiosError<ErrorResponse>,
		any
	>({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onError: (error: AxiosError<ErrorResponse>) => {
			toastMessage(error?.response?.data.message || error?.message || 'Error');
		},
	});

	return (
		<Modal
			title='Update User Profile'
			open={isModalOpen}
			onCancel={handleCancel}
			className='profile__modal'
		>
			<Form
				form={form}
				name='update'
				onFinish={mutate}
				scrollToFirstError
				initialValues={{
					['name']: profile?.name,
				}}
			>
				<div className='w-[200px] h-[200px] mx-auto'>
				{!image && <img src={profile?.image_url ?? ''} />}
				{image && <img src={URL.createObjectURL(image)} />}
				</div>
				<Form.Item
					labelCol={{ span: 24 }}
					label='Update Photo'
					name='image_url'
				>
					<input type='file' accept='image/*' onChange={handleImageChange} />
				</Form.Item>
				<Form.Item
					name='name'
					label='Name'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: 'Please input your name!',
							whitespace: true,
						},
					]}
				>
					<Input className='w-full p-3' value={profile?.name} name='name' />
				</Form.Item>
				<Form.Item>
					<ButtonPrimary isLoading={isLoading} title='Update' />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default ModelForm;
