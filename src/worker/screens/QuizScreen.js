import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { vocabularyData } from '../data/mockData';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(vocabList, lang) {
  const key = lang === 'ja' ? 'en' : lang;
  return vocabList.map((word) => {
    const correct = word[key] || word.en;
    const others = vocabList
      .filter((w) => w.id !== word.id)
      .map((w) => w[key] || w.en);
    const dummies = shuffle(others).slice(0, 3);
    const choices = shuffle([correct, ...dummies]);
    return { ja: word.ja, reading: word.reading, correct, choices };
  });
}

export default function QuizScreen({ lang, jobType, goBack, onQuizComplete }) {
  const vocabList = vocabularyData[jobType] || vocabularyData.other;
  const questions = useMemo(() => buildQuestions(vocabList, lang), [jobType, lang]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentQ = questions[questionIndex];
  const total = questions.length;

  const handleAnswer = (choice) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(choice);
    if (choice === currentQ.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 >= total) {
      onQuizComplete && onQuizComplete('job_vocab', '職種別単語', score, total);
      setFinished(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setFinished(false);
  };

  const getChoiceStyle = (choice) => {
    if (!answered) return styles.choiceBtn;
    if (choice === currentQ.correct) return [styles.choiceBtn, styles.choiceCorrect];
    if (choice === selectedAnswer && choice !== currentQ.correct) return [styles.choiceBtn, styles.choiceWrong];
    return [styles.choiceBtn, styles.choiceDim];
  };

  const getChoiceTextStyle = (choice) => {
    if (!answered) return styles.choiceText;
    if (choice === currentQ.correct) return [styles.choiceText, styles.choiceTextCorrect];
    if (choice === selectedAnswer && choice !== currentQ.correct) return [styles.choiceText, styles.choiceTextWrong];
    return [styles.choiceText, styles.choiceTextDim];
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t(lang, 'score')}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.resultContainer}>
          <View style={[styles.scoreCircle, { borderColor: pct >= 70 ? colors.secondary : colors.warning }]}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreSlash}>/{total}</Text>
          </View>
          <Text style={styles.scoreLabel}>
            {total}{t(lang, 'score_result')}{score}{t(lang, 'score_correct')}
          </Text>
          <Text style={styles.scorePct}>{pct}%</Text>

          <View style={styles.resultActions}>
            <TouchableOpacity style={styles.restartBtn} onPress={handleRestart} activeOpacity={0.8}>
              <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
              <Text style={styles.restartBtnText}>{t(lang, 'try_again')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backToStudyBtn} onPress={goBack} activeOpacity={0.8}>
              <Ionicons name="arrow-back-outline" size={20} color={colors.primary} />
              <Text style={styles.backToStudyText}>{t(lang, 'back')}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        <Text style={styles.headerTitle}>{t(lang, 'quiz')}</Text>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{questionIndex + 1}/{total}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((questionIndex + 1) / total) * 100}%` },
          ]}
        />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>{t(lang, 'quiz_question')}</Text>
          <Text style={styles.questionWord}>{currentQ.ja}</Text>
          <Text style={styles.questionReading}>（{currentQ.reading}）</Text>
        </View>

        {/* Choices */}
        <View style={styles.choicesContainer}>
          {currentQ.choices.map((choice, idx) => (
            <TouchableOpacity
              key={idx}
              style={getChoiceStyle(choice)}
              onPress={() => handleAnswer(choice)}
              activeOpacity={0.8}
            >
              <Text style={styles.choiceIndex}>{['A', 'B', 'C', 'D'][idx]}</Text>
              <Text style={getChoiceTextStyle(choice)}>{choice}</Text>
              {answered && choice === currentQ.correct && (
                <Ionicons name="checkmark-circle" size={22} color={colors.secondary} />
              )}
              {answered && choice === selectedAnswer && choice !== currentQ.correct && (
                <Ionicons name="close-circle" size={22} color={colors.danger} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback */}
        {answered && (
          <View
            style={[
              styles.feedback,
              selectedAnswer === currentQ.correct ? styles.feedbackCorrect : styles.feedbackWrong,
            ]}
          >
            <Ionicons
              name={selectedAnswer === currentQ.correct ? 'checkmark-circle-outline' : 'close-circle-outline'}
              size={24}
              color={selectedAnswer === currentQ.correct ? colors.secondary : colors.danger}
            />
            <Text
              style={[
                styles.feedbackText,
                { color: selectedAnswer === currentQ.correct ? colors.secondary : colors.danger },
              ]}
            >
              {selectedAnswer === currentQ.correct ? t(lang, 'correct') : t(lang, 'wrong')}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {answered && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextBtnText}>
              {questionIndex + 1 >= total ? t(lang, 'score') : t(lang, 'next_question')}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: '#8B5CF6',
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
  progressBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#8B5CF6',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  questionLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionWord: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  questionReading: {
    fontSize: 16,
    color: colors.textLight,
  },
  choicesContainer: {
    gap: 10,
    marginBottom: 16,
  },
  choiceBtn: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  choiceCorrect: {
    backgroundColor: colors.secondary + '15',
    borderColor: colors.secondary,
  },
  choiceWrong: {
    backgroundColor: colors.danger + '15',
    borderColor: colors.danger,
  },
  choiceDim: {
    opacity: 0.5,
  },
  choiceIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textLight,
    marginRight: 12,
  },
  choiceText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  choiceTextCorrect: {
    color: colors.secondary,
    fontWeight: '700',
  },
  choiceTextWrong: {
    color: colors.danger,
    fontWeight: '700',
  },
  choiceTextDim: {
    color: colors.textLight,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 10,
  },
  feedbackCorrect: {
    backgroundColor: colors.secondary + '15',
  },
  feedbackWrong: {
    backgroundColor: colors.danger + '12',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '700',
  },
  nextBtn: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 52,
    fontWeight: 'bold',
    color: colors.text,
  },
  scoreSlash: {
    fontSize: 20,
    color: colors.textLight,
    marginTop: 20,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  scorePct: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 36,
  },
  resultActions: {
    width: '100%',
    gap: 12,
  },
  restartBtn: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  restartBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backToStudyBtn: {
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    gap: 10,
  },
  backToStudyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
