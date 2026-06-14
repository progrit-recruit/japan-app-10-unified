import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { colors } from '../theme';

const languages = [
  { code: 'ja', label: '日本語', flag: '🇯🇵', sub: 'Japanese' },
  { code: 'zh', label: '中文', flag: '🇨🇳', sub: 'Chinese' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', sub: 'Vietnamese' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', sub: 'Korean' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', sub: 'Portuguese' },
  { code: 'ne', label: 'नेपाली', flag: '🇳🇵', sub: 'Nepali' },
];

export default function LanguageSelectScreen({ onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>はたらくサポート</Text>
        <Text style={styles.appSub}>Working Support</Text>
        <Text style={styles.title}>言語を選んでください</Text>
        <Text style={styles.sub}>Please select your language</Text>
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.langCard}
            onPress={() => onSelect(item.code)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.langLabel}>{item.label}</Text>
            <Text style={styles.langSub}>{item.sub}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  langCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  flag: {
    fontSize: 40,
    marginBottom: 10,
  },
  langLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  langSub: {
    fontSize: 12,
    color: colors.textLight,
  },
});
