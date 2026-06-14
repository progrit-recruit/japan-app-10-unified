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
import { requestsHistory, employees } from '../data/mockData';

function StatusBadge({ status, lang }) {
  const configs = {
    pending: { color: theme.colors.warning, bg: '#FEF3C7', label: t(lang, 'status_pending') },
    in_review: { color: theme.colors.primary, bg: '#EFF6FF', label: t(lang, 'status_in_review') },
    completed: { color: theme.colors.secondary, bg: '#ECFDF5', label: t(lang, 'status_completed') },
  };
  const cfg = configs[status] || configs.pending;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

export default function DashboardScreen({ lang, navigate }) {
  const pending = requestsHistory.filter((r) => r.status === 'pending').length;
  const inReview = requestsHistory.filter((r) => r.status === 'in_review').length;
  const completed = requestsHistory.filter((r) => r.status === 'completed').length;

  const getEmployee = (id) => employees.find((e) => e.id === id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>{t(lang, 'welcome')}</Text>
          <Text style={styles.headerTitle}>株式会社サンプル製造</Text>
        </View>
        <View style={styles.avatarBox}>
          <Ionicons name="person-circle-outline" size={40} color={theme.colors.primary} />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: theme.colors.warning }]}>
          <Text style={styles.statNum}>{pending}</Text>
          <Text style={styles.statLabel}>{t(lang, 'status_pending')}</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: theme.colors.primary }]}>
          <Text style={styles.statNum}>{inReview}</Text>
          <Text style={styles.statLabel}>{t(lang, 'status_in_review')}</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: theme.colors.secondary }]}>
          <Text style={styles.statNum}>{completed}</Text>
          <Text style={styles.statLabel}>{t(lang, 'completed_count')}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>{t(lang, 'quick_actions')}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigate('NewRequest')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="add-circle-outline" size={26} color={theme.colors.primary} />
          </View>
          <Text style={styles.actionText}>{t(lang, 'create_new_request')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <View style={[styles.actionIcon, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="person-add-outline" size={26} color={theme.colors.secondary} />
          </View>
          <Text style={styles.actionText}>{t(lang, 'add_employee')}</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Requests */}
      <Text style={styles.sectionTitle}>{t(lang, 'recent_requests')}</Text>
      {requestsHistory.map((req) => {
        const emp = getEmployee(req.employeeId);
        return (
          <TouchableOpacity
            key={req.id}
            style={styles.requestCard}
            onPress={() => navigate('RequestDetail', req)}
          >
            <View style={styles.requestLeft}>
              <Text style={styles.empNationality}>{emp?.nationality}</Text>
              <View style={styles.requestInfo}>
                <Text style={styles.empName}>{emp?.name}</Text>
                <Text style={styles.reqCategory}>{req.category}</Text>
                <Text style={styles.reqDate}>{req.submittedDate}</Text>
              </View>
            </View>
            <View style={styles.requestRight}>
              <StatusBadge status={req.status} lang={lang} />
              <Ionicons name="chevron-forward" size={16} color={theme.colors.textLight} style={{ marginTop: 6 }} />
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Study Overview Card */}
      <View style={styles.studyCard}>
        <Text style={styles.studyCardTitle}>📚 学習状況サマリー</Text>
        <View style={styles.studyStatsRow}>
          <View style={styles.studyStatItem}>
            <Text style={[styles.studyStatNum, { color: '#1E40AF' }]}>5名</Text>
            <Text style={styles.studyStatLabel}>学習中</Text>
          </View>
          <View style={styles.studyStatItem}>
            <Text style={[styles.studyStatNum, { color: '#059669' }]}>83%</Text>
            <Text style={styles.studyStatLabel}>平均正解率</Text>
          </View>
          <View style={styles.studyStatItem}>
            <Text style={[styles.studyStatNum, { color: '#F59E0B' }]}>3/6語</Text>
            <Text style={styles.studyStatLabel}>課題平均</Text>
          </View>
        </View>
        <View style={styles.studyTopLearner}>
          <Text style={styles.studyTopLabel}>🏆 今週の学習トップ</Text>
          <TouchableOpacity
            style={styles.topLearnerRow}
            onPress={() => navigate('EmployeeList')}
          >
            <Text style={{ fontSize: 18 }}>🇨🇳</Text>
            <Text style={styles.topLearnerName}>Wang Fang</Text>
            <Text style={styles.topLearnerScore}>87% · 7日継続</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerSub: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  statNum: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  requestCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  requestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  empNationality: {
    fontSize: 28,
  },
  requestInfo: {
    flex: 1,
  },
  empName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  reqCategory: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  reqDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  requestRight: {
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
  studyCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  studyCardTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  studyStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  studyStatItem: {
    alignItems: 'center',
  },
  studyStatNum: {
    fontSize: 24,
    fontWeight: '800',
  },
  studyStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  studyTopLearner: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  studyTopLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  topLearnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topLearnerName: {
    flex: 1,
    color: '#111827',
    fontSize: theme.fontSize.md,
    fontWeight: '500',
  },
  topLearnerScore: {
    color: '#059669',
    fontWeight: '700',
    fontSize: theme.fontSize.sm,
  },
});
