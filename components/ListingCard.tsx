import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import type { Listing } from '@/context/ListingsContext';
import { useListings } from '@/context/ListingsContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Radius, Spacing, Shadow } from '@/constants/design';

type ListingCardProps = {
  listing: Listing;
  onPress?: () => void;
};

export function ListingCard({ listing, onPress }: ListingCardProps) {
  const { likedIds, toggleLike } = useListings();
  const isLiked = likedIds.includes(listing.id);
  const coverImage = listing.photos?.[0] ?? listing.imageUrl;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.96 },
      ]}>
      <View style={styles.imageWrapper}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <ThemedText type="secondary">No image</ThemedText>
          </View>
        )}
        <Pressable
          onPress={() => toggleLike(listing.id)}
          hitSlop={8}
          style={styles.heartBadge}>
          <MaterialIcons
            name={isLiked ? 'favorite' : 'favorite-border'}
            size={18}
            color="#FFFFFF"
          />
        </Pressable>
      </View>
      <View style={styles.info}>
        <View style={styles.infoHeader}>
          <ThemedText numberOfLines={1} style={styles.title} type="defaultSemiBold">
            {listing.title}
          </ThemedText>
        </View>
        <ThemedText type="secondary" style={styles.meta}>
          {listing.size} • {listing.condition} • Stanford
        </ThemedText>
        <ThemedText type="price" style={styles.price}>
          ${listing.price}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Shadow.card,
  },
  imageWrapper: {
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  title: {
    fontSize: 16,
  },
  meta: {
    fontSize: 13,
  },
  price: {
    marginTop: Spacing.xs,
  },
});

