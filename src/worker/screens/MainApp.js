import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { initialProgressData } from '../data/mockData';

import HomeScreen from './HomeScreen';
import StudyScreen from './StudyScreen';
import ProgressScreen from './ProgressScreen';
import VocabScreen from './VocabScreen';
import QuizScreen from './QuizScreen';
import AIConversationScreen from './AIConversationScreen';
import CompanyVocabScreen from './CompanyVocabScreen';

const TABS = [
  { key: 'home', icon: 'home-outline', labelKey: 'home' },
  { key: 'study', icon: 'school-outline', labelKey: 'study' },
  { key: 'progress', icon: 'bar-chart-outline', labelKey: 'progress' },
];

export default function MainApp({ lang, jobType, workplace }) {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [screenParams, setScreenParams] = useState(null);
  const [screenHistory, setScreenHistory] = useState([]);
  const [progressData, setProgressData] = useState(initialProgressData);

  const navigate = (screen, params = null) => {
    setScreenHistory((prev) => [
      ...prev,
      { screen: currentScreen, params: screenParams },
    ]);
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setCurrentScreen(prev.screen);
      setScreenParams(prev.params);
      setScreenHistory((h) => h.slice(0, -1));
    } else {
      setCurrentScreen(null);
      setScreenParams(null);
    }
  };

  const switchTab = (tabKey) => {
    setCurrentTab(tabKey);
    setCurrentScreen(null);
    setScreenParams(null);
    setScreenHistory([]);
  };

  const onQuizComplete = (type, label, score, total) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type,
      label,
      score,
      total,
    };
    setProgressData((prev) => ({
      ...prev,
      totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      totalCorrect: prev.totalCorrect + score,
      totalQuestions: prev.totalQuestions + total,
      lastStudied: newEntry.date,
      studyStreak: prev.studyStreak + (prev.lastStudied !== newEntry.date ? 1 : 0),
      companyVocabMastered:
        type === 'company_vocab'
          ? Math.min(prev.companyVocabTotal, prev.companyVocabMastered + Math.floor(score / 2))
          : prev.companyVocabMastered,
      jobVocabMastered:
        type === 'job_vocab'
          ? Math.min(prev.jobVocabTotal, prev.jobVocabMastered + Math.floor(score / 2))
          : prev.jobVocabMastered,
      quizHistory: [newEntry, ...prev.quizHistory].slice(0, 20),
    }));
  };

  const renderContent = () => {
    if (currentScreen === 'Vocab') {
      return <VocabScreen lang={lang} jobType={jobType} goBack={goBack} />;
    }
    if (currentScreen === 'Quiz') {
      return <QuizScreen lang={lang} jobType={jobType} goBack={goBack} onQuizComplete={onQuizComplete} />;
    }
    if (currentScreen === 'AIConversation') {
      return <AIConversationScreen lang={lang} jobType={jobType} goBack={goBack} />;
    }
    if (currentScreen === 'CompanyVocab') {
      return <CompanyVocabScreen lang={lang} navigate={navigate} goBack={goBack} onQuizComplete={onQuizComplete} />;
    }

    if (currentTab === 'progress') {
      return <ProgressScreen lang={lang} progressData={progressData} goBack={null} />;
    }

    switch (currentTab) {
      case 'home':
        return (
          <HomeScreen
            lang={lang}
            jobType={jobType}
            workplace={workplace}
            navigate={navigate}
            switchTab={switchTab}
          />
        );
      case 'study':
        return (
          <StudyScreen
            lang={lang}
            jobType={jobType}
            workplace={workplace}
            navigate={navigate}
            progressData={progressData}
          />
        );
      default:
        return (
          <HomeScreen
            lang={lang}
            jobType={jobType}
            workplace={workplace}
            navigate={navigate}
            switchTab={switchTab}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      {!currentScreen && (
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const active = currentTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => switchTab(tab.key)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={active ? colors.primary : colors.textLight}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: active ? colors.primary : colors.textLight },
                  ]}
                >
                  {t(lang, tab.labelKey)}
                </Text>
                {active && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 3,
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 3,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
