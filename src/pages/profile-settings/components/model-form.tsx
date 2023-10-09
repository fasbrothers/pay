import { Form, Input, Modal } from 'antd';
import { ErrorResponse, InputValues } from '../../../@types/inputs-type';
import { ButtonPrimary } from '../../../components/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toastMessage, {
	toastSuccessMessage,
} from '../../../utils/toast-message';
import { IProfileResponse } from '../profile-settings';
import { httpClient } from '../../../api';
import { CheckBox } from '../../../components/checkbox';

interface IModelForm {
	image: Blob | undefined;
	setImage: (image: Blob | undefined) => void;
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	profile: IProfileResponse | undefined;
}

function ModelForm({
	image,
	setImage,
	setIsModalOpen,
	isModalOpen,
	profile,
}: IModelForm) {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

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
		values?.deleteImage && formData.append('deleteImage', 'true');

		await httpClient.put('/customer/profile', formData);
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
		onSuccess: () => {
			queryClient.invalidateQueries(['profile']);
			toastSuccessMessage('Profile updated successfully');
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
				<div className='w-[200px] mx-auto'>
					{!image && (
						<img
							className='rounded-[50%] w-[200px] object-contain'
							src={profile?.image_url ?? ''}
						/>
					)}
					{image && (
						<img
							className='rounded-[50%] w-[200px] object-contain'
							src={URL.createObjectURL(image)}
						/>
					)}
				</div>
				<Form.Item
					labelCol={{ span: 24 }}
					label='Update Photo'
					name='image_url'
				>
					<input type='file' accept='image/*' onChange={handleImageChange} />
				</Form.Item>
				<CheckBox title='Delete a image' name='deleteImage' />
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
					<Input className='input__style' value={profile?.name} name='name' />
				</Form.Item>
				<Form.Item>
					<ButtonPrimary isLoading={isLoading} title='Update' />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default ModelForm;
