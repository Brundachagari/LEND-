import React from 'react';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/design';

type CategoryChipsProps = {
  categories: string[];
  selected: string | null | undefined;
  onChange: (category: string | null) => void;
};

export function CategoryChips({ categories, selected, onChange }: CategoryChipsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {categories.map((category) => {
          const isActive = selected === category || (!selected && category === 'All');
          return (
            <Pressable
              key={category}
              onPress={() => onChange(isActive ? null : category)}
              style={({ pressed }) => [
                styles.chipOuter,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}>
              {isActive ? (
                <LinearGradient
                  colors={['#FFC8DD', '#FFAFCC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.chip}>
                  <ThemedText style={[styles.label, styles.labelActive]} type="defaultSemiBold">
                    {category}
                  </ThemedText>
                </LinearGradient>
              ) : (
                <View style={[styles.chip, styles.chipInactive]}>
                  <ThemedText style={styles.label} type="defaultSemiBold">
                    {category}
                  </ThemedText>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.sm,
  },
  container: {
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  chipOuter: {
    borderRadius: Radius.pill,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  chipInactive: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
  },
  labelActive: {
    color: '#ffffff',
  },
});

