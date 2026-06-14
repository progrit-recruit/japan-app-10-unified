import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';
import { companyAssignedVocab } from '../data/mockData';

const PRIMARY = '#1E40AF';
const SECONDARY = '#059669';

const CATEGORY_COLORS = {
  '業務': '#3B82F6',
  '安全': '#EF4444',
  'コンプライアンス': '#8B5CF6',
  '労務': '#059669',
};

function getMeaning(item, lang) {
  switch (lang) {
    case 'en': return item.meaning_en;
    case 'vi': return item.meaning_vi;
    case 'zh': return item.meaning_zh;
    case 'ko': return item.meaning_ko;
    case 'pt': return item.meaning_pt;
    case 'ne': return item.meaning_ne;
    default: return item.meaning_en;
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(correctItem, allItems) {
  const dummies = shuffle(allItems.filter((v) => v.id !== correctItem.id)).slice(0, 3);
  return shuffle([correctItem, ...dummies]);
}

export default function CompanyVocabScreen({ lang, navigate, goBack, onQuizComplete }) {
  const [mode, setMode] = useState('list'); // 'list' | 'quiz' | 'result'
  const [flipped, setFlipped] = useState({});

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [choices, setChoices] = useState(() => buildChoices(companyAssignedVocab[0], companyAssignedVocab));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setSelected(null);
    setChoices(buildChoices(companyAssignedVocab[0], companyAssignedVocab));
    setMode('quiz');
  };

  const handleSelect = (item) => {
    if (selected !== null) return;
    setSelected(item.id);
    if (item.id === companyAssignedVocab[quizIndex].id) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = quizIndex + 1;
    if (nextIndex >= companyAssignedVocab.length) {
      onQuizComplete && onQuizComplete('company_vocab', '会社からの課題', score, companyAssignedVocab.length);
      setMode('result');
    } else {
      setQuizIndex(nextIndex);
      setChoices(buildChoices(companyAssignedVocab[nextIndex], companyAssignedVocab));
      setSelected(null);
    }
  };

  const currentWord = companyAssignedVocab[quizIndex];
  const correctId = currentWord?.id;

  // ── Result Screen ──
  if (mode === 'result') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMode('list')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t(lang, 'company_assignment')}</Text>
        </View>
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultTitle}>
              {companyAssignedVocab.length}問中{score}問正解！
            </Text>
            <Text style={styles.resultScore}>
              {Math.round((score / companyAssignedVocab.length) * 100)}%
            </Text>
            <TouchableOpacity style={styles.backToListBtn} onPress={() => setMode('list')}>
              <Text style={styles.backToListText}>リストに戻る</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backToListBtn, { backgroundColor: SECONDARY, marginTop: 12 }]} onPress={startQuiz}>
              <Text style={styles.backToListText}>もう一度</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── Quiz Screen ──
  if (mode === 'quiz') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMode('list')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t(lang, 'company_assignment')}</Text>
        </View>

        <View style={styles.quizBody}>
          {/* Progress */}
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {quizIndex + 1} / {companyAssignedVocab.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((quizIndex + 1) / companyAssignedVocab.length) * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.questionLabel}>次の意味の日本語は？</Text>
            <Text style={styles.questionMeaning}>{getMeaning(currentWord, lang)}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLORS[currentWord.category] || PRIMARY }]}>
              <Text style={styles.categoryText}>{currentWord.category}</Text>
            </View>
          </View>

          {/* Choices */}
          <View style={styles.choicesContainer}>
            {choices.map((item) => {
              let choiceStyle = styles.choiceBtn;
              let choiceTextStyle = styles.choiceText;
              if (selected !== null) {
                if (item.id === correctId) {
                  choiceStyle = [styles.choiceBtn, styles.choiceCorrect];
                  choiceTextStyle = [styles.choiceText, styles.choiceTextWhite];
                } else if (item.id === selected) {
                  choiceStyle = [styles.choiceBtn, styles.choiceWrong];
                  choiceTextStyle = [styles.choiceText, styles.choiceTextWhite];
                }
              }
              return (
                <TouchableOpacity
                  key={item.id}
                  style={choiceStyle}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.8}
                >
                  <Text style={choiceTextStyle}>{item.ja}</Text>
                  <Text style={[choiceTextStyle, { fontSize: 12, opacity: 0.7 }]}>{item.reading}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {selected !== null && (
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>
                {quizIndex + 1 === companyAssignedVocab.length ? '結果を見る' : '次へ →'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ── List Screen ──
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t(lang, 'company_assignment')}</Text>
      </View>

      {/* Description card */}
      <View style={styles.descCard}>
        <Ionicons name="business-outline" size={24} color={PRIMARY} />
        <Text style={styles.descText}>会社が登録した単語を学習しましょう</Text>
      </View>

      <FlatList
        data={companyAssignedVocab}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isFlipped = !!flipped[item.id];
          const catColor = CATEGORY_COLORS[item.category] || PRIMARY;
          return (
            <TouchableOpacity
              style={styles.vocabCard}
              onPress={() => toggleFlip(item.id)}
              activeOpacity={0.85}
            >
              {!isFlipped ? (
                /* Front */
                <View style={styles.cardFront}>
                  <View style={styles.cardTopRow}>
                    <View style={[styles.categoryBadge, { backgroundColor: catColor }]}>
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <Text style={styles.flipHint}>{t(lang, 'tap_for_meaning')}</Text>
                  </View>
                  <Text style={styles.vocabJa}>{item.ja}</Text>
                  <Text style={styles.vocabReading}>{item.reading}</Text>
                </View>
              ) : (
                /* Back */
                <View style={styles.cardBack}>
                  <View style={[styles.categoryBadge, { backgroundColor: catColor, marginBottom: 8 }]}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.vocabMeaning}>{getMeaning(item, lang)}</Text>
                  <Text style={styles.vocabExample}>{item.example}</Text>
                  <Text style={styles.vocabJaSmall}>{item.ja}（{item.reading}）</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Floating quiz button */}
      <View style={styles.quizBtnContainer}>
        <TouchableOpacity style={styles.quizStartBtn} onPress={startQuiz} activeOpacity={0.85}>
          <Ionicons name="help-circle-outline" size={22} color="#FFFFFF" />
          <Text style={styles.quizStartText}>{t(lang, 'start_company_quiz')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  descCard: {
    backgroundColor: '#DBEAFE',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 4,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  descText: {
    fontSize: 14,
    color: PRIMARY,
    fontWeight: '600',
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 90,
  },
  vocabCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 110,
  },
  cardFront: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  flipHint: {
    fontSize: 11,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  vocabJa: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  vocabReading: {
    fontSize: 14,
    color: '#64748B',
  },
  cardBack: {
    flex: 1,
  },
  vocabMeaning: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 8,
  },
  vocabExample: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  vocabJaSmall: {
    fontSize: 12,
    color: '#94A3B8',
  },
  quizBtnContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  quizStartBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  quizStartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Quiz styles
  quizBody: {
    flex: 1,
    padding: 16,
  },
  progressRow: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
    textAlign: 'right',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: PRIMARY,
    borderRadius: 3,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  questionLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 12,
  },
  questionMeaning: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  choicesContainer: {
    gap: 10,
  },
  choiceBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  choiceCorrect: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  choiceWrong: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  choiceText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  choiceTextWhite: {
    color: '#FFFFFF',
  },
  nextBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Result styles
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 36,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  resultEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 28,
  },
  backToListBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  backToListText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
