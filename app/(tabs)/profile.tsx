import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useListings } from '@/context/ListingsContext';
import { GradientBackground } from '@/components/GradientBackground';
import { ListingCard } from '@/components/ListingCard';
import { RatingStars } from '@/components/RatingStars';
import { SecondaryButton } from '@/components/SecondaryButton';
import { Spacing } from '@/constants/design';

export default function ProfileScreen() {
  const router = useRouter();
  const { listings, currentUser } = useListings();

  return (
    <GradientBackground>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <ProfileAvatar name={currentUser.name} />
              <View style={styles.headerText}>
                <ThemedText type="title">{currentUser.name}</ThemedText>
                <ThemedText style={styles.subtitle}>{currentUser.school}</ThemedText>
                <RatingStars
                  rating={currentUser.rating}
                  valueText={`${currentUser.rating.toFixed(1)} • ${currentUser.reviewCount} reviews`}
                />
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <ThemedText type="subtitle">12</ThemedText>
                <ThemedText style={styles.muted}>Listings</ThemedText>
              </View>
              <View style={styles.stat}>
                <ThemedText type="subtitle">0</ThemedText>
                <ThemedText style={styles.muted}>Rentals</ThemedText>
              </View>
              <View style={styles.stat}>
                <ThemedText type="subtitle">0</ThemedText>
                <ThemedText style={styles.muted}>Saved</ThemedText>
              </View>
            </View>

            <PrimaryButton label="Edit profile (coming soon)" onPress={() => {}} />
            <SecondaryButton label="Messages" onPress={() => router.push('/messages')} />

            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle">Your listings</ThemedText>
              <ThemedText style={styles.link} onPress={() => router.push('/(tabs)/sell')}>
                Add new
              </ThemedText>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle">Recent reviews</ThemedText>
              <ThemedText type="secondary">What people say about you</ThemedText>
            </View>

            <View style={styles.reviewCard}>
              {currentUser.reviews.slice(0, 2).map((r) => (
                <View key={r.id} style={styles.reviewRow}>
                  <View style={styles.reviewHeader}>
                    <ThemedText type="defaultSemiBold">{r.authorName}</ThemedText>
                    <RatingStars rating={r.rating} size={12} showValue={false} />
                  </View>
                  <ThemedText type="secondary" style={styles.reviewText}>
                    {r.text}
                  </ThemedText>
                </View>
              ))}
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
  reviewCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  reviewRow: {
    gap: Spacing.xs,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewText: {
    lineHeight: 18,
  },
  gridRow: {
    gap: 12,
  },
});


