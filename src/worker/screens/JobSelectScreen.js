import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { jobTypes } from '../data/mockData';
import { t } from '../i18n';

const jobKeyMap = {
  care: 'job_care',
  manufacturing: 'job_manufacturing',
  construction: 'job_construction',
  agriculture: 'job_agriculture',
  food_service: 'job_food_service',
  retail: 'job_retail',
  it: 'job_it',
  other: 'job_other',
};

export default function JobSelectScreen({ lang, onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(lang, 'select_job')}</Text>
        <Text style={styles.sub}>Select your job type</Text>
      </View>

      <FlatList
        data={jobTypes}
        keyExtractor={(item) => item.code}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderTopColor: item.color }]}
            onPress={() => onSelect(item.code)}
            activeOpacity={0.75}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon + '-outline'} size={32} color={item.color} />
            </View>
            <Text style={styles.cardLabel}>{t(lang, jobKeyMap[item.code])}</Text>
          </TouchableOpacity>
        )}
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
  grid: {
    padding: 12,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
