import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/design';

type RatingStarsProps = {
  rating: number; // 0-5
  size?: number;
  showValue?: boolean;
  valueText?: string;
};

export function RatingStars({ rating, size = 14, showValue = true, valueText }: RatingStarsProps) {
  const rounded = Math.round(rating * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <View style={styles.row}>
      {Array.from({ length: full }).map((_, i) => (
        <MaterialIcons key={`f_${i}`} name="star" size={size} color="#F9A826" />
      ))}
      {half ? <MaterialIcons name="star-half" size={size} color="#F9A826" /> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <MaterialIcons key={`e_${i}`} name="star-border" size={size} color="#F9A826" />
      ))}
      {showValue ? (
        <ThemedText type="secondary" style={styles.value}>
          {valueText ?? rounded.toFixed(1)}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  value: {
    marginLeft: Spacing.xs,
  },
});

