import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CategoryChips } from '@/components/CategoryChips';
import { ListingCard } from '@/components/ListingCard';
import { useListings } from '@/context/ListingsContext';

export default function BrowseScreen() {
  const router = useRouter();
  const { listings, selectedCategory, setSelectedCategory, filteredListings, categories } =
    useListings();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Browse</ThemedText>
        <ThemedText style={styles.subtitle}>
          Discover pieces from students across campus.
        </ThemedText>
      </View>

      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <FlatList
        data={filteredListings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListingCard
            listing={item}
            onPress={() => router.push({ pathname: '/listing/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>No items in this category yet.</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    gap: 4,
    marginBottom: 12,
  },
  subtitle: {
    opacity: 0.8,
  },
  row: {
    gap: 12,
  },
  listContent: {
    paddingVertical: 12,
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.7,
  },
});

