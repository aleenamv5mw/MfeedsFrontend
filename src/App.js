import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import finnishMessages from 'ra-language-finnish';
import englishMessages from 'ra-language-english'; // Import English translations
import { Admin, Resource } from 'react-admin';
import { LanguageSwitcher } from './components/LanguageSwitcher'; // Import the LanguageSwitcher component

import PostList from './components/PostList';
import AccountCreate from './components/AccountCreate';
import AccEdit from './components/AccEdit';
import SubList from './components/SubList';
import SubCreate from './components/SubCreate';
import SubEdit from './components/SubEdit';
import MyLogoutButton from './components/MyLogoutButton';
import FeedPage from './components/FeedPage';
import NotesList from './components/NotesList';
import LogList from './components/LogList';
import SearchListings from './components/SearchListings';
import Espacenet from 'components/Espacenet';
import dataProvider from './components/dataProvider';
import { MyLayout } from './components/Layout';
import LoginForm from './components/LoginForm';
import KeyInputForm from 'components/KeyInputForm';
import SearchListingsT from 'components/SearchListingsT';
import Avoin from 'components/SearchListingA';

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === 'fi') {
    return finnishMessages;
  } else {
    return englishMessages;
  }
}, 'fi'); // Set 'fi' as the default locale

function App() {
  const [locale, setLocale] = useState('fi'); // Default locale is Finnish

  return (
    <Admin
      layout={MyLayout}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
    >
      {/* Add the LanguageSwitcher component */}
      <LanguageSwitcher onChange={(lang) => setLocale(lang)} />

      <Resource
        name="accounts"
        list={PostList}
        create={AccountCreate}
        edit={AccEdit}
        logout={MyLogoutButton}
      />

      <Resource
        name="subscriptions"
        list={SubList}
        create={SubCreate}
        edit={SubEdit}
        logout={MyLogoutButton}
      />

      {/* Add other resources here with Finnish translations */}
      <Resource name="FinnishRennovation" list={SearchListings} />
      <Resource name="PlotInformation" list={SearchListingsT} />
      <Resource name="SalesAnnouncement" list={Avoin} />
      <Resource name="Jobs" list={KeyInputForm} />
      <Resource name="Patents" list={Espacenet} />

      <Resource
        name="rssfeeds"
        list={NotesList}
        // create={NotesCreate}
        logout={MyLogoutButton}
      />

      <Resource name="logs" list={LogList} logout={MyLogoutButton} />
    </Admin>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
export default App;
