import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/design';

type PhotoPickerCardProps = {
  uri?: string;
  onPress: () => void;
};

export function PhotoPickerCard({ uri, onPress }: PhotoPickerCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.98 }] }]}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.placeholder}>
          <View style={styles.iconWrap}>
            <MaterialIcons name="add-a-photo" size={22} color="#11181C" />
          </View>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Upload photos
          </ThemedText>
          <ThemedText type="secondary" style={styles.subtitle}>
            Add 1–3 clear pics (front, tag, details).
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: Radius.lg,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Shadow.card,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 18,
  },
});

