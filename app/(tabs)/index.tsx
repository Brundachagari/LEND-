import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { ListingCard } from '@/components/ListingCard';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { featuredListings, categories, selectedCategory, setSelectedCategory } = useListings();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <ThemedText type="title">Lend</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            A campus marketplace for sharing style. Buy and sell looks with other students.
          </ThemedText>
        </View>

        <CategoryChips
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Featured</ThemedText>
          <ThemedText style={styles.sectionHint}>Tap an item to see details</ThemedText>
        </View>

        <View style={styles.grid}>
          {featuredListings.map((item) => (
            <ListingCard
              key={item.id}
              listing={item}
              onPress={() => router.push({ pathname: '/listing/[id]', params: { id: item.id } })}
            />
          ))}
        </View>
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
  hero: {
    gap: 8,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.85,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionHint: {
    fontSize: 12,
    opacity: 0.6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});

