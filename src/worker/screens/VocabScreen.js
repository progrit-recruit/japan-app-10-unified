import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { vocabularyData } from '../data/mockData';

export default function VocabScreen({ lang, jobType, goBack }) {
  const [flipped, setFlipped] = useState({});
  const vocabList = vocabularyData[jobType] || vocabularyData.other;

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getTranslation = (word) => {
    const key = lang === 'ja' ? 'en' : lang;
    return word[key] || word.en;
  };

  const renderItem = ({ item }) => {
    const isFlipped = flipped[item.id];
    return (
      <TouchableOpacity
        style={[styles.card, isFlipped && styles.cardFlipped]}
        onPress={() => toggleFlip(item.id)}
        activeOpacity={0.85}
      >
        {!isFlipped ? (
          <View style={styles.cardFront}>
            <Text style={styles.wordJa}>{item.ja}</Text>
            <Text style={styles.wordReading}>（{item.reading}）</Text>
            <View style={styles.tapHint}>
              <Ionicons name="refresh-outline" size={14} color={colors.textLight} />
              <Text style={styles.tapHintText}>タップで翻訳</Text>
            </View>
          </View>
        ) : (
          <View style={styles.cardBack}>
            <Text style={styles.wordTranslation}>{getTranslation(item)}</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>例文</Text>
              <Text style={styles.exampleText}>{item.example}</Text>
            </View>
            <View style={styles.tapHint}>
              <Ionicons name="refresh-outline" size={14} color="rgba(255,255,255,0.7)" />
              <Text style={[styles.tapHintText, { color: 'rgba(255,255,255,0.7)' }]}>タップで戻る</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'vocabulary')}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{vocabList.length}</Text>
        </View>
      </View>

      <FlatList
        data={vocabList}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 16,
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
  countBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  grid: {
    padding: 10,
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    margin: 6,
    minHeight: 160,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    justifyContent: 'center',
  },
  cardFlipped: {
    backgroundColor: colors.primary,
  },
  cardFront: {
    alignItems: 'center',
  },
  cardBack: {
    alignItems: 'center',
  },
  wordJa: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  wordReading: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 12,
    textAlign: 'center',
  },
  wordTranslation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  exampleBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    width: '100%',
  },
  exampleLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tapHintText: {
    fontSize: 11,
    color: colors.textLight,
  },
});
