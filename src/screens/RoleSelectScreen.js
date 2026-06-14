import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ブランドカラー（ロゴより）
const NAVY   = '#1B2E4E';
const BLUE   = '#2558A0';
const BG     = '#E8EFF8';
const CARD   = '#FFFFFF';

// 橋のロゴ（Viewで再現）
function BridgeIcon() {
  const lines = [0, 1, 2, 3, 4, 5, 6, 7];
  const totalWidth = 152;
  const archHeight = 72;

  return (
    <View style={{ width: totalWidth, height: archHeight + 12, marginBottom: 4 }}>
      {/* アーチ */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 8,
        right: 8,
        height: archHeight,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 0,
        borderColor: NAVY,
        borderTopLeftRadius: archHeight,
        borderTopRightRadius: archHeight,
      }} />

      {/* アーチ内の縦線 */}
      {lines.map((i) => {
        const t = (i + 1) / (lines.length + 1);
        const x = 8 + t * (totalWidth - 16);
        const sinH = Math.sin(t * Math.PI);
        const lineH = sinH * (archHeight - 8) + 2;
        return (
          <View key={i} style={{
            position: 'absolute',
            left: x - 1,
            bottom: 12,
            width: 3,
            height: lineH,
            backgroundColor: NAVY,
            borderRadius: 1,
          }} />
        );
      })}

      {/* 左柱 */}
      <View style={{ position: 'absolute', left: 8, bottom: 0, width: 5, height: 16, backgroundColor: NAVY }} />
      {/* 右柱 */}
      <View style={{ position: 'absolute', right: 8, bottom: 0, width: 5, height: 16, backgroundColor: NAVY }} />
      {/* ベース */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: NAVY, borderRadius: 2 }} />
    </View>
  );
}

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
      color: NAVY,
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
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ヘッダー：ロゴ + ブランド名 */}
      <View style={styles.header}>
        <BridgeIcon />
        <Text style={styles.brandName}>JAPAN KAKERU WORKS</Text>
        <Text style={styles.tagline}>日本で働く、{'\n'}そのすべての{'\n'}架け橋へ</Text>
      </View>

      {/* 区切り線 */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>役割を選択 / Select your role</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* ロールカード */}
      <View style={styles.cards}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.key}
            style={[styles.card, { borderLeftColor: role.color }]}
            onPress={() => onSelect(role.key)}
            activeOpacity={0.82}
          >
            <View style={[styles.iconWrap, { backgroundColor: role.lightColor }]}>
              <Text style={styles.emoji}>{role.emoji}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardTitle, { color: role.color }]}>{role.titleJa}</Text>
              <Text style={styles.cardEn}>{role.titleEn}</Text>
              <Text style={styles.cardSub}>{role.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={role.color} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>© JAPAN KAKERU WORKS</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: NAVY,
    letterSpacing: 2.5,
    marginTop: 14,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    color: BLUE,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C8D8EC',
  },
  dividerText: {
    fontSize: 11,
    color: '#7A96B8',
    marginHorizontal: 10,
    letterSpacing: 0.3,
  },
  cards: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: { fontSize: 26 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 19, fontWeight: '800', marginBottom: 1 },
  cardEn: { fontSize: 11, color: '#9CA3AF', marginBottom: 3, letterSpacing: 0.5 },
  cardSub: { fontSize: 12, color: '#6B7280' },
  footer: {
    textAlign: 'center',
    color: '#A0B4CC',
    fontSize: 11,
    paddingBottom: 20,
    letterSpacing: 1,
  },
});
