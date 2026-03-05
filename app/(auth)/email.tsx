import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function EmailAuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (!email.endsWith('.edu')) {
      Alert.alert('Use your .edu email', 'Lend is limited to verified college email addresses.');
      return;
    }
    router.push('/profile-setup');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <LinearGradient
        colors={['#E7D8FF', '#FAD0EC', '#FFE2D1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}>
        <View style={styles.card}>
          <ThemedText type="title">Verify your school</ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign up or log in with your .edu email to join your campus.
          </ThemedText>

          <View style={styles.field}>
            <ThemedText>School email</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@school.edu"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <PrimaryButton label="Send verification" onPress={handleContinue} />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    gap: 16,
  },
  subtitle: {
    opacity: 0.8,
  },
  field: {
    gap: 6,
    marginTop: 4,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
});

