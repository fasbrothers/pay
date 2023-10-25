import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import { Form, Select } from 'antd';
import { httpClient } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { setLang } from '../../utils/cookies';
import { useTranslation } from 'react-i18next';
import { FooterLinks } from '../../@types/layout.types';

const languageMap: Record<string, string> = {
	uz: "O'zbekcha",
	en: 'English',
	ru: 'Русский',
};

export const FooterMain = ({ language }: { language: string }) => {
	const form = Form.useForm()[0];
	const query = useQueryClient();
	const { i18n, t } = useTranslation();

	useEffect(() => {
		form.setFieldsValue({
			setLanguage: languageMap[language],
		});
		i18n.changeLanguage(language);
	}, [language, form]);

	const { mutate } = useMutation(
		async (value: string) => {
			await httpClient.put('/customer/lang', { lang: value });
			setLang(value);
			i18n.changeLanguage(value);
		},
		{
			onSuccess: () => {
				query.invalidateQueries(['services']);
			},
		}
	);
	const footerList: FooterLinks[] = t('footer_links', {
		returnObjects: true,
	}) as FooterLinks[];

	return (
		<div className='lg:h-[8vh] border-t border-gray-200 flex flex-col md:flex-row justify-between items-center mt-2 xl:mt-0 py-4 lg:py-0'>
			<div>
				{footerList.map(item => (
					<p
						key={item.id}
						className='inline-block mr-6 font-bold text-sm cursor-pointer'
					>
						{item.title}
					</p>
				))}
			</div>
			<div className='flex gap-y-3 items-baseline text-gray-600 mt-4 md:mt-0'>
				<Form form={form}>
					<Form.Item
						name='setLanguage'
						initialValue={languageMap[language]}
						className='w-[110px]'
					>
						<Select
							className='select__language mt-4'
							onChange={e => mutate(e)}
							options={[
								{ value: 'uz', label: "O'zbekcha" },
								{ value: 'ru', label: 'Русский' },
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
