import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Radius, Spacing } from '@/constants/design';

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SecondaryButton({ label, onPress, disabled }: SecondaryButtonProps) {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { borderColor: tint },
        pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] },
        disabled && styles.disabled,
      ]}>
      <ThemedText type="defaultSemiBold" style={[styles.label, { color: tint }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Spacing.sm,
    borderRadius: Radius.pill,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 15,
  },
  disabled: {
    opacity: 0.5,
  },
});

