import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Radius, Spacing, Shadow } from '@/constants/design';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function PrimaryButton({ label, onPress, disabled, loading }: PrimaryButtonProps) {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: tint, transform: [{ scale: pressed && !isDisabled ? 0.97 : 1 }] },
        (pressed || loading) && styles.pressed,
        isDisabled && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Spacing.md,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.sm + 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  label: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.96,
  },
  disabled: {
    opacity: 0.5,
  },
});


