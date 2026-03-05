import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [bio, setBio] = useState('');

  const handleContinue = async () => {
    // In a real app, save profile then move into the main app.
    await AsyncStorage.setItem('lend_onboarded', 'true');
    router.replace('/(tabs)');
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
          <ThemedText type="title">Create your profile</ThemedText>
          <ThemedText style={styles.subtitle}>
            Share a little about yourself so other students know who they are renting with.
          </ThemedText>

          <View style={styles.field}>
            <ThemedText>Name</ThemedText>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Alex Kim"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <ThemedText>School</ThemedText>
            <TextInput
              value={school}
              onChangeText={setSchool}
              placeholder="Stanford University"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <ThemedText>Bio (optional)</ThemedText>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Vintage, coquette, lecture-hall chic."
              style={[styles.input, styles.multiline]}
              multiline
            />
          </View>

          <PrimaryButton label="Finish and start exploring" onPress={handleContinue} />
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
  multiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
});

