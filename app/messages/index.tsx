import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { GradientBackground } from '@/components/GradientBackground';
import { ThemedText } from '@/components/themed-text';
import { useMessaging } from '@/context/MessagingContext';
import { useListings } from '@/context/ListingsContext';
import { Radius, Shadow, Spacing } from '@/constants/design';
import { RatingStars } from '@/components/RatingStars';

export default function MessagesScreen() {
  const router = useRouter();
  const { conversations, messagesByConversationId } = useMessaging();
  const { users, listings } = useListings();

  const rows = useMemo(() => {
    return conversations.map((c) => {
      const seller = users[c.sellerId];
      const listing = listings.find((l) => l.id === c.listingId);
      const msgs = messagesByConversationId[c.id] ?? [];
      const last = msgs[msgs.length - 1];
      return { c, seller, listing, last };
    });
  }, [conversations, users, listings, messagesByConversationId]);

  return (
    <GradientBackground>
      <View style={styles.header}>
        <ThemedText type="title">Messages</ThemedText>
        <ThemedText type="secondary">Your chats with owners</ThemedText>
      </View>

      <View style={styles.list}>
        {rows.length === 0 ? (
          <View style={styles.card}>
            <ThemedText type="defaultSemiBold">No messages yet</ThemedText>
            <ThemedText type="secondary" style={{ marginTop: 4 }}>
              Open a listing and tap “Message owner”.
            </ThemedText>
          </View>
        ) : (
          rows.map(({ c, seller, listing, last }) => (
            <Pressable
              key={c.id}
              onPress={() => router.push({ pathname: '/messages/[id]', params: { id: c.id } })}
              style={({ pressed }) => [styles.row, pressed && { transform: [{ scale: 0.98 }] }]}>
              <View style={styles.avatar}>
                <MaterialIcons name="person" size={18} color="#11181C" />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={styles.rowTop}>
                  <ThemedText type="defaultSemiBold">{seller?.name ?? 'Owner'}</ThemedText>
                  {seller ? <RatingStars rating={seller.rating} size={12} showValue={false} /> : null}
                </View>
                <ThemedText type="secondary" numberOfLines={1}>
                  {listing?.title ?? 'Listing'}
                </ThemedText>
                <ThemedText type="secondary" numberOfLines={1}>
                  {last?.text ?? 'Say hi!'}
                </ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="rgba(17,24,28,0.35)" />
            </Pressable>
          ))
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Spacing.lg,
    gap: 4,
  },
  list: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  card: {
    borderRadius: Radius.lg,
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    ...Shadow.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    ...Shadow.card,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

