import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, IconButton, Chip, useTheme } from 'react-native-paper';
import { Branch } from '../types';

interface BranchCardProps {
  branch: Branch;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  showBankName?: boolean;
}

function BranchCard({ 
  branch, 
  onFavoritePress, 
  isFavorite,
  showBankName = false 
}: BranchCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text variant="titleMedium" style={styles.branchName}>
              {branch.branchName}
            </Text>
            {showBankName && branch.bankName && (
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {branch.bankName}
              </Text>
            )}
          </View>
          {onFavoritePress && (
            <IconButton
              icon={isFavorite ? 'heart' : 'heart-outline'}
              iconColor={isFavorite ? theme.colors.error : theme.colors.onSurfaceVariant}
              size={20}
              onPress={onFavoritePress}
            />
          )}
        </View>
        
        <View style={styles.infoRow}>
          <Text variant="bodySmall" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
            Address:
          </Text>
          <Text variant="bodySmall" style={styles.value}>
            {branch.address}
          </Text>
        </View>

        <View style={styles.chipsRow}>
          <Chip 
            icon="map-marker" 
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {branch.state}
          </Chip>
          {branch.branchCode && (
            <Chip 
              icon="code-tags" 
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {branch.branchCode}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

export default React.memo(BranchCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  branchName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  infoRow: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 2,
  },
  value: {
    lineHeight: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  chip: {
    marginRight: 8,
    marginTop: 4,
  },
  chipText: {
    fontSize: 12,
  },
});
