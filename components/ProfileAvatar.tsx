import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type ProfileAvatarProps = {
  name: string;
  photoUrl?: string;
  size?: number;
};

export function ProfileAvatar({ name, photoUrl, size = 72 }: ProfileAvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (photoUrl) {
    return (
      <Image
        source={{ uri: photoUrl }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
    );
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <ThemedText style={styles.initials}>{initials}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAD0EC',
  },
  initials: {
    fontSize: 24,
    fontWeight: '700',
  },
});

