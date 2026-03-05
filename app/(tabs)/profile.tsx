import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useListings } from '@/context/ListingsContext';
import { ClothingGrid } from '@/components/ClothingGrid';
import { Spacing } from '@/constants/design';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const { listings } = useListings();

  const selling = listings;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <ProfileAvatar name="Campus Seller" />
          <View style={styles.headerText}>
            <ThemedText type="title">Campus Seller</ThemedText>
            <ThemedText style={styles.subtitle}>Stanford University</ThemedText>
            <ThemedText style={styles.muted}>“Swapping outfits between classes.”</ThemedText>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <ThemedText type="subtitle">12</ThemedText>
            <ThemedText style={styles.muted}>Listings</ThemedText>
          </View>
          <View style={styles.stat}>
            <ThemedText type="subtitle">0</ThemedText>
            <ThemedText style={styles.muted}>Sales</ThemedText>
          </View>
          <View style={styles.stat}>
            <ThemedText type="subtitle">0</ThemedText>
            <ThemedText style={styles.muted}>Saved</ThemedText>
          </View>
        </View>

        <PrimaryButton label="Edit profile (coming soon)" onPress={() => {}} />

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Your listings</ThemedText>
          <ThemedText style={styles.link} onPress={() => router.push('/(tabs)/sell')}>
            Add new
          </ThemedText>
        </View>

        <ClothingGrid
          data={selling}
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  content: {
    paddingBottom: Spacing['2xl'],
    gap: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  subtitle: {
    opacity: 0.85,
  },
  muted: {
    opacity: 0.7,
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  link: {
    fontSize: 14,
  },
});


