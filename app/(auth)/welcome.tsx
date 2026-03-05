import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/design';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#CDB4DB', '#FFC8DD', '#FFAFCC', '#FFE5EC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.logo}>
          Lend
        </ThemedText>
        <ThemedText type="secondary" style={styles.tagline}>
          borrow style from your campus
        </ThemedText>

        <View style={styles.card}>
          <Pressable
            onPress={() => router.push('/email')}
            style={({ pressed }) => [styles.primaryBtn, pressed && { transform: [{ scale: 0.98 }] }]}>
            <ThemedText type="defaultSemiBold" style={styles.primaryText}>
              Sign Up
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => router.push('/email')}
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
            ]}>
            <ThemedText type="defaultSemiBold" style={styles.secondaryText}>
              Log in
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logo: {
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  card: {
    width: '100%',
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.6)',
    gap: Spacing.md,
    ...Shadow.card,
  },
  primaryBtn: {
    height: 50,
    borderRadius: Radius.lg,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  primaryText: {
    color: '#11181C',
  },
  secondaryBtn: {
    height: 50,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
});

