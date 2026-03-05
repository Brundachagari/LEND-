import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { GradientBackground } from '@/components/GradientBackground';
import { ThemedText } from '@/components/themed-text';
import { useMessaging } from '@/context/MessagingContext';
import { useListings } from '@/context/ListingsContext';
import { Radius, Shadow, Spacing } from '@/constants/design';

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { conversations, messagesByConversationId, sendMessage } = useMessaging();
  const { users, currentUser, listings } = useListings();
  const [text, setText] = useState('');

  // #region agent log
  fetch('http://127.0.0.1:7479/ingest/0dae316f-4488-4e77-a8a0-59c9da6819bf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '1e011a',
    },
    body: JSON.stringify({
      sessionId: '1e011a',
      runId: 'pre-fix',
      hypothesisId: 'H2',
      location: 'app/messages/[id].tsx:24',
      message: 'ChatScreen render',
      data: { id },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  const conversation = useMemo(() => conversations.find((c) => c.id === id), [conversations, id]);
  const messages = messagesByConversationId[id] ?? [];

  const seller = conversation ? users[conversation.sellerId] : undefined;
  const listing = conversation ? listings.find((l) => l.id === conversation.listingId) : undefined;

  const handleSend = () => {
    sendMessage({ conversationId: id, fromUserId: currentUser.id, text });
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <GradientBackground>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
            <MaterialIcons name="chevron-left" size={22} color="#11181C" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <ThemedText type="defaultSemiBold" style={styles.chatTitle}>
              {seller ? seller.name : 'Messages'}
            </ThemedText>
            {listing ? (
              <ThemedText type="secondary" numberOfLines={1}>
                {listing.title}
              </ThemedText>
            ) : null}
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.thread} showsVerticalScrollIndicator={false}>
          {messages.map((m) => {
            const isMe = m.fromUserId === currentUser.id;
            return (
              <View key={m.id} style={[styles.bubbleRow, isMe ? styles.bubbleRowMe : styles.bubbleRowThem]}>
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
                  <ThemedText style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>
                    {m.text}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.composer}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message…"
            placeholderTextColor="rgba(17,24,28,0.4)"
            style={styles.input}
          />
          <Pressable onPress={handleSend} style={({ pressed }) => [styles.sendBtn, pressed && { transform: [{ scale: 0.96 }] }]}>
            <MaterialIcons name="send" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </GradientBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.card,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  chatTitle: {
    fontSize: 16,
  },
  thread: {
    paddingTop: Spacing.lg,
    paddingBottom: 120,
    gap: Spacing.sm,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleRowMe: {
    justifyContent: 'flex-end',
  },
  bubbleRowThem: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Shadow.card,
  },
  bubbleMe: {
    backgroundColor: '#FFAFCC',
  },
  bubbleThem: {
    backgroundColor: '#FFFFFF',
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 20,
  },
  bubbleTextMe: {
    color: '#11181C',
  },
  composer: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Shadow.card,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: 'Poppins_400Regular',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F471B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

