import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { vocabularyData } from '../data/mockData';

const menuItems = [
  {
    key: 'vocab',
    screen: 'Vocab',
    icon: 'book-outline',
    color: colors.primary,
    titleKey: 'vocabulary',
    descKey: 'daily_words',
  },
  {
    key: 'quiz',
    screen: 'Quiz',
    icon: 'help-circle-outline',
    color: '#8B5CF6',
    titleKey: 'quiz',
    descKey: 'quiz',
  },
  {
    key: 'ai',
    screen: 'AIConversation',
    icon: 'chatbubbles-outline',
    color: colors.secondary,
    titleKey: 'conversation',
    descKey: 'chat_with_ai',
  },
];

export default function StudyScreen({ lang, jobType, navigate, progressData }) {
  const vocabList = vocabularyData[jobType] || vocabularyData.other;
  const totalWords = vocabList.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="school-outline" size={28} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{t(lang, 'study')}</Text>
      </View>

      <View style={styles.body}>
        {/* Stats Bar */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalWords}</Text>
            <Text style={styles.statLabel}>{t(lang, 'vocabulary')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>{t(lang, 'quiz')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>AI</Text>
            <Text style={styles.statLabel}>{t(lang, 'conversation')}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>{t(lang, 'study_home')}</Text>

        {/* Progress Card */}
        <TouchableOpacity
          onPress={() => navigate('Progress')}
          style={{ backgroundColor: '#F0FDF4', borderRadius: 14, padding: 18, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#BBF7D0' }}
          activeOpacity={0.75}
        >
          <View style={{ backgroundColor: '#059669', padding: 10, borderRadius: 10, marginRight: 14 }}>
            <Ionicons name="bar-chart-outline" size={26} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#111827', fontSize: 17, fontWeight: 'bold' }}>学習進捗</Text>
            <Text style={{ color: '#6B7280', fontSize: 13, marginTop: 3 }}>
              {progressData
                ? `継続${progressData.studyStreak}日 · 正解率${Math.round(progressData.totalCorrect / progressData.totalQuestions * 100)}%`
                : '進捗を確認する'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Company Assignment Card */}
        <TouchableOpacity
          style={[styles.menuCard, styles.companyCard]}
          onPress={() => navigate('CompanyVocab')}
          activeOpacity={0.75}
        >
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="business-outline" size={30} color="#FFFFFF" />
          </View>
          <View style={styles.menuText}>
            <Text style={[styles.menuTitle, { color: '#FFFFFF' }]}>{t(lang, 'company_assignment')}</Text>
            <Text style={[styles.menuDesc, { color: 'rgba(255,255,255,0.75)' }]}>
              会社が登録した6語 · フラッシュカード&クイズ
            </Text>
          </View>
          <View style={[styles.arrowCircle, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuCard}
            onPress={() => navigate(item.screen)}
            activeOpacity={0.75}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
              <Ionicons name={item.icon} size={30} color={item.color} />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{t(lang, item.titleKey)}</Text>
              <Text style={styles.menuDesc}>{t(lang, item.descKey)}</Text>
            </View>
            <View style={[styles.arrowCircle, { backgroundColor: item.color }]}>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingBottom: 24,
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
  body: {
    padding: 16,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  companyCard: {
    backgroundColor: '#1E40AF',
    shadowColor: '#1E40AF',
    shadowOpacity: 0.3,
  },
  menuIcon: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 13,
    color: colors.textLight,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
