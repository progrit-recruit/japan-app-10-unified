import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
import { employees, employeeStudyProgress } from '../data/mockData';

const { colors } = theme;

export default function WorkplaceManagementScreen({ lang, navigate }) {
  // employees と employeeStudyProgress をマージ
  const mergedList = employees.map(emp => ({
    ...emp,
    progress: employeeStudyProgress.find(p => p.employeeId === emp.id) || null,
  }));

  const getRateBadgeColor = (rate) => {
    if (rate >= 80) return '#059669';
    if (rate >= 60) return '#D97706';
    return '#DC2626';
  };

  const ProgressBar = ({ value, total, color }) => (
    <View style={{ height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, marginTop: 3 }}>
      <View style={{ height: 6, width: `${Math.round((value / total) * 100)}%`, backgroundColor: color, borderRadius: 3 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>学習進捗管理</Text>
      </View>

      {/* サマリーカード */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>5名</Text>
          <Text style={styles.summaryLabel}>学習中</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>83%</Text>
          <Text style={styles.summaryLabel}>平均正解率</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>🇨🇳</Text>
          <Text style={styles.summaryLabel}>Wang Fang</Text>
          <Text style={styles.summarySubLabel}>今週トップ</Text>
        </View>
      </View>

      {/* 従業員リスト */}
      <FlatList
        data={mergedList}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const p = item.progress;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => p && navigate('StudyProgress', { employeeProgress: p })}
              activeOpacity={p ? 0.7 : 1}
            >
              <Text style={styles.flag}>{item.nationality}</Text>
              <View style={styles.cardBody}>
                <Text style={styles.name}>{item.name}</Text>
                {p ? (
                  <>
                    <Text style={styles.lastStudied}>最終学習: {p.lastStudied}</Text>
                    <View style={styles.barRow}>
                      <Text style={styles.barLabel}>会社課題</Text>
                      <View style={{ flex: 1, marginLeft: 8 }}>
                        <ProgressBar value={p.companyVocabMastered} total={p.companyVocabTotal} color={colors.primary} />
                      </View>
                      <Text style={styles.barCount}>{p.companyVocabMastered}/{p.companyVocabTotal}</Text>
                    </View>
                    <View style={styles.barRow}>
                      <Text style={styles.barLabel}>職種別</Text>
                      <View style={{ flex: 1, marginLeft: 8 }}>
                        <ProgressBar value={p.jobVocabMastered} total={p.jobVocabTotal} color={colors.secondary} />
                      </View>
                      <Text style={styles.barCount}>{p.jobVocabMastered}/{p.jobVocabTotal}</Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.noStudy}>未学習</Text>
                )}
              </View>
              <View style={styles.cardRight}>
                {p ? (
                  <>
                    <View style={[styles.rateBadge, { backgroundColor: getRateBadgeColor(p.overallRate) }]}>
                      <Text style={styles.rateText}>{p.overallRate}%</Text>
                    </View>
                    <Text style={styles.streak}>🔥 {p.studyStreak}日</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.textLight} style={{ marginTop: 4 }} />
                  </>
                ) : (
                  <View style={[styles.rateBadge, { backgroundColor: '#9CA3AF' }]}>
                    <Text style={styles.rateText}>未</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: 16, paddingTop: 50 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: -1,
    marginBottom: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: { alignItems: 'center' },
  summaryNum: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  summaryLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  summarySubLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  summaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flag: { fontSize: 32, marginRight: 12 },
  cardBody: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 2 },
  lastStudied: { fontSize: 11, color: colors.textLight, marginBottom: 4 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  barLabel: { fontSize: 10, color: colors.textLight, width: 38 },
  barCount: { fontSize: 10, color: colors.textLight, marginLeft: 6, width: 28 },
  noStudy: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  cardRight: { alignItems: 'center', marginLeft: 8 },
  rateBadge: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  rateText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  streak: { fontSize: 11, color: colors.textLight, marginTop: 4 },
});
