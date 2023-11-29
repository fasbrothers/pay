import { ButtonPrimary } from '../shared/button';
import { Form, Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { CardFormInputs, CardFormProps } from '../../@types/card.types';
import { useTranslation } from 'react-i18next';
import { CheckBox } from '../shared/checkbox';

export const CardForm = ({ setInputs, mutate, isLoading }: CardFormProps) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInputs(inputs => ({ ...inputs, [name]: value }));
	};

	const onFinish = (values: CardFormInputs) => {
		mutate(values);
	};

	return (
		<Form
			form={form}
			name='add card'
			onFinish={onFinish}
			scrollToFirstError
			className='w-full sm:w-4/5 xl:w-2/4 2xl:w-1/3 mx-auto mt-5'
		>
			<Form.Item
				name='name'
				label={t('cards.add_card.name.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('cards.add_card.name.error'),
						whitespace: true,
					},
					{ min: 2, message: t('cards.add_card.name.error_length') },
				]}
			>
				<Input
					className='input__style'
					onChange={handleInputChange}
					name='name'
				/>
			</Form.Item>
			<Form.Item
				name='pan'
				label={t('cards.add_card.card_number.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{ required: true, message: t('cards.add_card.card_number.error') },
					{
						pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
						message: t('cards.add_card.card_number.error_length'),
					},
				]}
			>
				<MaskedInput
					maskOptions={{ lazy: true }}
					mask={'0000 0000 0000 0000'}
					name='pan'
					onChange={handleInputChange}
					className='input__style'
				/>
			</Form.Item>
			<Form.Item
				name='expiry'
				label={t('cards.add_card.card_expiry.title')}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				rules={[
					{
						required: true,
						message: t('cards.add_card.card_expiry.error'),
					},
					{
						pattern: /^\d{2}\/\d{2}$/,
						message: t('cards.add_card.card_expiry.error_length'),
					},
				]}
			>
				<MaskedInput
					maskOptions={{ lazy: true }}
					mask={'00/00'}
					name='expiry'
					onChange={handleInputChange}
					className='input__style'
				/>
			</Form.Item>
			<CheckBox name='main' title='Main Card' />
			<Form.Item>
				<ButtonPrimary
					isLoading={isLoading}
					title={t('cards.add_card.button')}
				/>
			</Form.Item>
		</Form>
	);
};
