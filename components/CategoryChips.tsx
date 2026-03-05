import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

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
            <TouchableOpacity
              key={category}
              onPress={() => onChange(isActive ? null : category)}
              style={[styles.chip, isActive && styles.chipActive]}>
              <ThemedText
                style={[styles.label, isActive && styles.labelActive]}
                type="defaultSemiBold">
                {category}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
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

