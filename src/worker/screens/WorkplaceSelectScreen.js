import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { workplaces } from '../data/mockData';
import { t } from '../i18n';

const OTHER_WORKPLACE = {
  id: 99,
  name: 'その他 / その他の職場',
  type: 'other',
  location: '未設定',
  rating: 0,
  photos: ['🏢'],
  atmosphere: '',
  pros: [],
  cons: [],
  reviews: [],
};

export default function WorkplaceSelectScreen({ lang, jobType, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = workplaces.filter((w) => w.type === jobType);
  const baseList = filtered.length > 0 ? filtered : workplaces;

  const displayList = [
    ...baseList.filter((w) =>
      w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.location.toLowerCase().includes(query.toLowerCase())
    ),
    OTHER_WORKPLACE,
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(item)}
      activeOpacity={0.75}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.emoji}>{item.photos[0]}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.type}</Text>
          </View>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={12} color={colors.textLight} /> {item.location}
          </Text>
        </View>
        {item.rating > 0 && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t(lang, 'select_workplace')}</Text>
        <Text style={styles.sub}>Select your workplace</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t(lang, 'search_workplace')}
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={displayList}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardLeft: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 28,
  },
  cardBody: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tag: {
    backgroundColor: colors.primary + '18',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  location: {
    fontSize: 12,
    color: colors.textLight,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
});
