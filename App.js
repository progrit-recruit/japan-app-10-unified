import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import RoleSelectScreen from './src/screens/RoleSelectScreen';
import WorkerApp from './src/worker/WorkerApp';
import CorpApp from './src/corp/CorpApp';
import GyoseiApp from './src/gyosei/GyoseiApp';

export default function App() {
  const [role, setRole] = useState(null);

  if (!role) return (
    <>
      <RoleSelectScreen onSelect={setRole} />
      <StatusBar style="auto" />
    </>
  );
  if (role === 'worker') return (
    <>
      <WorkerApp onBack={() => setRole(null)} />
      <StatusBar style="auto" />
    </>
  );
  if (role === 'corp') return (
    <>
      <CorpApp onBack={() => setRole(null)} />
      <StatusBar style="auto" />
    </>
  );
  if (role === 'gyosei') return (
    <>
      <GyoseiApp onBack={() => setRole(null)} />
      <StatusBar style="auto" />
    </>
  );
}
