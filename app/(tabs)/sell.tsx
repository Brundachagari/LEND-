import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { PrimaryButton } from '@/components/PrimaryButton';
import { CategoryChips } from '@/components/CategoryChips';
import { useListings } from '@/context/ListingsContext';
import { GradientHeader } from '@/components/GradientHeader';
import { InputField } from '@/components/InputField';
import { GradientBackground } from '@/components/GradientBackground';
import { Spacing } from '@/constants/design';
import { PhotoPickerCard } from '@/components/PhotoPickerCard';

export default function SellScreen() {
  const { addListing, categories, selectedCategory, setSelectedCategory } = useListings();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow photo access to upload pictures.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.9,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0]?.uri);
    }
  };

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
      imageUrl: undefined,
      photos: photoUri ? [photoUri] : [],
      category: selectedCategory ?? 'All',
      sellerId: 'seller_1',
    });

    setTitle('');
    setPrice('');
    setSize('');
    setCondition('');
    setDescription('');
    setPhotoUri(undefined);

    Alert.alert('Listing created', 'Your item has been added locally to the feed.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <GradientBackground>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <GradientHeader
            title="List an item for rent"
            subtitle="Create a quick listing that other students can discover."
          />

          <CategoryChips
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />

          <PhotoPickerCard uri={photoUri} onPress={pickPhoto} />

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

          <PrimaryButton label="Post listing" onPress={handleSubmit} />
        </ScrollView>
      </GradientBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

