import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { ClothingGrid } from '@/components/ClothingGrid';
import { GradientHeader } from '@/components/GradientHeader';
import { Spacing } from '@/constants/design';

export default function BrowseScreen() {
  const router = useRouter();
  const { listings, selectedCategory, setSelectedCategory, filteredListings, categories } =
    useListings();

  return (
    <ThemedView style={styles.container}>
      <GradientHeader
        title="Browse"
        subtitle="Discover pieces from students across campus."
        style={styles.header}
      />

      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ClothingGrid
        data={filteredListings}
        onPressItem={(item) =>
          router.push({ pathname: '/listing/[id]', params: { id: item.id } })
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.md,
  },
});

