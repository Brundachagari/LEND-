import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'secondary' | 'price' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        styles.base,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'price' ? styles.price : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Poppins_400Regular',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  secondary: {
    fontSize: 13,
    opacity: 0.6,
  },
  price: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  link: {
    lineHeight: 22,
    fontSize: 16,
    color: '#F471B5',
  },
});

