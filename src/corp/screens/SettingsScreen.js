import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';

const COMPANY_INFO = {
  name: '株式会社サンプル製造',
  address: '愛知県名古屋市中村区名駅1-1-1',
  phone: '052-000-0000',
  email: 'hr@sample-mfg.co.jp',
  registeredDate: '2024-01-15',
};

export default function SettingsScreen({ lang, setLang, onLogout }) {
  const SettingRow = ({ icon, label, value, onPress, color }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {value ? <Text style={styles.settingValue}>{value}</Text> : null}
      </View>
      {onPress && (
        <Ionicons name="chevron-forward" size={18} color={theme.colors.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t(lang, 'settings')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Language Switch */}
        <Text style={styles.sectionTitle}>言語 / Language</Text>
        <View style={styles.card}>
          <View style={styles.langRow}>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'ja' && styles.langBtnActive]}
              onPress={() => setLang('ja')}
            >
              <Text style={styles.langFlag}>🇯🇵</Text>
              <Text style={[styles.langBtnText, lang === 'ja' && styles.langBtnTextActive]}>
                {t(lang, 'lang_ja')}
              </Text>
              {lang === 'ja' && (
                <Ionicons name="checkmark-circle" size={18} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
            <View style={styles.langDivider} />
            <TouchableOpacity
              style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
              onPress={() => setLang('en')}
            >
              <Text style={styles.langFlag}>🇺🇸</Text>
              <Text style={[styles.langBtnText, lang === 'en' && styles.langBtnTextActive]}>
                {t(lang, 'lang_en')}
              </Text>
              {lang === 'en' && (
                <Ionicons name="checkmark-circle" size={18} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Company Info */}
        <Text style={styles.sectionTitle}>{t(lang, 'company_info')}</Text>
        <View style={styles.card}>
          <View style={styles.companyHeader}>
            <View style={styles.companyAvatar}>
              <Ionicons name="business" size={32} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={styles.companyName}>{COMPANY_INFO.name}</Text>
              <Text style={styles.companyRegistered}>
                登録日: {COMPANY_INFO.registeredDate}
              </Text>
            </View>
          </View>

          <View style={styles.infoDivider} />

          <SettingRow
            icon="location-outline"
            label="所在地"
            value={COMPANY_INFO.address}
            color={theme.colors.primary}
          />
          <View style={styles.infoDivider} />
          <SettingRow
            icon="call-outline"
            label="電話番号"
            value={COMPANY_INFO.phone}
            color={theme.colors.secondary}
          />
          <View style={styles.infoDivider} />
          <SettingRow
            icon="mail-outline"
            label="メール"
            value={COMPANY_INFO.email}
            color={theme.colors.primary}
          />
        </View>

        {/* App Settings */}
        <Text style={styles.sectionTitle}>アプリ設定</Text>
        <View style={styles.card}>
          <SettingRow
            icon="notifications-outline"
            label="通知設定"
            color={theme.colors.warning}
            onPress={() => {}}
          />
          <View style={styles.infoDivider} />
          <SettingRow
            icon="shield-checkmark-outline"
            label="プライバシーポリシー"
            color={theme.colors.primary}
            onPress={() => {}}
          />
          <View style={styles.infoDivider} />
          <SettingRow
            icon="document-text-outline"
            label="利用規約"
            color={theme.colors.primary}
            onPress={() => {}}
          />
          <View style={styles.infoDivider} />
          <SettingRow
            icon="information-circle-outline"
            label="バージョン"
            value="1.0.0"
            color={theme.colors.textLight}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.danger} />
          <Text style={styles.logoutText}>{t(lang, 'logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.textLight,
    marginBottom: 8,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  langRow: {
    padding: theme.spacing.md,
    gap: 0,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: theme.radius.md,
  },
  langBtnActive: {
    backgroundColor: '#EFF6FF',
  },
  langFlag: {
    fontSize: 24,
  },
  langBtnText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  langBtnTextActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  langDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 4,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: theme.spacing.md,
  },
  companyAvatar: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.md,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
  },
  companyRegistered: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 3,
  },
  infoDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text,
  },
  settingValue: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: theme.radius.md,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.danger,
  },
});
