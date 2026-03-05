import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title">Your profile</ThemedText>
        <ThemedText style={styles.subtitle}>
          This is a placeholder for authentication and profile settings.
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle">Campus ID</ThemedText>
          <ThemedText style={styles.muted}>Not connected</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Stats</ThemedText>
          <ThemedText style={styles.muted}>0 listings • 0 sales • 0 favorites</ThemedText>
        </View>

        <PrimaryButton label="Sign in (coming soon)" onPress={() => {}} disabled />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  subtitle: {
    opacity: 0.8,
  },
  section: {
    gap: 4,
  },
  muted: {
    opacity: 0.7,
  },
});

