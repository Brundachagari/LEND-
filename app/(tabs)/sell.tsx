import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { GradientHeader } from '@/components/GradientHeader';
import { InputField } from '@/components/InputField';
import { Spacing } from '@/constants/design';

export default function SellScreen() {
  const { addListing, categories, selectedCategory, setSelectedCategory } = useListings();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !price.trim()) {
      Alert.alert('Missing info', 'Please add at least a title and price.');
      return;
    }

    addListing({
      title: title.trim(),
      price: parseFloat(price),
      size: size.trim() || 'One size',
      condition: condition.trim() || 'Gently used',
      description: description.trim() || 'No description provided.',
      imageUrl: imageUrl.trim() || undefined,
      category: selectedCategory ?? 'All',
    });

    setTitle('');
    setPrice('');
    setSize('');
    setCondition('');
    setDescription('');
    setImageUrl('');

    Alert.alert('Listing created', 'Your item has been added locally to the feed.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <GradientHeader
            title="Sell an item"
            subtitle="Create a quick listing that other students can discover."
          />

          <CategoryChips
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />

          <InputField
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Vintage denim jacket"
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <InputField
                label="Price"
                value={price}
                onChangeText={setPrice}
                placeholder="25"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.half}>
              <InputField label="Size" value={size} onChangeText={setSize} placeholder="M" />
            </View>
          </View>

          <InputField
            label="Condition"
            value={condition}
            onChangeText={setCondition}
            placeholder="Like new"
          />

          <InputField
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Add any notes about fit, wear, or pickup details."
            multiline
          />

          <InputField
            label="Image URL (optional)"
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://..."
            autoCapitalize="none"
          />

          <PrimaryButton label="Post listing" onPress={handleSubmit} />
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  content: {
    paddingBottom: Spacing['2xl'],
    gap: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  half: {
    flex: 1,
  },
});

