import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';

function StarRating({ rating, size = 16 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Ionicons
          key={s}
          name={s <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color="#FBBF24"
        />
      ))}
    </View>
  );
}

export default function WorkplaceDetailScreen({ lang, workplace, navigate, goBack }) {
  if (!workplace) {
    return (
      <View style={styles.center}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{workplace.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photos */}
        <View style={styles.photoArea}>
          {workplace.photos.map((photo, idx) => (
            <Text key={idx} style={styles.photo}>{photo}</Text>
          ))}
        </View>

        <View style={styles.body}>
          {/* Name & Rating */}
          <View style={styles.nameCard}>
            <Text style={styles.name}>{workplace.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={15} color={colors.textLight} />
              <Text style={styles.location}>{workplace.location}</Text>
            </View>
            <View style={styles.ratingRow}>
              <StarRating rating={workplace.rating} />
              <Text style={styles.ratingNum}>{workplace.rating.toFixed(1)}</Text>
              <Text style={styles.reviewNum}>({workplace.reviewCount} {t(lang, 'reviews')})</Text>
            </View>
          </View>

          {/* Atmosphere */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="sunny-outline" size={16} /> {t(lang, 'atmosphere')}
            </Text>
            <View style={styles.atmosphereCard}>
              <Text style={styles.atmosphereText}>{workplace.atmosphere}</Text>
            </View>
          </View>

          {/* Pros & Cons */}
          <View style={styles.prosConsRow}>
            <View style={[styles.prosConsCard, styles.prosCard]}>
              <Text style={styles.prosTitle}>{t(lang, 'pros')}</Text>
              {workplace.pros.map((p, i) => (
                <View key={i} style={styles.proItem}>
                  <Text style={styles.proIcon}>✅</Text>
                  <Text style={styles.proText}>{p}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.prosConsCard, styles.consCard]}>
              <Text style={styles.consTitle}>{t(lang, 'cons')}</Text>
              {workplace.cons.map((c, i) => (
                <View key={i} style={styles.proItem}>
                  <Text style={styles.proIcon}>⚠️</Text>
                  <Text style={styles.proText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="chatbubble-outline" size={16} /> {t(lang, 'reviews')}
            </Text>
            {workplace.reviews.length === 0 ? (
              <View style={styles.noReview}>
                <Text style={styles.noReviewText}>まだ口コミがありません</Text>
              </View>
            ) : (
              workplace.reviews.map((rev, idx) => (
                <View key={idx} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewFlag}>{rev.flag}</Text>
                    <View style={styles.reviewAuthorInfo}>
                      <Text style={styles.reviewAuthor}>{rev.author}</Text>
                      <Text style={styles.reviewDate}>{rev.date}</Text>
                    </View>
                    <StarRating rating={rev.rating} size={14} />
                  </View>
                  <Text style={styles.reviewText}>{rev.text}</Text>
                </View>
              ))
            )}
          </View>

          {/* Post Review Button */}
          <TouchableOpacity
            style={styles.postReviewBtn}
            onPress={() => navigate('ReviewForm', { name: workplace.name })}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            <Text style={styles.postReviewText}>{t(lang, 'post_review')}</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  photoArea: {
    backgroundColor: '#1E1B4B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 28,
    gap: 20,
  },
  photo: {
    fontSize: 52,
  },
  body: {
    padding: 16,
  },
  nameCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  location: {
    fontSize: 13,
    color: colors.textLight,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  reviewNum: {
    fontSize: 13,
    color: colors.textLight,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  atmosphereCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
  },
  atmosphereText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  prosConsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  prosConsCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
  },
  prosCard: {
    backgroundColor: colors.secondary + '12',
  },
  consCard: {
    backgroundColor: colors.warning + '12',
  },
  prosTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 10,
  },
  consTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.warning,
    marginBottom: 10,
  },
  proItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 6,
  },
  proIcon: {
    fontSize: 13,
  },
  proText: {
    fontSize: 12,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  noReview: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  noReviewText: {
    fontSize: 14,
    color: colors.textLight,
  },
  reviewCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  reviewFlag: {
    fontSize: 22,
  },
  reviewAuthorInfo: {
    flex: 1,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  reviewDate: {
    fontSize: 11,
    color: colors.textLight,
  },
  reviewText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  postReviewBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  postReviewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
