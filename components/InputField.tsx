import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/design';

type InputFieldProps = TextInputProps & {
  label: string;
  helperText?: string;
};

export function InputField({ label, helperText, style, ...props }: InputFieldProps) {
  const multiline = props.multiline;

  return (
    <View style={styles.field}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        {...props}
        style={[
          styles.input,
          multiline && styles.multiline,
          style,
        ]}
        placeholderTextColor="rgba(17,24,28,0.4)"
      />
      {helperText ? <ThemedText style={styles.helper}>{helperText}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: 14,
    opacity: 0.9,
  },
  input: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(17,24,28,0.08)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  helper: {
    fontSize: 12,
    opacity: 0.6,
  },
});

