import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#E7D8FF', '#FAD0EC', '#FFE2D1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Welcome to Lend</ThemedText>
        <ThemedText style={styles.subtitle}>
          A campus marketplace for sharing closets with other students.
        </ThemedText>

        <View style={styles.buttons}>
          <PrimaryButton label="Sign up with .edu email" onPress={() => router.push('/auth/email')} />
          <PrimaryButton label="Log in" onPress={() => router.push('/auth/email')} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  content: {
    gap: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  buttons: {
    marginTop: 12,
    gap: 8,
  },
});

