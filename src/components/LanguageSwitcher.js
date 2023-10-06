import React, { useState } from 'react';

export const LanguageSwitcher = ({ onChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fi'); // Default language is Finnish

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fi' ? 'en' : 'fi';
    setCurrentLanguage(newLanguage);
    onChange(newLanguage);
  };

  return (
    <button onClick={toggleLanguage}>
      {currentLanguage === 'fi' ? 'English' : 'Finnish'}
    </button>
  );
};
