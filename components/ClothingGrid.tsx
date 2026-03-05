import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';

import { ListingCard } from '@/components/ListingCard';
import type { Listing } from '@/context/ListingsContext';

type ClothingGridProps = {
  data: Listing[];
  onPressItem: (item: Listing) => void;
  contentContainerStyle?: ViewStyle;
};

export function ClothingGrid({ data, onPressItem, contentContainerStyle }: ClothingGridProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      renderItem={({ item }) => (
        <ListingCard listing={item} onPress={() => onPressItem(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 12,
  },
  content: {
    paddingVertical: 12,
    gap: 12,
  },
});

