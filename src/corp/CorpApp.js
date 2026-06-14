import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import MainApp from './screens/MainApp';

export default function CorpApp({ onBack }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState('ja');

  if (!isLoggedIn) {
    return (
      <LoginScreen
        lang={lang}
        setLang={setLang}
        onLogin={() => setIsLoggedIn(true)}
        onBack={onBack}
      />
    );
  }

  return (
    <MainApp
      lang={lang}
      setLang={setLang}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}
