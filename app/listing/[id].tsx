import React, { useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useListings } from '@/context/ListingsContext';
import { GradientBackground } from '@/components/GradientBackground';
import { RatingStars } from '@/components/RatingStars';
import { useMessaging } from '@/context/MessagingContext';
import { Radius, Shadow, Spacing } from '@/constants/design';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { listings, users, currentUser } = useListings();
  const { getOrCreateConversation } = useMessaging();

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
      hypothesisId: 'H1',
      location: 'app/listing/[id].tsx:20',
      message: 'ListingDetailScreen render',
      data: { id },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  const listing = useMemo(() => listings.find((l) => l.id === id), [listings, id]);

  if (!listing) {
    return (
      <GradientBackground>
        <View style={styles.centered}>
          <ThemedText type="title">Listing not found</ThemedText>
          <PrimaryButton label="Back to browse" onPress={() => router.back()} />
        </View>
      </GradientBackground>
    );
  }

  const seller = users[listing.sellerId];
  const coverImage = listing.photos?.[0] ?? listing.imageUrl;

  const handleBuy = () => {
    Alert.alert('Lend', 'In a real app this would start checkout.');
  };

  const handleMessage = () => {
    const conversationId = getOrCreateConversation({
      listingId: listing.id,
      buyerId: currentUser.id,
      sellerId: listing.sellerId,
    });
    router.push({ pathname: '/messages/[id]', params: { id: conversationId } });
  };

  const handleRecommend = () => {
    Alert.alert('Recommend', 'In a real app this could share to a friend.');
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.image} contentFit="cover" />
        ) : null}

        <View style={styles.card}>
          <View style={styles.header}>
            <ThemedText type="title">{listing.title}</ThemedText>
            <ThemedText type="price" style={styles.price}>
              ${listing.price}
            </ThemedText>
          </View>

          <View style={styles.metaRow}>
            <ThemedText type="secondary" style={styles.meta}>
              Size {listing.size}
            </ThemedText>
            <ThemedText type="secondary" style={styles.meta}>
              {listing.condition}
            </ThemedText>
            <ThemedText type="secondary" style={styles.meta}>
              {listing.category}
            </ThemedText>
          </View>

          <ThemedText style={styles.description}>{listing.description}</ThemedText>
        </View>

        {seller ? (
          <View style={styles.card}>
            <View style={styles.sellerRow}>
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold" style={styles.sellerName}>
                  {seller.name}
                </ThemedText>
                <ThemedText type="secondary">{seller.school}</ThemedText>
              </View>
              <RatingStars rating={seller.rating} valueText={`${seller.rating.toFixed(1)} • ${seller.reviewCount}`} />
            </View>

            <View style={styles.reviews}>
              {seller.reviews.slice(0, 2).map((r) => (
                <View key={r.id} style={styles.reviewRow}>
                  <RatingStars rating={r.rating} size={12} showValue={false} />
                  <ThemedText type="secondary" style={styles.reviewText}>
                    {r.text}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton label="Lend" onPress={handleBuy} />
          <PrimaryButton label="Message owner" onPress={handleMessage} />
          <Pressable onPress={handleRecommend} style={styles.recommend}>
            <ThemedText type="defaultSemiBold" style={styles.recommendText}>
              Recommend
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 56,
    gap: Spacing.lg,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: Spacing.lg,
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: Radius.xl,
    marginTop: Spacing.lg,
  },
  card: {
    borderRadius: Radius.lg,
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    ...Shadow.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
  },
  price: {
    fontSize: 20,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: Spacing.sm,
  },
  meta: {
    fontSize: 13,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: Spacing.md,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  sellerName: {
    fontSize: 16,
  },
  reviews: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  reviewRow: {
    gap: Spacing.xs,
  },
  reviewText: {
    lineHeight: 18,
  },
  actions: {
    marginTop: 8,
    gap: 8,
  },
  recommend: {
    height: 50,
    borderRadius: Radius.pill,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    ...Shadow.card,
  },
  recommendText: {
    color: '#11181C',
  },
});

