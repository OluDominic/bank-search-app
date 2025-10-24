import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, Alert, Platform, Linking } from 'react-native';
import { Text, Card, Chip, Divider, useTheme, IconButton, Searchbar, Menu, Button, Portal, Dialog } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { RootStackParamList, Branch } from '../types';
import BranchCard from '../components/BranchCard';
import EmptyState from '../components/EmptyState';
import { NIGERIAN_STATES } from '../constants/theme';

type BankDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'BankDetails'>;

export default function BankDetailsScreen({ route, navigation }: BankDetailsScreenProps) {
  const { bank } = route.params;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const branches = useAppSelector((state) => state.banks.branches);
  const favorites = useAppSelector((state) => state.favorites.items);

  // Local state for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [stateMenuVisible, setStateMenuVisible] = useState(false);
  const [exportMenuVisible, setExportMenuVisible] = useState(false);
  const [exportDialogVisible, setExportDialogVisible] = useState(false);
  const [exportedData, setExportedData] = useState('');

  const bankBranches = useMemo(() => {
    return branches.filter((branch) => branch.bankCode === bank.code);
  }, [branches, bank.code]);

  // Get unique states from bank branches
  const availableStates = useMemo(() => {
    const states = new Set(bankBranches.map(b => b.state).filter(Boolean));
    return Array.from(states).sort();
  }, [bankBranches]);

  // Filter branches based on search and state
  const filteredBranches = useMemo(() => {
    return bankBranches.filter((branch) => {
      const matchesSearch = searchQuery === '' ||
        branch.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (branch.city && branch.city.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesState = selectedState === '' || branch.state === selectedState;
      
      return matchesSearch && matchesState;
    });
  }, [bankBranches, searchQuery, selectedState]);

  const isBankFavorite = favorites.some(fav => fav.type === 'bank' && fav.id === bank.id);

  const isBranchFavorite = (branchId: string) => {
    return favorites.some(fav => fav.type === 'branch' && fav.id === branchId);
  };

  const handleBankFavoriteToggle = () => {
    if (isBankFavorite) {
      dispatch(removeFavorite({ id: bank.id, type: 'bank' }));
    } else {
      dispatch(addFavorite({
        type: 'bank',
        id: bank.id,
        data: bank,
        timestamp: Date.now(),
      }));
    }
  };

  const handleBranchFavoriteToggle = (branch: any) => {
    if (isBranchFavorite(branch.id)) {
      dispatch(removeFavorite({ id: branch.id, type: 'branch' }));
    } else {
      dispatch(addFavorite({
        type: 'branch',
        id: branch.id,
        data: branch,
        timestamp: Date.now(),
      }));
    }
  };

  // Export to CSV
  const exportToCSV = async () => {
    try {
      const csvHeader = 'Branch Name,Address,State,Branch Code\n';
      const csvRows = filteredBranches.map(branch => 
        `"${branch.branchName}","${branch.address}","${branch.state}","${branch.branchCode || 'N/A'}"`
      ).join('\n');
      
      const csvContent = csvHeader + csvRows;
      setExportedData(csvContent);
      setExportDialogVisible(true);
      setExportMenuVisible(false);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to generate CSV file');
      console.error('Export CSV error:', error);
    }
  };

  // Export to Text
  const exportToText = async () => {
    try {
      let textContent = `${bank.name} - Branch List\n`;
      textContent += `Generated: ${new Date().toLocaleDateString()}\n`;
      textContent += `Total Branches: ${filteredBranches.length}\n`;
      textContent += '\n' + '='.repeat(60) + '\n\n';
      
      filteredBranches.forEach((branch, index) => {
        textContent += `${index + 1}. ${branch.branchName}\n`;
        textContent += `   Address: ${branch.address}\n`;
        textContent += `   State: ${branch.state}\n`;
        if (branch.branchCode) textContent += `   Code: ${branch.branchCode}\n`;
        textContent += '\n';
      });
      
      setExportedData(textContent);
      setExportDialogVisible(true);
      setExportMenuVisible(false);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to generate text file');
      console.error('Export Text error:', error);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(exportedData);
      setExportDialogVisible(false);
      Alert.alert('Success', 'Data copied to clipboard!', [
        { text: 'OK' }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
      console.error('Copy error:', error);
    }
  };

  // Share via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(`${bank.name} - Branch List`);
    const body = encodeURIComponent(exportedData);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    
    Linking.openURL(emailUrl).catch((err) => {
      Alert.alert('Error', 'Could not open email app');
      console.error('Email error:', err);
    });
    
    setExportDialogVisible(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedState('');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={isBankFavorite ? 'heart' : 'heart-outline'}
          iconColor={isBankFavorite ? theme.colors.error : theme.colors.onSurface}
          onPress={handleBankFavoriteToggle}
        />
      ),
    });
  }, [navigation, isBankFavorite]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bank Info Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.primaryContainer }]}>
              <Text style={[styles.logoText, { color: theme.colors.primary }]}>
                {bank.name.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            
            <Text variant="headlineSmall" style={styles.bankName}>
              {bank.name}
            </Text>

            <View style={styles.chipsContainer}>
              <Chip icon="code-tags" style={styles.chip}>
                Code: {bank.code}
              </Chip>
              {bank.sortCode && (
                <Chip icon="sort" style={styles.chip}>
                  Sort: {bank.sortCode}
                </Chip>
              )}
            </View>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          <Searchbar
            placeholder="Search branches..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            elevation={1}
          />

          <View style={styles.filterRow}>
            <Menu
              visible={stateMenuVisible}
              onDismiss={() => setStateMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setStateMenuVisible(true)}
                  icon="filter"
                  style={styles.filterButton}
                  contentStyle={styles.filterButtonContent}
                >
                  {selectedState || 'All States'}
                </Button>
              }
            >
              <Menu.Item
                key="all-states-option"
                onPress={() => {
                  setSelectedState('');
                  setStateMenuVisible(false);
                }}
                title="All States"
                leadingIcon="close-circle"
              />
              <Divider />
              {availableStates.map((state, index) => (
                <Menu.Item
                  key={`state-${index}-${state}`}
                  onPress={() => {
                    setSelectedState(state);
                    setStateMenuVisible(false);
                  }}
                  title={state}
                  leadingIcon={selectedState === state ? 'check' : undefined}
                />
              ))}
            </Menu>

            <Menu
              visible={exportMenuVisible}
              onDismiss={() => setExportMenuVisible(false)}
              anchor={
                <Button
                  mode="contained"
                  onPress={() => setExportMenuVisible(true)}
                  icon="export"
                  style={styles.exportButton}
                  disabled={filteredBranches.length === 0}
                >
                  Export
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setExportMenuVisible(false);
                  exportToCSV();
                }}
                title="Export as CSV"
                leadingIcon="file-delimited"
              />
              <Menu.Item
                onPress={() => {
                  setExportMenuVisible(false);
                  exportToText();
                }}
                title="Export as Text"
                leadingIcon="file-document"
              />
            </Menu>
          </View>

          {(searchQuery || selectedState) && (
            <View style={styles.filterChips}>
              {searchQuery && (
                <Chip
                  icon="magnify"
                  onClose={() => setSearchQuery('')}
                  style={styles.filterChip}
                >
                  Search: {searchQuery}
                </Chip>
              )}
              {selectedState && (
                <Chip
                  icon="map-marker"
                  onClose={() => setSelectedState('')}
                  style={styles.filterChip}
                >
                  {selectedState}
                </Chip>
              )}
              <Button
                mode="text"
                onPress={handleClearFilters}
                compact
              >
                Clear All
              </Button>
            </View>
          )}
        </View>

        {/* Branches Section */}
        <View style={styles.branchesSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Branches ({filteredBranches.length}{filteredBranches.length !== bankBranches.length ? ` of ${bankBranches.length}` : ''})
          </Text>

          {filteredBranches.length === 0 ? (
            <EmptyState
              icon="business-outline"
              message="No branches found"
              subtitle={searchQuery || selectedState ? "Try adjusting your filters" : "This bank has no branch information available"}
            />
          ) : (
            <FlatList
              data={filteredBranches}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <BranchCard
                  branch={item}
                  onFavoritePress={() => handleBranchFavoriteToggle(item)}
                  isFavorite={isBranchFavorite(item.id)}
                />
              )}
              scrollEnabled={false}
              // Lazy loading optimizations
              initialNumToRender={15}
              maxToRenderPerBatch={15}
              windowSize={5}
              removeClippedSubviews={true}
              updateCellsBatchingPeriod={50}
            />
          )}
        </View>
      </ScrollView>

      {/* Export Dialog */}
      <Portal>
        <Dialog visible={exportDialogVisible} onDismiss={() => setExportDialogVisible(false)}>
          <Dialog.Title>Export Data</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {filteredBranches.length} {filteredBranches.length === 1 ? 'branch' : 'branches'} ready to export.
            </Text>
            <Text variant="bodySmall" style={{ marginTop: 8, color: theme.colors.onSurfaceVariant }}>
              Choose how you'd like to export the data:
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <Button
              mode="contained"
              onPress={copyToClipboard}
              icon="content-copy"
              style={{ marginBottom: 8 }}
            >
              Copy to Clipboard
            </Button>
            <Button
              mode="outlined"
              onPress={shareViaEmail}
              icon="email"
              style={{ marginBottom: 8 }}
            >
              Share via Email
            </Button>
            <Button
              onPress={() => setExportDialogVisible(false)}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    margin: 16,
    elevation: 2,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  bankName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  divider: {
    marginVertical: 8,
  },
  branchesSection: {
    marginVertical: 8,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontWeight: '600',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchbar: {
    marginBottom: 12,
    elevation: 1,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    flex: 1,
  },
  filterButtonContent: {
    height: 40,
  },
  exportButton: {
    flex: 1,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  filterChip: {
    marginRight: 4,
  },
});
