import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, Shadow } from '@/constants/design';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function PrimaryButton({ label, onPress, disabled, loading }: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          transform: [{ scale: pressed && !isDisabled ? 0.97 : 1 }],
        },
        (pressed || loading) && styles.pressed,
        isDisabled && styles.disabled,
      ]}>
      <LinearGradient
        colors={['#FFC8DD', '#FFAFCC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <ThemedText type="defaultSemiBold" style={styles.label}>
            {label}
          </ThemedText>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Spacing.md,
    borderRadius: Radius.pill,
    ...Shadow.card,
  },
  gradient: {
    borderRadius: Radius.pill,
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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


