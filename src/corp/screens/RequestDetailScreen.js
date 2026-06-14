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
import { employees } from '../data/mockData';

const STATUS_STEPS = [
  { key: 'pending', icon: 'send-outline', label_key: 'submitted' },
  { key: 'in_review', icon: 'search-outline', label_key: 'status_in_review' },
  { key: 'completed', icon: 'checkmark-circle-outline', label_key: 'status_completed' },
];

function getStatusIndex(status) {
  if (status === 'pending') return 0;
  if (status === 'in_review') return 1;
  if (status === 'completed') return 2;
  return 0;
}

export default function RequestDetailScreen({ lang, request, goBack }) {
  if (!request) return null;
  const emp = employees.find((e) => e.id === request.employeeId);
  const statusIdx = getStatusIndex(request.status);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'request_detail_title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Employee Card */}
        <View style={styles.empCard}>
          <Text style={styles.empNationality}>{emp?.nationality}</Text>
          <View>
            <Text style={styles.empName}>{emp?.name}</Text>
            <Text style={styles.empMeta}>
              {emp?.department} / {emp?.visaType}
            </Text>
          </View>
        </View>

        {/* Request Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t(lang, 'request_category')}</Text>
            <Text style={styles.infoValue}>{request.category}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t(lang, 'submitted_date')}</Text>
            <Text style={styles.infoValue}>{request.submittedDate}</Text>
          </View>
          {request.note ? (
            <>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t(lang, 'note')}</Text>
                <Text style={[styles.infoValue, { flex: 2 }]}>{request.note}</Text>
              </View>
            </>
          ) : null}
        </View>

        {/* Status Timeline */}
        <Text style={styles.sectionTitle}>{t(lang, 'status_timeline')}</Text>
        <View style={styles.timelineCard}>
          {STATUS_STEPS.map((step, idx) => {
            const isDone = idx <= statusIdx;
            const isCurrent = idx === statusIdx;
            return (
              <View key={step.key} style={styles.timelineStep}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      isDone && styles.timelineDotDone,
                      isCurrent && styles.timelineDotCurrent,
                    ]}
                  >
                    <Ionicons
                      name={step.icon}
                      size={16}
                      color={isDone ? '#fff' : theme.colors.textLight}
                    />
                  </View>
                  {idx < STATUS_STEPS.length - 1 && (
                    <View style={[styles.timelineLine, isDone && styles.timelineLineDone]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineLabel,
                      isCurrent && styles.timelineLabelCurrent,
                    ]}
                  >
                    {t(lang, step.label_key)}
                  </Text>
                  {isCurrent && (
                    <Text style={styles.timelineCurrentNote}>現在のステータス</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Gyosei Comment */}
        <Text style={styles.sectionTitle}>{t(lang, 'gyosei_comment')}</Text>
        <View style={styles.commentCard}>
          <View style={styles.commentHeader}>
            <View style={styles.commentAvatar}>
              <Ionicons name="person" size={16} color={theme.colors.primary} />
            </View>
            <Text style={styles.commentAuthor}>行政書士</Text>
          </View>
          <Text style={styles.commentText}>
            {request.gyoseiComment || t(lang, 'no_comment')}
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadBtn}>
          <Ionicons name="cloud-upload-outline" size={20} color={theme.colors.primary} />
          <Text style={styles.uploadBtnText}>{t(lang, 'upload_documents')}</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  empCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  empNationality: {
    fontSize: 36,
  },
  empName: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: '#fff',
  },
  empMeta: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 3,
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  infoLabel: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  infoValue: {
    flex: 2,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 12,
  },
  timelineCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timelineStep: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineLeft: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotDone: {
    backgroundColor: theme.colors.secondary,
  },
  timelineDotCurrent: {
    backgroundColor: theme.colors.primary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 4,
    minHeight: 24,
  },
  timelineLineDone: {
    backgroundColor: theme.colors.secondary,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 16,
  },
  timelineLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  timelineLabelCurrent: {
    color: theme.colors.text,
  },
  timelineCurrentNote: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    marginTop: 4,
  },
  commentCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAuthor: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  commentText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 22,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    borderStyle: 'dashed',
    paddingVertical: 16,
  },
  uploadBtnText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
});
