import { DatePicker, Form, Input, Modal, Select, Upload } from 'antd';
import { InputValues } from '../../../@types/inputs-type';
import { ButtonPrimary } from '../../../components/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toastSuccessMessage } from '../../../utils/toast-message';
import { IProfileResponse } from '../profile-settings';
import { httpClient } from '../../../api';
import { CheckBox } from '../../../components/checkbox';
import { useState } from 'react';
import { dateFormat, dayjs } from '../../../utils/date';
import { useTranslation } from 'react-i18next';

interface IModelForm {
	setIsModalOpen: (isModalOpen: boolean) => void;
	isModalOpen: boolean;
	profile: IProfileResponse | undefined;
}

function ModelForm({ setIsModalOpen, isModalOpen, profile }: IModelForm) {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();
	const [imageStatus, setImageStatus] = useState(false);
	const { t } = useTranslation();

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (values: InputValues) => {
		const formData = new FormData();
		values?.name && formData.append('name', values.name);
		values?.gender && formData.append('gender', values.gender);
		values.datePicker &&
			formData.append(
				'birthDate',
				dayjs(values.datePicker, dateFormat).format(dateFormat)
			);
		values.image && formData.append('avatar', values.image.file.originFileObj);
		values?.deleteImage && formData.append('deleteImage', 'true');

		const { data } = await httpClient.put('/customer/profile', formData);
		setIsModalOpen(false);
		values.image && setImageStatus(false);
		values.image && form.resetFields(['image']);
		data.message ? toastSuccessMessage(data.message) : null;
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: InputValues) => handleSubmit(values),
		onSuccess: () => {
			queryClient.invalidateQueries(['profile']);
		},
	});

	return (
		<Modal
			title={t('modal_profile_update.title')}
			open={isModalOpen}
			onCancel={handleCancel}
			className='profile__modal'
		>
			<Form
				form={form}
				name='update'
				onFinish={mutate}
				scrollToFirstError
				className='profile__form'
				initialValues={{
					name: profile?.name,
					gender: profile?.gender,
					datePicker: profile?.birth_date && dayjs(profile?.birth_date),
				}}
			>
				{!imageStatus && profile?.image_url && (
					<div className='flex justify-center -mb-10'>
						<img
							src={profile?.image_url}
							className='w-[150px] h-[150px] object-contain rounded-full'
						/>
					</div>
				)}
				<Form.Item
					className='avatar-uploader flex justify-center'
					name='image'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Upload
						listType='picture-circle'
						maxCount={1}
						accept='image/*'
						onChange={e => setImageStatus(e.fileList.length > 0)}
					>
						<div>
							<AddCircleOutlineIcon />
						</div>
					</Upload>
				</Form.Item>
				{profile?.image_url && (
					<CheckBox
						title={t('modal_profile_update.delete_image')}
						name='deleteImage'
					/>
				)}
				<Form.Item
					name='name'
					label={t('modal_profile_update.name')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: t('modal_profile_update.name_error'),
							whitespace: true,
						},
					]}
				>
					<Input className='input__style' value={profile?.name} name='name' />
				</Form.Item>
				<Form.Item
					label={t('profile_settings.dob')}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					name='datePicker'
				>
					<DatePicker format={dateFormat} className='w-full p-3' />
				</Form.Item>
				<Form.Item
					label={t('modal_profile_update.gender')}
					name='gender'
					className='gender__select mb-10'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Select placeholder={t('modal_profile_update.gender')}>
						<Select.Option value='M'>
							{t('profile_settings.gender_one')}
						</Select.Option>
						<Select.Option value='F'>
							{t('profile_settings.gender_two')}
						</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<ButtonPrimary
						isLoading={isLoading}
						title={t('modal_profile_update.button')}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default ModelForm;
