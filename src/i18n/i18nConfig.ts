// src/i18n/i18nConfig.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import các file ngôn ngữ
import en from './en';
import vi from './vi';

const resources = {
  en,
  vi,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React đã tự động escape
    },
  });

export default i18n;