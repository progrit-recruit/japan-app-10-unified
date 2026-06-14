import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';
import { employeeStudyProgress } from '../data/mockData';

export default function EmployeeDetailScreen({ lang, employee, navigate, goBack }) {
  const progress = employeeStudyProgress.find((p) => p.employeeId === employee.id);

  const companyPct = progress && progress.companyVocabTotal > 0
    ? Math.round((progress.companyVocabMastered / progress.companyVocabTotal) * 100)
    : 0;
  const jobPct = progress && progress.jobVocabTotal > 0
    ? Math.round((progress.jobVocabMastered / progress.jobVocabTotal) * 100)
    : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{employee.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Employee Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.avatarRow}>
            <Text style={styles.flag}>{employee.nationality}</Text>
            <View style={styles.nameBlock}>
              <Text style={styles.empName}>{employee.name}</Text>
              <Text style={styles.empMeta}>{employee.department} · {employee.visaType}</Text>
            </View>
          </View>
        </View>

        {/* Study Progress Section */}
        <Text style={styles.sectionTitle}>📚 日本語学習進捗</Text>

        {progress ? (
          <View style={styles.progressCard}>
            {/* Rate & Streak badges */}
            <View style={styles.badgeRow}>
              <View style={styles.rateBadge}>
                <Text style={styles.rateBadgeText}>📊 {progress.overallRate}%</Text>
              </View>
              <View style={styles.streakBadge}>
                <Text style={styles.streakBadgeText}>🔥 {progress.studyStreak}{t(lang, 'days')}継続</Text>
              </View>
            </View>

            {/* Company Vocab Progress */}
            <View style={styles.progressItem}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>会社からの課題</Text>
                <Text style={styles.progressCount}>{progress.companyVocabMastered}/{progress.companyVocabTotal}語</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${companyPct}%`, backgroundColor: '#1E40AF' }]} />
              </View>
            </View>

            {/* Job Vocab Progress */}
            <View style={styles.progressItem}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>職種別単語</Text>
                <Text style={styles.progressCount}>{progress.jobVocabMastered}/{progress.jobVocabTotal}語</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${jobPct}%`, backgroundColor: '#059669' }]} />
              </View>
            </View>

            {/* Detail Button */}
            <TouchableOpacity
              style={styles.detailBtn}
              onPress={() => navigate('StudyProgress', { employeeProgress: progress })}
            >
              <Ionicons name="bar-chart-outline" size={16} color="#fff" />
              <Text style={styles.detailBtnText}>{t(lang, 'view_progress')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noProgressCard}>
            <Text style={styles.noProgressText}>まだ学習履歴がありません</Text>
          </View>
        )}
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
  content: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  flag: {
    fontSize: 40,
  },
  nameBlock: {
    flex: 1,
  },
  empName: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  empMeta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 10,
  },
  progressCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  rateBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  rateBadgeText: {
    fontSize: theme.fontSize.sm,
    color: '#1E40AF',
    fontWeight: '700',
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  streakBadgeText: {
    fontSize: theme.fontSize.sm,
    color: '#D97706',
    fontWeight: '700',
  },
  progressItem: {
    marginBottom: 12,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
  },
  progressFill: {
    height: 10,
    borderRadius: 5,
  },
  detailBtn: {
    backgroundColor: '#1E40AF',
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    marginTop: 4,
  },
  detailBtnText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  noProgressCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  noProgressText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
});
