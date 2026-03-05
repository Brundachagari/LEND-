import React from 'react';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';

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
                styles.chip,
                isActive && styles.chipActive,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}>
              <ThemedText
                style={[styles.label, isActive && styles.labelActive]}
                type="defaultSemiBold">
                {category}
              </ThemedText>
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
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  chipActive: {
    backgroundColor: '#11181C',
    borderColor: '#11181C',
  },
  label: {
    fontSize: 14,
  },
  labelActive: {
    color: '#ffffff',
  },
});

