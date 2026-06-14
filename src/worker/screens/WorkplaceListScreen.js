import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { workplaces, jobTypes } from '../data/mockData';

function StarRating({ rating, size = 14 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Ionicons
          key={s}
          name={s <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color="#FBBF24"
        />
      ))}
    </View>
  );
}

const filterTabs = [
  { key: 'all', labelKey: 'all' },
  ...jobTypes.slice(0, 6).map((j) => ({ key: j.code, labelKey: 'job_' + j.code })),
];

export default function WorkplaceListScreen({ lang, jobType, navigate }) {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    return workplaces.filter((wp) => {
      const matchesFilter = activeFilter === 'all' || wp.type === activeFilter;
      const matchesSearch =
        !searchText ||
        wp.name.includes(searchText) ||
        wp.location.includes(searchText);
      return matchesFilter && matchesSearch;
    });
  }, [searchText, activeFilter]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate('WorkplaceDetail', item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardEmoji}>{item.photos[0]}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.cardMeta}>
            <Ionicons name="location-outline" size={13} color={colors.textLight} />
            <Text style={styles.cardLocation}>{item.location}</Text>
          </View>
          <View style={styles.cardRating}>
            <StarRating rating={item.rating} />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.typeTag}>
          <Text style={styles.typeTagText}>
            {t(lang, 'job_' + item.type)}
          </Text>
        </View>
        <View style={styles.prosRow}>
          {item.pros.slice(0, 2).map((pro, i) => (
            <View key={i} style={styles.proChip}>
              <Text style={styles.proChipText}>{pro}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="briefcase-outline" size={26} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{t(lang, 'workplace')}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={colors.textLight} />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder={t(lang, 'search_workplace')}
            placeholderTextColor={colors.textLight}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color={colors.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filterTabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filterTab,
              activeFilter === tab.key && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(tab.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === tab.key && styles.filterTabTextActive,
              ]}
            >
              {t(lang, tab.labelKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Result Count */}
      <View style={styles.resultBar}>
        <Text style={styles.resultCount}>{filtered.length}件</Text>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>見つかりませんでした</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: '#7C3AED',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#7C3AED',
    paddingTop: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  filterScroll: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  filterTabText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultCount: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  list: {
    padding: 12,
    paddingTop: 0,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 36,
    marginRight: 12,
    width: 48,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeTag: {
    backgroundColor: '#7C3AED18',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeTagText: {
    fontSize: 11,
    color: '#7C3AED',
    fontWeight: '600',
  },
  prosRow: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    flexWrap: 'wrap',
  },
  proChip: {
    backgroundColor: colors.secondary + '12',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  proChipText: {
    fontSize: 11,
    color: colors.secondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textLight,
  },
});
