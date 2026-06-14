import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';

import DashboardScreen from './DashboardScreen';
import RequestListScreen from './RequestListScreen';
import NewRequestScreen from './NewRequestScreen';
import RequestDetailScreen from './RequestDetailScreen';
import WorkplaceManagementScreen from './WorkplaceManagementScreen';
import WorkplaceEditScreen from './WorkplaceEditScreen';
import SettingsScreen from './SettingsScreen';
import CustomVocabScreen from './CustomVocabScreen';
import EmployeeListScreen from './EmployeeListScreen';
import EmployeeDetailScreen from './EmployeeDetailScreen';
import StudyProgressScreen from './StudyProgressScreen';

const TABS = [
  { key: 'dashboard', icon: 'grid-outline' },
  { key: 'gyosei_request', icon: 'document-text-outline' },
  { key: 'workplace_mgmt', icon: 'bar-chart-outline' },
  { key: 'settings', icon: 'settings-outline' },
];

export default function MainApp({ lang, setLang, onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [screenParams, setScreenParams] = useState(null);
  const [screenHistory, setScreenHistory] = useState([]);

  const navigate = (screen, params) => {
    setScreenHistory((prev) => [
      ...prev,
      { screen: currentScreen, params: screenParams, tab: currentTab },
    ]);
    setCurrentScreen(screen);
    setScreenParams(params || null);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((h) => h.slice(0, -1));
      setCurrentScreen(prev.screen);
      setScreenParams(prev.params);
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

  const renderScreen = () => {
    if (currentScreen === 'NewRequest') {
      return <NewRequestScreen lang={lang} goBack={goBack} />;
    }
    if (currentScreen === 'RequestDetail') {
      return <RequestDetailScreen lang={lang} request={screenParams} goBack={goBack} />;
    }
    if (currentScreen === 'WorkplaceEdit') {
      return <WorkplaceEditScreen lang={lang} goBack={goBack} />;
    }
    if (currentScreen === 'CustomVocab') {
      return <CustomVocabScreen lang={lang} goBack={goBack} />;
    }
    if (currentScreen === 'EmployeeList') {
      return <EmployeeListScreen lang={lang} navigate={navigate} />;
    }
    if (currentScreen === 'EmployeeDetail') {
      return <EmployeeDetailScreen lang={lang} employee={screenParams} navigate={navigate} goBack={goBack} />;
    }
    if (currentScreen === 'StudyProgress') {
      return <StudyProgressScreen lang={lang} employeeProgress={screenParams?.employeeProgress} goBack={goBack} />;
    }

    if (currentTab === 'dashboard') {
      return <DashboardScreen lang={lang} navigate={navigate} />;
    }
    if (currentTab === 'gyosei_request') {
      return <RequestListScreen lang={lang} navigate={navigate} />;
    }
    if (currentTab === 'workplace_mgmt') {
      return <WorkplaceManagementScreen lang={lang} navigate={navigate} />;
    }
    if (currentTab === 'settings') {
      return <SettingsScreen lang={lang} setLang={setLang} onLogout={onLogout} />;
    }
    return null;
  };

  const isModal = currentScreen !== null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      {!isModal && (
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const active = currentTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => switchTab(tab.key)}
              >
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={active ? theme.colors.primary : theme.colors.textLight}
                />
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {t(lang, tab.key)}
                </Text>
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
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    color: theme.colors.textLight,
  },
  tabLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
