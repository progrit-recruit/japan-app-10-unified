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
import { requestsData } from '../data/mockData';

const statusConfig = {
  pending: { color: colors.warning, labelKey: 'pending', icon: 'time-outline' },
  in_review: { color: colors.primary, labelKey: 'in_review', icon: 'search-outline' },
  completed: { color: colors.success, labelKey: 'completed', icon: 'checkmark-circle-outline' },
};

export default function GyoseiScreen({ lang, navigate }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="document-text-outline" size={28} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{t(lang, 'gyosei')}</Text>
      </View>

      <View style={styles.body}>
        {/* New Request Button */}
        <TouchableOpacity
          style={styles.newRequestBtn}
          onPress={() => navigate('NewRequest')}
          activeOpacity={0.8}
        >
          <View style={styles.newRequestLeft}>
            <View style={styles.newRequestIcon}>
              <Ionicons name="add-circle-outline" size={28} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.newRequestTitle}>{t(lang, 'send_request')}</Text>
              <Text style={styles.newRequestSub}>{t(lang, 'new_request')}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Request List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t(lang, 'my_requests')}</Text>
          {requestsData.map((req) => {
            const cfg = statusConfig[req.status] || statusConfig.pending;
            return (
              <View key={req.id} style={styles.requestCard}>
                <View style={styles.requestTop}>
                  <Text style={styles.requestType}>{req.type}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: cfg.color + '18' }]}>
                    <Ionicons name={cfg.icon} size={13} color={cfg.color} />
                    <Text style={[styles.statusText, { color: cfg.color }]}>
                      {t(lang, cfg.labelKey)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.requestNote}>{req.note}</Text>
                <Text style={styles.requestDate}>{req.date}</Text>
              </View>
            );
          })}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={22} color={colors.primary} />
          <Text style={styles.infoText}>
            {lang === 'ja' && '行政書士が3営業日以内に対応します。お急ぎの場合はご連絡ください。'}
            {lang === 'zh' && '行政书士将在3个工作日内处理。如有紧急情况请联系我们。'}
            {lang === 'vi' && 'Hành chính thư sĩ sẽ xử lý trong vòng 3 ngày làm việc.'}
            {lang === 'ko' && '행정서사가 3영업일 이내에 처리합니다.'}
            {lang === 'pt' && 'O despachante responderá em até 3 dias úteis.'}
            {lang === 'ne' && 'प्रशासनिक लेखकले ३ कार्य दिनभित्र प्रक्रिया गर्नेछन्।'}
          </Text>
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
    backgroundColor: colors.primary,
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
  newRequestBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  newRequestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  newRequestIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newRequestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  newRequestSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  requestTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestType: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  requestNote: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 6,
  },
  requestDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  infoCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
});
