import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, Shadow } from '@/constants/design';

type GradientHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
};

export function GradientHeader({ title, subtitle, children, style }: GradientHeaderProps) {
  return (
    <LinearGradient
      colors={['#E7D8FF', '#FAD0EC', '#FFE2D1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <ThemedText type="title">{title}</ThemedText>
          {subtitle ? <ThemedText style={styles.subtitle}>{subtitle}</ThemedText> : null}
        </View>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    ...Shadow.card,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  textBlock: {
    flex: 1,
    gap: 8,
  },
  subtitle: {
    fontSize: 14,
  },
});

