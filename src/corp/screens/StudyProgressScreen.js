import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';

function ScoreBadge({ score, total }) {
  const rate = total > 0 ? Math.round((score / total) * 100) : 0;
  let bg = '#ECFDF5';
  let color = '#059669';
  if (rate < 60) {
    bg = '#FEF2F2';
    color = '#DC2626';
  } else if (rate < 80) {
    bg = '#FEF3C7';
    color = '#D97706';
  }
  return (
    <View style={[styles.scoreBadge, { backgroundColor: bg }]}>
      <Text style={[styles.scoreBadgeText, { color }]}>{rate}%</Text>
    </View>
  );
}

export default function StudyProgressScreen({ lang, employeeProgress, goBack }) {
  if (!employeeProgress) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>学習進捗</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>データがありません</Text>
        </View>
      </View>
    );
  }

  const {
    flag,
    employeeName,
    studyStreak,
    overallRate,
    totalQuizzesTaken,
    lastStudied,
    companyVocabMastered,
    companyVocabTotal,
    jobVocabMastered,
    jobVocabTotal,
    quizHistory,
  } = employeeProgress;

  const companyPct = companyVocabTotal > 0 ? Math.round((companyVocabMastered / companyVocabTotal) * 100) : 0;
  const jobPct = jobVocabTotal > 0 ? Math.round((jobVocabMastered / jobVocabTotal) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {flag} {employeeName} の学習進捗
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>🔥</Text>
              <Text style={styles.summaryValue}>{studyStreak}{t(lang, 'days')}</Text>
              <Text style={styles.summaryLabel}>{t(lang, 'study_streak')}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>📊</Text>
              <Text style={styles.summaryValue}>{overallRate}%</Text>
              <Text style={styles.summaryLabel}>{t(lang, 'overall_rate')}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>📝</Text>
              <Text style={styles.summaryValue}>{totalQuizzesTaken}回</Text>
              <Text style={styles.summaryLabel}>クイズ回数</Text>
            </View>
          </View>
          <View style={styles.lastStudiedRow}>
            <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.7)" />
            <Text style={styles.lastStudiedText}>{t(lang, 'last_studied')}: {lastStudied}</Text>
          </View>
        </View>

        {/* Progress Bars */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'company_vocab_progress')}</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>会社からの課題</Text>
              <Text style={styles.progressCount}>{companyVocabMastered}/{companyVocabTotal}語{t(lang, 'mastered')}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${companyPct}%`, backgroundColor: '#1E40AF' }]} />
            </View>
            <Text style={styles.progressPct}>{companyPct}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'job_vocab_progress')}</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>職種別単語</Text>
              <Text style={styles.progressCount}>{jobVocabMastered}/{jobVocabTotal}語{t(lang, 'mastered')}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${jobPct}%`, backgroundColor: '#059669' }]} />
            </View>
            <Text style={styles.progressPct}>{jobPct}%</Text>
          </View>
        </View>

        {/* Quiz History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'quiz_history')}</Text>
          {quizHistory.map((item, idx) => (
            <View key={idx} style={styles.historyRow}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyLabel}>{item.label}</Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyScore}>{item.score}/{item.total}問正解</Text>
                <ScoreBadge score={item.score} total={item.total} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.textLight,
    fontSize: theme.fontSize.md,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: '#1E40AF',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  lastStudiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 10,
  },
  lastStudiedText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 10,
  },
  progressCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressCount: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: 10,
    borderRadius: 5,
  },
  progressPct: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    textAlign: 'right',
  },
  historyRow: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  historyLeft: {
    flex: 1,
  },
  historyDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  historyLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  historyScore: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
  },
  scoreBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
  },
});
