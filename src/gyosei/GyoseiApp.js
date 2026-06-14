import React from 'react';
import MainApp from './screens/MainApp';

export default function GyoseiApp({ onBack }) {
  return <MainApp lang="ja" onBack={onBack} />;
}
