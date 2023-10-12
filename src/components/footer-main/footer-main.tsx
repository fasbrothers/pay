import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import { footerList } from './footer-list';
import { Form, Select } from 'antd';
import { httpClient } from '../../api';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toastSuccessMessage } from '../../utils/toast-message';
import { setUIDorLanguage } from '../../utils/cookies';

export const FooterMain = ({ language }: { language: string }) => {
	const form = Form.useForm()[0];

	const languageMap: Record<string, string> = {
		uz: 'Uzbek',
		en: 'English',
		ru: 'Russian',
	};
	useEffect(() => {
		// Update the initialValue of Form.Item based on the new language
		form.setFieldsValue({
			setLanguage: languageMap[language],
		});
	}, [language, form]);

	const { mutate } = useMutation(
		async (value: string) => {
			await httpClient.put('/customer/lang', { lang: value });
			setUIDorLanguage('language', value);
		},
		{
			onSuccess: () => {
				toastSuccessMessage('Language changed successfully');
			},
		}
	);

	return (
		<div className='lg:h-[8vh] border-t border-gray-200 flex flex-col md:flex-row justify-between items-center mt-2 xl:mt-0 py-4 lg:py-0'>
			<div>
				{footerList.map((item, index) => (
					<p key={index} className='inline-block mr-6 font-bold text-sm'>
						{item}
					</p>
				))}
			</div>
			<div className='flex gap-y-3 items-baseline text-gray-600 mt-4 md:mt-0'>
				<Form form={form}>
					<Form.Item
						name='setLanguage'
						initialValue={languageMap[language]}
						className='w-[100px]'
					>
						<Select
							className='select__language mt-4'
							onChange={e => mutate(e)}
							options={[
								{ value: 'uz', label: 'Uzbek' },
								{ value: 'ru', label: 'Russian' },
								{ value: 'en', label: 'English' },
							]}
						/>
					</Form.Item>
				</Form>
				<div className='cursor-pointer hover:text-blue-600'>
					<Brightness2OutlinedIcon fontSize='small' />
				</div>
			</div>
		</div>
	);
};
