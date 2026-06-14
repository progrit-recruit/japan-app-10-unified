import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';

const nationalities = ['ベトナム', '中国', '韓国', 'フィリピン', 'ブラジル', 'インドネシア', 'ネパール', 'その他'];
const visaTypes = ['技能実習', '特定技能', '技術・人文知識・国際業務', '永住者', '定住者', '留学', 'その他'];
const requestTypes = ['visa_renewal', 'work_permit', 'other_request'];

export default function NewRequestScreen({ lang, goBack }) {
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [visaType, setVisaType] = useState('');
  const [requestType, setRequestType] = useState('');
  const [detail, setDetail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNationalityPicker, setShowNationalityPicker] = useState(false);
  const [showVisaPicker, setShowVisaPicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const handleSend = () => {
    if (!name || !detail) return;
    setShowSuccess(true);
  };

  const SelectField = ({ label, value, placeholder, onPress }) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selectField} onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'new_request')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>{t(lang, 'your_name')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t(lang, 'your_name')}
            placeholderTextColor={colors.textLight}
          />
        </View>

        {/* Nationality */}
        <SelectField
          label={t(lang, 'nationality')}
          value={nationality}
          placeholder={t(lang, 'nationality')}
          onPress={() => setShowNationalityPicker(true)}
        />

        {/* Visa Type */}
        <SelectField
          label={t(lang, 'visa_type')}
          value={visaType}
          placeholder={t(lang, 'visa_type')}
          onPress={() => setShowVisaPicker(true)}
        />

        {/* Request Type */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>{t(lang, 'request_type')}</Text>
          <View style={styles.typeRow}>
            {requestTypes.map((rt) => (
              <TouchableOpacity
                key={rt}
                style={[
                  styles.typeChip,
                  requestType === rt && styles.typeChipActive,
                ]}
                onPress={() => setRequestType(rt)}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    requestType === rt && styles.typeChipTextActive,
                  ]}
                >
                  {t(lang, rt)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Detail */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>{t(lang, 'request_detail')}</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={detail}
            onChangeText={setDetail}
            placeholder={t(lang, 'request_detail')}
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity
          style={[styles.sendBtn, (!name || !detail) && styles.sendBtnDisabled]}
          onPress={handleSend}
          activeOpacity={0.8}
        >
          <Ionicons name="send-outline" size={20} color="#FFFFFF" />
          <Text style={styles.sendBtnText}>{t(lang, 'send')}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Nationality Picker Modal */}
      <Modal visible={showNationalityPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{t(lang, 'nationality')}</Text>
            {nationalities.map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.modalItem}
                onPress={() => { setNationality(n); setShowNationalityPicker(false); }}
              >
                <Text style={styles.modalItemText}>{n}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowNationalityPicker(false)}>
              <Text style={styles.modalCancelText}>{t(lang, 'close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Visa Picker Modal */}
      <Modal visible={showVisaPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{t(lang, 'visa_type')}</Text>
            {visaTypes.map((v) => (
              <TouchableOpacity
                key={v}
                style={styles.modalItem}
                onPress={() => { setVisaType(v); setShowVisaPicker(false); }}
              >
                <Text style={styles.modalItemText}>{v}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowVisaPicker(false)}>
              <Text style={styles.modalCancelText}>{t(lang, 'close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color={colors.secondary} />
            </View>
            <Text style={styles.successTitle}>{t(lang, 'sent_successfully')}</Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => { setShowSuccess(false); goBack(); }}
            >
              <Text style={styles.successBtnText}>{t(lang, 'close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  body: {
    flex: 1,
    padding: 16,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: colors.text,
  },
  textarea: {
    minHeight: 120,
    paddingTop: 12,
  },
  selectField: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 15,
    color: colors.text,
  },
  placeholder: {
    color: colors.textLight,
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  typeChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '12',
  },
  typeChipText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  typeChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendBtnDisabled: {
    backgroundColor: colors.textLight,
    shadowOpacity: 0,
  },
  sendBtnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalItemText: {
    fontSize: 16,
    color: colors.text,
  },
  modalCancel: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: '600',
  },
  successModal: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 30,
    margin: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  successBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  successBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
