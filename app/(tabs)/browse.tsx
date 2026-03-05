import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { ClothingGrid } from '@/components/ClothingGrid';
import { GradientHeader } from '@/components/GradientHeader';
import { GradientBackground } from '@/components/GradientBackground';
import { Spacing } from '@/constants/design';

export default function BrowseScreen() {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory, filteredListings, categories } = useListings();

  return (
    <GradientBackground>
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
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.md,
  },
});

