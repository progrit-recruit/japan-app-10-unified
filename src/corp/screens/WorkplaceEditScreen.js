import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';
import { workplaceProfile } from '../data/mockData';

const WORKPLACE_TYPES = ['製造業', 'IT・情報通信', '飲食業', '建設業', '農業', 'その他'];
const AVAILABLE_LANGUAGES = [
  '🇻🇳 ベトナム語',
  '🇨🇳 中国語',
  '🇰🇷 韓国語',
  '🇧🇷 ポルトガル語',
  '🇳🇵 ネパール語',
  '🇬🇧 英語',
];

export default function WorkplaceEditScreen({ lang, goBack }) {
  const wp = workplaceProfile;

  const [name, setName] = useState(wp.name);
  const [type, setType] = useState(wp.type);
  const [atmosphere, setAtmosphere] = useState(wp.atmosphere);
  const [photos, setPhotos] = useState([...wp.photos]);
  const [pros, setPros] = useState([...wp.pros]);
  const [cons, setCons] = useState([...wp.cons]);
  const [openPositions, setOpenPositions] = useState(String(wp.openPositions));
  const [acceptLanguages, setAcceptLanguages] = useState([...wp.acceptLanguages]);
  const [showToast, setShowToast] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      goBack();
    }, 2000);
  };

  const toggleLanguage = (langItem) => {
    setAcceptLanguages((prev) =>
      prev.includes(langItem) ? prev.filter((l) => l !== langItem) : [...prev, langItem]
    );
  };

  const updatePro = (idx, val) => {
    const arr = [...pros];
    arr[idx] = val;
    setPros(arr);
  };

  const addPro = () => {
    if (pros.length < 5) setPros([...pros, '']);
  };

  const removePro = (idx) => setPros(pros.filter((_, i) => i !== idx));

  const updateCon = (idx, val) => {
    const arr = [...cons];
    arr[idx] = val;
    setCons(arr);
  };

  const addCon = () => {
    if (cons.length < 3) setCons([...cons, '']);
  };

  const removeCon = (idx) => setCons(cons.filter((_, i) => i !== idx));

  const updatePhoto = (idx, val) => {
    const arr = [...photos];
    arr[idx] = val;
    setPhotos(arr);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'workplace_edit')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Workplace Name */}
        <View style={styles.field}>
          <Text style={styles.label}>{t(lang, 'workplace_name')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t(lang, 'workplace_name')}
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        {/* Workplace Type */}
        <View style={styles.field}>
          <Text style={styles.label}>{t(lang, 'workplace_type')}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTypeDropdown(!showTypeDropdown)}
          >
            <Text style={styles.dropdownText}>{type}</Text>
            <Ionicons
              name={showTypeDropdown ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.textLight}
            />
          </TouchableOpacity>
          {showTypeDropdown && (
            <View style={styles.dropdownList}>
              {WORKPLACE_TYPES.map((wt) => (
                <TouchableOpacity
                  key={wt}
                  style={[styles.dropdownItem, type === wt && styles.dropdownItemSelected]}
                  onPress={() => {
                    setType(wt);
                    setShowTypeDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      type === wt && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {wt}
                  </Text>
                  {type === wt && (
                    <Ionicons name="checkmark" size={16} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Atmosphere */}
        <View style={styles.field}>
          <Text style={styles.label}>{t(lang, 'atmosphere_description')}</Text>
          <TextInput
            style={styles.textArea}
            value={atmosphere}
            onChangeText={setAtmosphere}
            multiline
            numberOfLines={4}
            placeholder="職場の雰囲気を説明してください..."
            placeholderTextColor={theme.colors.textLight}
            textAlignVertical="top"
          />
        </View>

        {/* Emoji Photos */}
        <View style={styles.field}>
          <Text style={styles.label}>{t(lang, 'emoji_photos')} (最大4つ)</Text>
          <View style={styles.photosGrid}>
            {[0, 1, 2, 3].map((idx) => (
              <View key={idx} style={styles.photoInputWrapper}>
                <TextInput
                  style={styles.photoInput}
                  value={photos[idx] || ''}
                  onChangeText={(val) => updatePhoto(idx, val)}
                  placeholder="🏭"
                  placeholderTextColor={theme.colors.textLight}
                  maxLength={2}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Pros */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.secondary }]}>
            {t(lang, 'pros')} (最大5つ)
          </Text>
          {pros.map((pro, idx) => (
            <View key={idx} style={styles.listInputRow}>
              <Ionicons name="checkmark-circle" size={18} color={theme.colors.secondary} />
              <TextInput
                style={styles.listInput}
                value={pro}
                onChangeText={(val) => updatePro(idx, val)}
                placeholder="メリットを入力..."
                placeholderTextColor={theme.colors.textLight}
              />
              <TouchableOpacity onPress={() => removePro(idx)}>
                <Ionicons name="close-circle" size={18} color={theme.colors.danger} />
              </TouchableOpacity>
            </View>
          ))}
          {pros.length < 5 && (
            <TouchableOpacity style={styles.addRowBtn} onPress={addPro}>
              <Ionicons name="add-circle-outline" size={18} color={theme.colors.secondary} />
              <Text style={[styles.addRowText, { color: theme.colors.secondary }]}>
                メリットを追加
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cons */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.warning }]}>
            {t(lang, 'cons')} (最大3つ)
          </Text>
          {cons.map((con, idx) => (
            <View key={idx} style={styles.listInputRow}>
              <Ionicons name="alert-circle" size={18} color={theme.colors.warning} />
              <TextInput
                style={styles.listInput}
                value={con}
                onChangeText={(val) => updateCon(idx, val)}
                placeholder="デメリットを入力..."
                placeholderTextColor={theme.colors.textLight}
              />
              <TouchableOpacity onPress={() => removeCon(idx)}>
                <Ionicons name="close-circle" size={18} color={theme.colors.danger} />
              </TouchableOpacity>
            </View>
          ))}
          {cons.length < 3 && (
            <TouchableOpacity style={styles.addRowBtn} onPress={addCon}>
              <Ionicons name="add-circle-outline" size={18} color={theme.colors.warning} />
              <Text style={[styles.addRowText, { color: theme.colors.warning }]}>
                デメリットを追加
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Open Positions */}
        <View style={styles.field}>
          <Text style={styles.label}>{t(lang, 'current_openings')}</Text>
          <View style={styles.numberRow}>
            <TouchableOpacity
              style={styles.numberBtn}
              onPress={() =>
                setOpenPositions((v) => String(Math.max(0, parseInt(v || '0') - 1)))
              }
            >
              <Ionicons name="remove" size={22} color={theme.colors.text} />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              value={openPositions}
              onChangeText={setOpenPositions}
              keyboardType="number-pad"
              textAlign="center"
            />
            <TouchableOpacity
              style={styles.numberBtn}
              onPress={() =>
                setOpenPositions((v) => String(parseInt(v || '0') + 1))
              }
            >
              <Ionicons name="add" size={22} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Accept Languages */}
        <View style={styles.field}>
          <Text style={styles.label}>{t(lang, 'accept_languages')}</Text>
          {AVAILABLE_LANGUAGES.map((l) => {
            const checked = acceptLanguages.includes(l);
            return (
              <TouchableOpacity
                key={l}
                style={styles.checkboxRow}
                onPress={() => toggleLanguage(l)}
              >
                <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                  {checked && <Ionicons name="checkmark" size={13} color="#fff" />}
                </View>
                <Text style={styles.checkboxLabel}>{l}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.saveBtnText}>{t(lang, 'save')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Toast */}
      {showToast && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.toastText}>{t(lang, 'save_success')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    height: 48,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  dropdown: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  dropdownList: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemSelected: {
    backgroundColor: '#EFF6FF',
  },
  dropdownItemText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  dropdownItemTextSelected: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 12,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 100,
  },
  photosGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  photoInputWrapper: {
    flex: 1,
  },
  photoInput: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    height: 52,
    textAlign: 'center',
    fontSize: 22,
    color: theme.colors.text,
  },
  listInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    marginBottom: 8,
    height: 48,
  },
  listInput: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  addRowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  addRowText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  numberBtn: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberInput: {
    width: 80,
    height: 44,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkboxLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  toast: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  toastText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
});
