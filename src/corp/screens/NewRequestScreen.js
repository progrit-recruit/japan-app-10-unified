import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import theme from '../theme';
import { employees, requestCategories } from '../data/mockData';

const URGENCY_LEVELS = [
  { key: 'normal', color: theme.colors.secondary },
  { key: 'urgent', color: theme.colors.warning },
  { key: 'emergency', color: theme.colors.danger },
];

export default function NewRequestScreen({ lang, goBack }) {
  const [step, setStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detail, setDetail] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [showSuccess, setShowSuccess] = useState(false);

  const canNext =
    (step === 1 && selectedEmployee) ||
    (step === 2 && selectedCategory) ||
    step === 3;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else goBack();
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'new_request')}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <View style={[styles.stepDot, s <= step && styles.stepDotActive]}>
              {s < step ? (
                <Ionicons name="checkmark" size={14} color="#fff" />
              ) : (
                <Text style={[styles.stepNum, s <= step && styles.stepNumActive]}>{s}</Text>
              )}
            </View>
            {s < 3 && (
              <View style={[styles.stepLine, s < step && styles.stepLineActive]} />
            )}
          </React.Fragment>
        ))}
      </View>
      <Text style={styles.stepLabel}>
        {t(lang, 'step')} {step} {t(lang, 'of')} 3
      </Text>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Step 1: Select Employee */}
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>{t(lang, 'select_employee')}</Text>
            {employees.map((emp) => (
              <TouchableOpacity
                key={emp.id}
                style={[
                  styles.employeeCard,
                  selectedEmployee?.id === emp.id && styles.employeeCardSelected,
                ]}
                onPress={() => setSelectedEmployee(emp)}
              >
                <Text style={styles.empNationality}>{emp.nationality}</Text>
                <View style={styles.empDetails}>
                  <Text style={styles.empName}>{emp.name}</Text>
                  <Text style={styles.empMeta}>
                    {emp.department} / {emp.visaType}
                  </Text>
                </View>
                {selectedEmployee?.id === emp.id && (
                  <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 2: Request Content */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>{t(lang, 'request_content')}</Text>

            <Text style={styles.fieldLabel}>{t(lang, 'request_category')}</Text>
            {requestCategories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryItem,
                  selectedCategory === cat && styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextSelected,
                  ]}
                >
                  {cat}
                </Text>
                {selectedCategory === cat && (
                  <Ionicons name="checkmark-circle" size={18} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}

            <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
              {t(lang, 'request_detail')}
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={5}
              placeholder="詳細を入力してください..."
              placeholderTextColor={theme.colors.textLight}
              value={detail}
              onChangeText={setDetail}
              textAlignVertical="top"
            />

            <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
              {t(lang, 'urgency')}
            </Text>
            <View style={styles.urgencyRow}>
              {URGENCY_LEVELS.map((u) => (
                <TouchableOpacity
                  key={u.key}
                  style={[
                    styles.urgencyBtn,
                    urgency === u.key && { borderColor: u.color, backgroundColor: u.color + '15' },
                  ]}
                  onPress={() => setUrgency(u.key)}
                >
                  <Text
                    style={[
                      styles.urgencyText,
                      urgency === u.key && { color: u.color, fontWeight: '700' },
                    ]}
                  >
                    {t(lang, u.key)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>{t(lang, 'confirm')}</Text>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t(lang, 'employee_name')}</Text>
                <Text style={styles.summaryValue}>
                  {selectedEmployee?.nationality} {selectedEmployee?.name}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t(lang, 'visa_type')}</Text>
                <Text style={styles.summaryValue}>{selectedEmployee?.visaType}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t(lang, 'department')}</Text>
                <Text style={styles.summaryValue}>{selectedEmployee?.department}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t(lang, 'request_category')}</Text>
                <Text style={styles.summaryValue}>{selectedCategory}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t(lang, 'urgency')}</Text>
                <Text style={styles.summaryValue}>{t(lang, urgency)}</Text>
              </View>
              {detail ? (
                <>
                  <View style={styles.summaryDivider} />
                  <View>
                    <Text style={styles.summaryLabel}>{t(lang, 'request_detail')}</Text>
                    <Text style={[styles.summaryValue, { marginTop: 6 }]}>{detail}</Text>
                  </View>
                </>
              ) : null}
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Ionicons name="send-outline" size={20} color="#fff" />
              <Text style={styles.submitBtnText}>{t(lang, 'send_to_gyosei')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Nav */}
      {step < 3 && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.nextBtn, !canNext && styles.nextBtnDisabled]}
            onPress={handleNext}
            disabled={!canNext}
          >
            <Text style={styles.nextBtnText}>
              {step === 2 ? t(lang, 'confirm') : '次へ'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <Ionicons name="checkmark-circle" size={60} color={theme.colors.secondary} />
            </View>
            <Text style={styles.modalTitle}>{t(lang, 'sent_to_gyosei')}</Text>
            <Text style={styles.modalMsg}>{t(lang, 'send_success_msg')}</Text>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={handleClose}>
              <Text style={styles.modalCloseBtnText}>{t(lang, 'close')}</Text>
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 40,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: theme.colors.primary,
  },
  stepNum: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.textLight,
  },
  stepNumActive: {
    color: '#fff',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: theme.colors.primary,
  },
  stepLabel: {
    textAlign: 'center',
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 8,
    marginBottom: 4,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: theme.spacing.md,
    paddingBottom: 32,
  },
  stepTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    gap: 12,
  },
  employeeCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#EFF6FF',
  },
  empNationality: {
    fontSize: 28,
  },
  empDetails: {
    flex: 1,
  },
  empName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  empMeta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  categoryItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#EFF6FF',
  },
  categoryText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  categoryTextSelected: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 120,
  },
  urgencyRow: {
    flexDirection: 'row',
    gap: 10,
  },
  urgencyBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  urgencyText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: theme.spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  summaryLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    flex: 1,
  },
  summaryValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  bottomNav: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  nextBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnDisabled: {
    backgroundColor: theme.colors.border,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  modalIcon: {
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  modalMsg: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  modalCloseBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  modalCloseBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: theme.fontSize.md,
  },
});
