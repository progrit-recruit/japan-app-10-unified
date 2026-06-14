import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
import { companyCustomVocab } from '../data/mockData';

const CATEGORY_COLORS = {
  '業務': '#3B82F6',
  '安全': '#EF4444',
  'コンプライアンス': '#8B5CF6',
  '労務': '#059669',
};

export default function CustomVocabScreen({ lang, goBack }) {
  const [vocab, setVocab] = useState(companyCustomVocab);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    ja: '',
    reading: '',
    meaning_en: '',
    example: '',
    category: '業務',
  });

  const handleDelete = (id) => {
    setVocab((prev) => prev.filter((v) => v.id !== id));
  };

  const handleAdd = () => {
    if (!form.ja.trim()) return;
    const newItem = {
      id: Date.now(),
      ja: form.ja.trim(),
      reading: form.reading.trim(),
      meaning_en: form.meaning_en.trim(),
      meaning_vi: '',
      meaning_zh: '',
      meaning_ko: '',
      meaning_pt: '',
      meaning_ne: '',
      example: form.example.trim(),
      category: form.category,
      addedBy: '管理者',
      addedAt: new Date().toISOString().slice(0, 10),
    };
    setVocab((prev) => [...prev, newItem]);
    setForm({ ja: '', reading: '', meaning_en: '', example: '', category: '業務' });
    setShowModal(false);
  };

  const renderItem = ({ item }) => {
    const color = CATEGORY_COLORS[item.category] || '#6B7280';
    return (
      <View style={styles.vocabCard}>
        <View style={styles.cardTop}>
          <View style={styles.wordBlock}>
            <Text style={styles.wordJa}>{item.ja}</Text>
            <Text style={styles.wordReading}>{item.reading}</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: color + '20', borderColor: color }]}>
            <Text style={[styles.categoryText, { color }]}>{item.category}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
        <Text style={styles.meaningText}>{item.meaning_en}</Text>
        {item.example ? (
          <View style={styles.exampleBox}>
            <Text style={styles.exampleText}>{item.example}</Text>
          </View>
        ) : null}
        <Text style={styles.addedByText}>登録: {item.addedBy} · {item.addedAt}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>従業員語彙設定</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats card */}
      <View style={styles.statsCard}>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>{vocab.length}語</Text>
          <Text style={styles.statsLabel}>登録済み</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descBox}>
        <Ionicons name="information-circle-outline" size={16} color="#3B82F6" />
        <Text style={styles.descText}>
          ここで登録した単語は従業員の日本語学習アプリに『会社からの課題』として表示されます
        </Text>
      </View>

      {/* Vocab list */}
      <FlatList
        data={vocab}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>単語を追加</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={22} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>日本語 *</Text>
              <TextInput
                style={styles.input}
                value={form.ja}
                onChangeText={(v) => setForm((f) => ({ ...f, ja: v }))}
                placeholder="例: 申し送り"
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.inputLabel}>読み仮名</Text>
              <TextInput
                style={styles.input}
                value={form.reading}
                onChangeText={(v) => setForm((f) => ({ ...f, reading: v }))}
                placeholder="例: もうしおくり"
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.inputLabel}>意味（英語）</Text>
              <TextInput
                style={styles.input}
                value={form.meaning_en}
                onChangeText={(v) => setForm((f) => ({ ...f, meaning_en: v }))}
                placeholder="例: Handover report"
                placeholderTextColor="#9CA3AF"
              />

              <Text style={styles.inputLabel}>例文</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={form.example}
                onChangeText={(v) => setForm((f) => ({ ...f, example: v }))}
                placeholder="例: 毎日申し送りを書いてください。"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />

              <Text style={styles.inputLabel}>カテゴリ</Text>
              <View style={styles.categoryRow}>
                {Object.keys(CATEGORY_COLORS).map((cat) => {
                  const color = CATEGORY_COLORS[cat];
                  const selected = form.category === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryOption,
                        { borderColor: color },
                        selected && { backgroundColor: color },
                      ]}
                      onPress={() => setForm((f) => ({ ...f, category: cat }))}
                    >
                      <Text
                        style={[
                          styles.categoryOptionText,
                          { color: selected ? '#fff' : color },
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleAdd}>
                <Text style={styles.submitBtnText}>登録する</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  addBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 6,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  statsItem: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3B82F6',
  },
  statsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  descBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  descText: {
    flex: 1,
    fontSize: 12,
    color: '#1D4ED8',
    lineHeight: 18,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  vocabCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  wordBlock: {
    flex: 1,
  },
  wordJa: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  wordReading: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  categoryBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  deleteBtn: {
    padding: 4,
  },
  meaningText: {
    fontSize: 13,
    color: theme.colors.textLight,
    marginBottom: 6,
  },
  exampleBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#D1D5DB',
  },
  exampleText: {
    fontSize: 12,
    color: theme.colors.text,
    lineHeight: 18,
  },
  addedByText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
    backgroundColor: '#F9FAFB',
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  categoryOption: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  categoryOptionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
