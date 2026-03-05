import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
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
          <TouchableOpacity hitSlop={8}>
            <MaterialIcons name="favorite-border" size={18} color="rgba(0,0,0,0.6)" />
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.02)',
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

