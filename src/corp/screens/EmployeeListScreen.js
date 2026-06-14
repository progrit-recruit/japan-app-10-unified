import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';
import { employees, employeeStudyProgress } from '../data/mockData';

export default function EmployeeListScreen({ lang, navigate }) {
  const renderItem = ({ item: emp }) => {
    const progress = employeeStudyProgress.find((p) => p.employeeId === emp.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate('EmployeeDetail', emp)}
      >
        <Text style={styles.flag}>{emp.nationality}</Text>
        <View style={styles.cardInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.empName}>{emp.name}</Text>
            {progress ? (
              <View style={styles.progressBadge}>
                <Text style={styles.progressBadgeText}>📚 {progress.overallRate}%</Text>
              </View>
            ) : (
              <View style={styles.noProgressBadge}>
                <Text style={styles.noProgressBadgeText}>📚 {t(lang, 'not_started')}</Text>
              </View>
            )}
          </View>
          <Text style={styles.empMeta}>{emp.department} · {emp.visaType}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textLight} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t(lang, 'manage_employees')}</Text>
      </View>

      <FlatList
        data={employees}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={48} color={theme.colors.border} />
            <Text style={styles.emptyText}>従業員がいません</Text>
          </View>
        }
      />
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
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  listContent: {
    padding: theme.spacing.md,
    gap: 10,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  flag: {
    fontSize: 32,
  },
  cardInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  empName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  empMeta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  progressBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  progressBadgeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  noProgressBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  noProgressBadgeText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    color: theme.colors.textLight,
    fontSize: theme.fontSize.md,
  },
});
