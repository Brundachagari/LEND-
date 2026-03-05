import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import type { Listing } from '@/context/ListingsContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ListingCardProps = {
  listing: Listing;
  onPress?: () => void;
};

export function ListingCard({ listing, onPress }: ListingCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.96 },
      ]}>
      {listing.imageUrl ? (
        <Image source={{ uri: listing.imageUrl }} style={styles.image} contentFit="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <ThemedText style={styles.placeholderText}>No image</ThemedText>
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.infoHeader}>
          <ThemedText numberOfLines={1} style={styles.title}>
            {listing.title}
          </ThemedText>
          <Pressable hitSlop={8}>
            <MaterialIcons name="favorite-border" size={18} color="rgba(0,0,0,0.6)" />
          </Pressable>
        </View>
        <ThemedText style={styles.meta}>
          {listing.size} • {listing.condition} • Stanford
        </ThemedText>
        <ThemedText style={styles.price}>${listing.price}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.96)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    opacity: 0.6,
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    opacity: 0.7,
  },
  price: {
    marginTop: 2,
    fontWeight: '600',
  },
});

