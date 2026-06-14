import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen({ lang, progressData, goBack }) {
  if (!progressData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>学習進捗 / Study Progress</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>データがありません</Text>
        </View>
      </SafeAreaView>
    );
  }

  const overallPct =
    progressData.totalQuestions > 0
      ? Math.round((progressData.totalCorrect / progressData.totalQuestions) * 100)
      : 0;

  const companyPct =
    progressData.companyVocabTotal > 0
      ? (progressData.companyVocabMastered / progressData.companyVocabTotal) * 100
      : 0;

  const jobPct =
    progressData.jobVocabTotal > 0
      ? (progressData.jobVocabMastered / progressData.jobVocabTotal) * 100
      : 0;

  const getScoreColor = (score, total) => {
    const pct = total > 0 ? (score / total) * 100 : 0;
    if (pct >= 80) return '#059669';
    if (pct >= 60) return '#D97706';
    return '#DC2626';
  };

  const renderHistoryItem = ({ item }) => {
    const pct = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
    const scoreColor = getScoreColor(item.score, item.total);
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyLeft}>
          <Text style={styles.historyDate}>{item.date}</Text>
          <Text style={styles.historyLabel}>{item.label}</Text>
        </View>
        <View style={styles.historyRight}>
          <Text style={[styles.historyScore, { color: scoreColor }]}>
            {item.score}/{item.total}問正解
          </Text>
          <View style={[styles.pctBadge, { backgroundColor: scoreColor + '20' }]}>
            <Text style={[styles.pctText, { color: scoreColor }]}>{pct}%</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>学習進捗 / Study Progress</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryName}>{progressData.employeeName}</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>🔥</Text>
              <Text style={styles.summaryValue}>{progressData.studyStreak}日</Text>
              <Text style={styles.summaryLabel}>学習継続</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>📊</Text>
              <Text style={styles.summaryValue}>{overallPct}%</Text>
              <Text style={styles.summaryLabel}>総合正解率</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>📅</Text>
              <Text style={styles.summaryValueSmall}>{progressData.lastStudied}</Text>
              <Text style={styles.summaryLabel}>最終学習日</Text>
            </View>
          </View>
          <View style={styles.quizCountRow}>
            <Ionicons name="checkmark-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.quizCountText}>
              合計 {progressData.totalQuizzesTaken} 回のクイズ ·{' '}
              {progressData.totalCorrect}/{progressData.totalQuestions} 問正解
            </Text>
          </View>
        </View>

        {/* Progress Bars */}
        <Text style={styles.sectionTitle}>単語マスター進捗</Text>

        {/* Company Vocab Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIconWrap}>
              <Ionicons name="business-outline" size={20} color="#1E40AF" />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>会社からの課題</Text>
              <Text style={styles.progressSubtitle}>
                {progressData.companyVocabMastered}/{progressData.companyVocabTotal}語 マスター済み
              </Text>
            </View>
            <Text style={styles.progressPct}>{Math.round(companyPct)}%</Text>
          </View>
          <View style={styles.barBg}>
            <View
              style={[
                styles.barFill,
                { width: `${companyPct}%`, backgroundColor: '#1E40AF' },
              ]}
            />
          </View>
        </View>

        {/* Job Vocab Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={[styles.progressIconWrap, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="briefcase-outline" size={20} color="#059669" />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>職種別単語</Text>
              <Text style={styles.progressSubtitle}>
                {progressData.jobVocabMastered}/{progressData.jobVocabTotal}語 マスター済み
              </Text>
            </View>
            <Text style={[styles.progressPct, { color: '#059669' }]}>{Math.round(jobPct)}%</Text>
          </View>
          <View style={styles.barBg}>
            <View
              style={[
                styles.barFill,
                { width: `${jobPct}%`, backgroundColor: '#059669' },
              ]}
            />
          </View>
        </View>

        {/* Quiz History */}
        <Text style={styles.sectionTitle}>クイズ履歴</Text>

        {progressData.quizHistory && progressData.quizHistory.length > 0 ? (
          progressData.quizHistory.map((item) => (
            <View key={item.id}>
              {renderHistoryItem({ item })}
            </View>
          ))
        ) : (
          <View style={styles.noHistoryCard}>
            <Ionicons name="clipboard-outline" size={32} color="#94A3B8" />
            <Text style={styles.noHistoryText}>クイズ履歴がありません</Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    backgroundColor: '#059669',
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#059669',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  summaryName: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginBottom: 14,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  summaryValueSmall: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
    textAlign: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
  },
  summaryDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  quizCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quizCountText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    marginTop: 4,
  },

  // Progress cards
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  progressSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  progressPct: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  barBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },

  // History items
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyLeft: {
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 3,
  },
  historyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  historyScore: {
    fontSize: 13,
    fontWeight: '700',
  },
  pctBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pctText: {
    fontSize: 12,
    fontWeight: '700',
  },
  noHistoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 30,
    alignItems: 'center',
    gap: 10,
  },
  noHistoryText: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
