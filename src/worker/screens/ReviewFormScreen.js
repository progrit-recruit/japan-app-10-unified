import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';

export default function ReviewFormScreen({ lang, workplaceName, goBack }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!rating || !reviewText.trim()) return;
    setShowSuccess(true);
  };

  const ratingLabels = {
    1: lang === 'ja' ? 'とても悪い' : lang === 'zh' ? '非常差' : lang === 'vi' ? 'Rất tệ' : lang === 'ko' ? '매우 나쁨' : lang === 'pt' ? 'Muito ruim' : 'धेरै खराब',
    2: lang === 'ja' ? '悪い' : lang === 'zh' ? '差' : lang === 'vi' ? 'Tệ' : lang === 'ko' ? '나쁨' : lang === 'pt' ? 'Ruim' : 'खराब',
    3: lang === 'ja' ? '普通' : lang === 'zh' ? '一般' : lang === 'vi' ? 'Bình thường' : lang === 'ko' ? '보통' : lang === 'pt' ? 'Normal' : 'सामान्य',
    4: lang === 'ja' ? '良い' : lang === 'zh' ? '好' : lang === 'vi' ? 'Tốt' : lang === 'ko' ? '좋음' : lang === 'pt' ? 'Bom' : 'राम्रो',
    5: lang === 'ja' ? 'とても良い' : lang === 'zh' ? '非常好' : lang === 'vi' ? 'Rất tốt' : lang === 'ko' ? '매우 좋음' : lang === 'pt' ? 'Muito bom' : 'धेरै राम्रो',
  };

  const isValid = rating > 0 && reviewText.trim().length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'post_review')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Workplace Name */}
        <View style={styles.workplaceCard}>
          <Ionicons name="business-outline" size={22} color={colors.primary} />
          <Text style={styles.workplaceName}>{workplaceName}</Text>
        </View>

        {/* Star Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t(lang, 'rating')}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setRating(s)}
                style={styles.starBtn}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={s <= rating ? 'star' : 'star-outline'}
                  size={44}
                  color={s <= rating ? '#FBBF24' : colors.border}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingLabel}>{ratingLabels[rating]}</Text>
          )}
        </View>

        {/* Review Text */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t(lang, 'review_text')}</Text>
          <TextInput
            style={styles.textarea}
            value={reviewText}
            onChangeText={setReviewText}
            placeholder={
              lang === 'ja' ? '仕事の環境や雰囲気について教えてください...' :
              lang === 'zh' ? '请告诉我们工作环境和氛围...' :
              lang === 'vi' ? 'Hãy cho chúng tôi biết về môi trường làm việc...' :
              lang === 'ko' ? '근무 환경과 분위기에 대해 알려주세요...' :
              lang === 'pt' ? 'Conte-nos sobre o ambiente de trabalho...' :
              'काम को वातावरण बारे बताउनुहोस्...'
            }
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{reviewText.length}/500</Text>
        </View>

        {/* Guidelines */}
        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>📝 ガイドライン</Text>
          <Text style={styles.guideText}>• 実際の体験を正直に書いてください</Text>
          <Text style={styles.guideText}>• 個人情報や誹謗中傷は書かないでください</Text>
          <Text style={styles.guideText}>• 他の外国人労働者に役立つ情報を書いてください</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-outline" size={20} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>{t(lang, 'submit_review')}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>
              {lang === 'ja' ? '口コミを投稿しました！' :
               lang === 'zh' ? '评价已发布！' :
               lang === 'vi' ? 'Đã đăng đánh giá!' :
               lang === 'ko' ? '리뷰가 게시되었습니다!' :
               lang === 'pt' ? 'Avaliação publicada!' :
               'समीक्षा पोस्ट गरियो!'}
            </Text>
            <Text style={styles.successSub}>
              {lang === 'ja' ? 'ありがとうございます！あなたの口コミが他の外国人労働者の役に立ちます。' :
               lang === 'zh' ? '谢谢！您的评价将帮助其他外国劳工。' :
               lang === 'vi' ? 'Cảm ơn bạn! Đánh giá của bạn sẽ giúp ích cho người lao động nước ngoài khác.' :
               lang === 'ko' ? '감사합니다! 당신의 리뷰가 다른 외국인 근로자에게 도움이 됩니다.' :
               lang === 'pt' ? 'Obrigado! Sua avaliação ajudará outros trabalhadores estrangeiros.' :
               'धन्यवाद! तपाईंको समीक्षाले अन्य विदेशी कामदारहरूलाई मद्दत गर्नेछ।'}
            </Text>
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
    backgroundColor: '#7C3AED',
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
  workplaceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  workplaceName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  starBtn: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FBBF24',
    textAlign: 'center',
  },
  textarea: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.text,
    minHeight: 140,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'right',
    marginTop: 6,
  },
  guideCard: {
    backgroundColor: colors.primary + '08',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  guideText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 22,
  },
  submitBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: {
    backgroundColor: colors.textLight,
    shadowOpacity: 0,
  },
  submitBtnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '85%',
  },
  successEmoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  successBtn: {
    backgroundColor: '#7C3AED',
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
