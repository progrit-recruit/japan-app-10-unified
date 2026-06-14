import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelectScreen({ onSelect }) {
  const roles = [
    {
      key: 'worker',
      titleJa: '従業員',
      titleEn: 'Employee',
      sub: '日本語学習 · 学習進捗確認',
      icon: 'person-outline',
      color: '#059669',
      lightColor: '#D1FAE5',
      emoji: '👷',
    },
    {
      key: 'corp',
      titleJa: '企業',
      titleEn: 'Company',
      sub: '行政書士依頼 · 従業員の学習管理',
      icon: 'business-outline',
      color: '#1E40AF',
      lightColor: '#DBEAFE',
      emoji: '🏢',
    },
    {
      key: 'gyosei',
      titleJa: '行政書士',
      titleEn: 'Gyoseishoshi',
      sub: '企業クライアント管理 · 依頼対応',
      icon: 'document-text-outline',
      color: '#7C3AED',
      lightColor: '#EDE9FE',
      emoji: '⚖️',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🇯🇵</Text>
        <Text style={styles.title}>Japan Support Platform</Text>
        <Text style={styles.subtitle}>役割を選択してください{'\n'}Please select your role</Text>
      </View>

      <View style={styles.cards}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.key}
            style={[styles.card, { borderColor: role.color, borderWidth: 2 }]}
            onPress={() => onSelect(role.key)}
            activeOpacity={0.85}
          >
            <View style={[styles.iconWrap, { backgroundColor: role.lightColor }]}>
              <Text style={styles.emoji}>{role.emoji}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardTitle, { color: role.color }]}>{role.titleJa}</Text>
              <Text style={styles.cardEn}>{role.titleEn}</Text>
              <Text style={styles.cardSub}>{role.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={role.color} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>Japan Support Platform v1.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 32, paddingHorizontal: 24 },
  logo: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 22 },
  cards: { flex: 1, paddingHorizontal: 20, gap: 14 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrap: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  emoji: { fontSize: 28 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  cardEn: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#6B7280' },
  footer: { textAlign: 'center', color: '#D1D5DB', fontSize: 12, paddingBottom: 20 },
});
