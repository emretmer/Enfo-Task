import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import tr from './tr/translation.json';
import fr from './fr/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      fr: { translation: fr }
    },
    lng: 'en', // Varsayılan dil
    fallbackLng: 'en', // Dil bulunamazsa varsayılan
    interpolation: {
      escapeValue: false // React zaten XSS koruması sağlar
    }
  });

export default i18n;