import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { ClothingGrid } from '@/components/ClothingGrid';
import { GradientHeader } from '@/components/GradientHeader';

export default function HomeScreen() {
  const router = useRouter();
  const { featuredListings, categories, selectedCategory, setSelectedCategory } = useListings();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <GradientHeader
          title="Lend"
          subtitle="A campus marketplace for sharing style. Buy and sell looks with other students."
        />

        <CategoryChips
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Trending on your campus</ThemedText>
          <ThemedText style={styles.sectionHint}>Tap a piece to see more details</ThemedText>
        </View>

        <ClothingGrid
          data={featuredListings}
          onPressItem={(item) =>
            router.push({ pathname: '/listing/[id]', params: { id: item.id } })
          }
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    paddingBottom: 32,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionHint: {
    fontSize: 12,
    opacity: 0.6,
  },
});

