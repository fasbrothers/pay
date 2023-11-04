import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationUzbek from './translation/Uzbek/translation.json';
import translationRussian from './translation/Russian/translation.json';
import translationEnglish from './translation/English/translation.json';
import { getFromCookie } from './utils/cookies';

const resources = {
	ru: {
		translation: translationRussian,
	},
	uz: {
		translation: translationUzbek,
	},
	en: {
		translation: translationEnglish,
	},
};

const defaultLanguage = getFromCookie('language') || navigator.language || 'uz';

i18next.use(initReactI18next).init({
	resources,
	lng: defaultLanguage,
});

export default i18next;
