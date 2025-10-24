import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  message: string;
  subtitle?: string;
}

export default function EmptyState({ 
  icon = 'search-outline', 
  message, 
  subtitle 
}: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons 
        name={icon} 
        size={64} 
        color={theme.colors.onSurfaceDisabled}
      />
      <Text variant="titleMedium" style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
        {message}
      </Text>
      {subtitle && (
        <Text variant="bodySmall" style={[styles.subtitle, { color: theme.colors.onSurfaceDisabled }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
});
