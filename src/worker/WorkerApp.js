import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import JobSelectScreen from './screens/JobSelectScreen';
import WorkplaceSelectScreen from './screens/WorkplaceSelectScreen';
import MainApp from './screens/MainApp';

export default function WorkerApp({ onBack }) {
  const [lang, setLang] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [workplace, setWorkplace] = useState(null);

  // 戻るボタン（共通ヘッダー）
  const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.backBtn}>
      <Ionicons name="arrow-back" size={18} color="#6B7280" />
      <Text style={styles.backText}>役割選択に戻る</Text>
    </TouchableOpacity>
  );

  if (!lang) return (
    <View style={{ flex: 1 }}>
      <BackButton onPress={onBack} />
      <LanguageSelectScreen onSelect={setLang} />
    </View>
  );
  if (!jobType) return <JobSelectScreen lang={lang} onSelect={setJobType} />;
  if (!workplace) return <WorkplaceSelectScreen lang={lang} jobType={jobType} onSelect={setWorkplace} />;
  return <MainApp lang={lang} jobType={jobType} workplace={workplace} />;
}

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 50,
    backgroundColor: '#F9FAFB',
    gap: 6,
  },
  backText: { fontSize: 13, color: '#6B7280' },
});
