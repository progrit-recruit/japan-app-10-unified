import React, { useState } from 'react';
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

const FILTERS = [
  { key: 'all', label_key: 'all' },
  { key: 'pending', label_key: 'status_pending' },
  { key: 'in_review', label_key: 'status_in_review' },
  { key: 'completed', label_key: 'status_completed' },
];

export default function RequestListScreen({ lang, navigate }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const getEmployee = (id) => employees.find((e) => e.id === id);

  const filtered =
    activeFilter === 'all'
      ? requestsHistory
      : requestsHistory.filter((r) => r.status === activeFilter);

  const renderItem = ({ item }) => {
    const emp = getEmployee(item.employeeId);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate('RequestDetail', item)}
      >
        <View style={styles.cardTop}>
          <Text style={styles.nationality}>{emp?.nationality}</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.empName}>{emp?.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          <StatusBadge status={item.status} lang={lang} />
        </View>
        {item.note ? (
          <View style={styles.noteRow}>
            <Ionicons name="information-circle-outline" size={14} color={theme.colors.textLight} />
            <Text style={styles.noteText}>{item.note}</Text>
          </View>
        ) : null}
        <Text style={styles.dateText}>{item.submittedDate}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t(lang, 'gyosei_request')}</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, activeFilter === f.key && styles.filterBtnActive]}
            onPress={() => setActiveFilter(f.key)}
          >
            <Text
              style={[styles.filterText, activeFilter === f.key && styles.filterTextActive]}
            >
              {t(lang, f.label_key)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="document-outline" size={48} color={theme.colors.border} />
            <Text style={styles.emptyText}>依頼がありません</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigate('NewRequest')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
  filterRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background,
  },
  filterBtnActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: 80,
    gap: 10,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nationality: {
    fontSize: 26,
  },
  cardInfo: {
    flex: 1,
  },
  empName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  category: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  noteText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  dateText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 6,
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
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    color: theme.colors.textLight,
    fontSize: theme.fontSize.md,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
