// in src/MyAppBar.js
import React, { useState } from 'react';
import {
  AppBar,
  ToggleThemeButton,
  defaultTheme,
  useTranslate,
} from 'react-admin';
import Box from '@mui/material/Box';
import { LanguageSwitcher } from './LanguageSwitcher'; // Import the LanguageSwitcher component
import polyglotI18nProvider from 'ra-i18n-polyglot';
import finnishMessages from 'ra-language-finnish';
import englishMessages from 'ra-language-english'; // Import English translations

// Import your logo component if needed
// import Logo from './logo';

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === 'fi') {
    return finnishMessages;
  } else {
    return englishMessages;
  }
}, 'fi'); // Set 'fi' as the default locale

const darkTheme = { palette: { mode: 'dark' } };

export const MyAppBar = () => {
  const translate = useTranslate();

  const [locale, setLocale] = useState('fi'); // Default locale is Finnish

  return (
    <AppBar color="primary" position="sticky">
      <Box flex="1" />
      <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
      {/* Uncomment if you have a logo component */}
      {/* <Logo /> */}
      <Box flex="0" />
      {/* Add the LanguageSwitcher component */}
      <LanguageSwitcher onChange={(lang) => setLocale(lang)} />
    </AppBar>
  );
};
