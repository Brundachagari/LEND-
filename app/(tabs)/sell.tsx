import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';

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
          <ThemedText type="title" style={styles.title}>
            Sell an item
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Create a quick listing that other students can discover.
          </ThemedText>

          <CategoryChips
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />

          <View style={styles.field}>
            <ThemedText>Title</ThemedText>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Vintage denim jacket"
              style={styles.input}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.field, styles.half]}>
              <ThemedText>Price</ThemedText>
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="25"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={[styles.field, styles.half]}>
              <ThemedText>Size</ThemedText>
              <TextInput
                value={size}
                onChangeText={setSize}
                placeholder="M"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.field}>
            <ThemedText>Condition</ThemedText>
            <TextInput
              value={condition}
              onChangeText={setCondition}
              placeholder="Like new"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <ThemedText>Description</ThemedText>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add any notes about fit, wear, or pickup details."
              style={[styles.input, styles.multiline]}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.field}>
            <ThemedText>Image URL (optional)</ThemedText>
            <TextInput
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="https://..."
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <PrimaryButton label="Post listing" onPress={handleSubmit} />
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.8,
    marginBottom: 12,
  },
  field: {
    gap: 6,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
});

