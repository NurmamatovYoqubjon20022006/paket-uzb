import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('uz');

  // Xavfsizlik uchun translations mavjudligini tekshirish
  const safeTranslations = translations || {
    uz: { 
      home: "Bosh sahifa", 
      products: "Mahsulotlar", 
      about: "Biz haqimizda", 
      contact: "Aloqa",
      language: "Til"
    },
    ru: { 
      home: "Главная", 
      products: "Товары", 
      about: "О нас", 
      contact: "Контакты",
      language: "Язык"
    },
    en: { 
      home: "Home", 
      products: "Products", 
      about: "About", 
      contact: "Contact",
      language: "Language"
    }
  };

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('paket-uzb-language');
    if (savedLanguage && ['uz', 'ru', 'en'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('ru')) {
        setCurrentLanguage('ru');
      } else if (browserLang.includes('en')) {
        setCurrentLanguage('en');
      } else {
        setCurrentLanguage('uz'); // Default
      }
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('paket-uzb-language', currentLanguage);
    // Update document language
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (lang) => {
    if (['uz', 'ru', 'en'].includes(lang)) {
      setCurrentLanguage(lang);
    }
  };
  const t = (key) => {
    try {
      if (!safeTranslations || !safeTranslations[currentLanguage]) {
        return key;
      }

      const keys = key.split('.');
      let value = safeTranslations[currentLanguage];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English, then Uzbek
          let fallbackValue = safeTranslations.en;
          for (const fallbackKey of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
              fallbackValue = fallbackValue[fallbackKey];
            } else {
              fallbackValue = safeTranslations.uz;
              for (const uzKey of keys) {
                if (fallbackValue && typeof fallbackValue === 'object' && uzKey in fallbackValue) {
                  fallbackValue = fallbackValue[uzKey];
                } else {
                  return key; // Return key if translation not found
                }
              }
              break;
            }
          }
          return typeof fallbackValue === 'string' ? fallbackValue : key;
        }
      }
      
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };
  const getLanguageName = (lang) => {
    const names = {
      uz: "O'zbek",
      ru: "Русский", 
      en: "English"
    };
    return names[lang] || lang;
  };

  const getLanguageFlag = (lang) => {
    const flags = {
      uz: "🇺🇿",
      ru: "🇷🇺",
      en: "🇬🇧"
    };
    return flags[lang] || "🌐";
  };

  const value = {
    currentLanguage,
    language: currentLanguage, // Backward compatibility
    changeLanguage,
    t,
    translations: safeTranslations, // Export safe translations
    getLanguageName,
    getLanguageFlag,
    availableLanguages: ['uz', 'ru', 'en']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
