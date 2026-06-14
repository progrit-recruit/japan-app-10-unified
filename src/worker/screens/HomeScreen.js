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
import { jobTypes, vocabularyData } from '../data/mockData';

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

export default function HomeScreen({ lang, jobType, workplace, navigate, switchTab }) {
  const jobInfo = jobTypes.find((j) => j.code === jobType) || jobTypes[7];
  const vocabList = vocabularyData[jobType] || vocabularyData.other;
  const todayWord = vocabList[0];

  const langKey = {
    ja: 'ja', zh: 'zh', vi: 'vi', ko: 'ko', pt: 'pt', ne: 'ne',
  }[lang] || 'en';

  const getTranslation = (word) => {
    return word[langKey] || word.en;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: jobInfo.color }]}>
        <View style={styles.headerInner}>
          <View>
            <Text style={styles.welcomeText}>{t(lang, 'welcome')}</Text>
            <Text style={styles.jobText}>{t(lang, jobKeyMap[jobType])}</Text>
          </View>
          <View style={styles.jobIconCircle}>
            <Ionicons name={jobInfo.icon + '-outline'} size={36} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Workplace Card */}
        {workplace && (
          <View style={styles.workplaceCard}>
            <Text style={styles.workplaceEmoji}>{workplace.photos[0]}</Text>
            <View style={styles.workplaceInfo}>
              <Text style={styles.workplaceLabel}>{t(lang, 'your_workplace')}</Text>
              <Text style={styles.workplaceName}>{workplace.name}</Text>
              {workplace.location !== '未設定' && (
                <Text style={styles.workplaceLocation}>
                  <Ionicons name="location-outline" size={12} color={colors.textLight} /> {workplace.location}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Today's Study Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'today_study')}</Text>
          <View style={styles.wordCard}>
            <View style={styles.wordTop}>
              <Text style={styles.wordJa}>{todayWord.ja}</Text>
              <Text style={styles.wordReading}>（{todayWord.reading}）</Text>
            </View>
            <Text style={styles.wordTranslation}>{getTranslation(todayWord)}</Text>
            <View style={styles.wordDivider} />
            <Text style={styles.wordExample}>{todayWord.example}</Text>
          </View>

          {/* Start Study Button */}
          <TouchableOpacity
            style={styles.studyButton}
            onPress={() => navigate('CompanyVocab')}
            activeOpacity={0.8}
          >
            <Ionicons name="school-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.studyButtonText}>{t(lang, 'start_study')}</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  jobText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  jobIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 16,
  },
  workplaceCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  workplaceEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  workplaceInfo: {
    flex: 1,
  },
  workplaceLabel: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  workplaceName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  workplaceLocation: {
    fontSize: 12,
    color: colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  wordCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 14,
  },
  wordTop: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  wordJa: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  wordReading: {
    fontSize: 14,
    color: colors.textLight,
  },
  wordTranslation: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  wordDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  wordExample: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  studyButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  studyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
