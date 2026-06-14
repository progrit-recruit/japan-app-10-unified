import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { aiConversationScripts } from '../data/mockData';

export default function AIConversationScreen({ lang, jobType, goBack }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'こんにちは！日本語の練習をしましょう！何でも聞いてください😊',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  const scripts = aiConversationScripts[jobType] || aiConversationScripts.other;

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const findAIResponse = (userText) => {
    const matched = scripts.find((s) =>
      userText.includes(s.userPrompt) || s.userPrompt.includes(userText)
    );
    if (matched) return matched.aiResponse;
    return `なるほど！練習してみましょう。「${userText}」を日本語でもう一度言ってみてください。`;
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isThinking) return;

    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      const aiText = findAIResponse(text);
      const aiMsg = { id: Date.now() + 1, type: 'ai', text: aiText };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  const renderMessage = (msg) => {
    const isAI = msg.type === 'ai';
    return (
      <View
        key={msg.id}
        style={[styles.messageRow, isAI ? styles.messageRowAI : styles.messageRowUser]}
      >
        {isAI && (
          <View style={styles.aiAvatar}>
            <Ionicons name="chatbubbles" size={18} color="#FFFFFF" />
          </View>
        )}
        <View style={[styles.bubble, isAI ? styles.bubbleAI : styles.bubbleUser]}>
          <Text style={[styles.bubbleText, isAI ? styles.bubbleTextAI : styles.bubbleTextUser]}>
            {msg.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{t(lang, 'conversation')}</Text>
          <Text style={styles.headerSub}>AI アシスタント</Text>
        </View>
        <View style={styles.onlineIndicator}>
          <View style={styles.onlineDot} />
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        {isThinking && (
          <View style={[styles.messageRow, styles.messageRowAI]}>
            <View style={styles.aiAvatar}>
              <Ionicons name="chatbubbles" size={18} color="#FFFFFF" />
            </View>
            <View style={[styles.bubble, styles.bubbleAI, styles.thinkingBubble]}>
              <Text style={styles.thinkingText}>{t(lang, 'ai_thinking')}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Prompts */}
      <View style={styles.quickPromptsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickPrompts}>
          {scripts.slice(0, 3).map((s, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.quickPromptChip}
              onPress={() => {
                setInputText(s.userPrompt);
              }}
            >
              <Text style={styles.quickPromptText}>{s.userPrompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={t(lang, 'chat_with_ai')}
          placeholderTextColor={colors.textLight}
          multiline
          maxLength={200}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!inputText.trim() || isThinking) && styles.sendBtnDisabled]}
          onPress={handleSend}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  header: {
    backgroundColor: colors.secondary,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  onlineIndicator: {
    padding: 8,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#86EFAC',
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-end',
  },
  messageRowAI: {
    justifyContent: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  aiAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleAI: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  bubbleTextAI: {
    color: colors.text,
  },
  bubbleTextUser: {
    color: '#FFFFFF',
  },
  thinkingBubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  thinkingText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  quickPromptsContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  quickPrompts: {
    paddingHorizontal: 12,
    gap: 8,
  },
  quickPromptChip: {
    backgroundColor: colors.primary + '12',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  quickPromptText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendBtnDisabled: {
    backgroundColor: colors.textLight,
    shadowOpacity: 0,
  },
});
