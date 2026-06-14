import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';

export default function LoginScreen({ onLogin, lang, setLang, onBack }) {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Back Button */}
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={16} color="#6B7280" />
              <Text style={styles.backText}>役割選択に戻る</Text>
            </TouchableOpacity>
          )}
          {/* Language Switch */}
          <View style={styles.langRow}>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'ja' && styles.langBtnActive]}
              onPress={() => setLang('ja')}
            >
              <Text style={[styles.langText, lang === 'ja' && styles.langTextActive]}>
                🇯🇵 日本語
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
              onPress={() => setLang('en')}
            >
              <Text style={[styles.langText, lang === 'en' && styles.langTextActive]}>
                🇺🇸 English
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoIcon}>
              <Ionicons name="business" size={48} color={theme.colors.primary} />
            </View>
            <Text style={styles.appTitle}>{t(lang, 'app_title')}</Text>
            <Text style={styles.appSubtitle}>{t(lang, 'app_subtitle')}</Text>
          </View>

          {/* Form */}
          <View style={styles.card}>
            <Text style={styles.formTitle}>{t(lang, 'login')}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t(lang, 'company_name')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="business-outline" size={18} color={theme.colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t(lang, 'company_name')}
                  placeholderTextColor={theme.colors.textLight}
                  value={companyName}
                  onChangeText={setCompanyName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t(lang, 'email')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={theme.colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="example@company.com"
                  placeholderTextColor={theme.colors.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t(lang, 'password')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={theme.colors.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.textLight}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={18}
                    color={theme.colors.textLight}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
              <Text style={styles.loginBtnText}>{t(lang, 'login')}</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
    gap: 4,
  },
  backText: {
    fontSize: 13,
    color: '#6B7280',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  langBtnActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#EFF6FF',
  },
  langText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  langTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  logoIcon: {
    width: 88,
    height: 88,
    borderRadius: theme.radius.lg,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  appTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 6,
  },
  appSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  formTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  eyeBtn: {
    padding: 4,
  },
  loginBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: theme.spacing.sm,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
});
