import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useListings } from '@/context/ListingsContext';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { listings } = useListings();

  const listing = useMemo(() => listings.find((l) => l.id === id), [listings, id]);

  if (!listing) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="title">Listing not found</ThemedText>
        <PrimaryButton label="Back to browse" onPress={() => router.back()} />
      </ThemedView>
    );
  }

  const handleBuy = () => {
    Alert.alert('Buy now', 'In a real app this would start checkout.');
  };

  const handleMessage = () => {
    Alert.alert('Message seller', 'In a real app this would open chat with the seller.');
  };

  const handleRecommend = () => {
    Alert.alert('Recommend', 'In a real app this could share to a friend.');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {listing.imageUrl && (
          <Image source={{ uri: listing.imageUrl }} style={styles.image} contentFit="cover" />
        )}

        <View style={styles.header}>
          <ThemedText type="title">{listing.title}</ThemedText>
          <ThemedText style={styles.price}>${listing.price}</ThemedText>
        </View>

        <View style={styles.metaRow}>
          <ThemedText style={styles.meta}>Size {listing.size}</ThemedText>
          <ThemedText style={styles.meta}>{listing.condition}</ThemedText>
          <ThemedText style={styles.meta}>{listing.category}</ThemedText>
        </View>

        <ThemedText style={styles.description}>{listing.description}</ThemedText>

        <View style={styles.actions}>
          <PrimaryButton label="Buy now" onPress={handleBuy} />
          <PrimaryButton label="Message seller" onPress={handleMessage} />
          <PrimaryButton label="Recommend" onPress={handleRecommend} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: 13,
    opacity: 0.8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    marginTop: 8,
    gap: 8,
  },
});

