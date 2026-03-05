import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { GradientHeader } from '@/components/GradientHeader';
import { GradientBackground } from '@/components/GradientBackground';
import { ListingCard } from '@/components/ListingCard';
import { Spacing } from '@/constants/design';

export default function HomeScreen() {
  const router = useRouter();
  const { featuredListings, categories, selectedCategory, setSelectedCategory } = useListings();

  return (
    <GradientBackground>
      <FlatList
        data={featuredListings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <GradientHeader
              title="Lend"
              subtitle="Rent the fit. Own the moment. Campus style, on tap."
            />

            <CategoryChips
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />

            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle">Trending on your campus</ThemedText>
              <ThemedText type="secondary" style={styles.sectionHint}>
                Tap a piece to see more details
              </ThemedText>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <ListingCard
            listing={item}
            onPress={() =>
              router.push({ pathname: '/listing/[id]', params: { id: item.id } })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing['2xl'],
    paddingTop: Spacing.lg,
    gap: Spacing.lg,
  },
  row: {
    gap: 12,
  },
  sectionHeader: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionHint: {
    fontSize: 12,
    opacity: 0.6,
  },
});

