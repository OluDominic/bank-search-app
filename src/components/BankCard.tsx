import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, IconButton, useTheme } from 'react-native-paper';
import { Bank } from '../types';

interface BankCardProps {
  bank: Bank;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

function BankCard({ bank, onPress, onFavoritePress, isFavorite }: BankCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.leftContent}>
          <View style={[styles.logoContainer, { backgroundColor: theme.colors.primaryContainer }]}>
            <Text style={[styles.logoText, { color: theme.colors.primary }]}>
              {bank.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.bankName}>
              {bank.name}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Code: {bank.code}
            </Text>
          </View>
        </View>
        {onFavoritePress && (
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            iconColor={isFavorite ? theme.colors.error : theme.colors.onSurfaceVariant}
            size={24}
            onPress={onFavoritePress}
          />
        )}
      </Card.Content>
    </Card>
  );
}

export default React.memo(BankCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  bankName: {
    fontWeight: '600',
    marginBottom: 4,
  },
});
