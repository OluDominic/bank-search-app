import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Menu, Button, useTheme, Searchbar, Text } from 'react-native-paper';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { BottomTabParamList } from '../types';
import { NIGERIAN_STATES } from '../constants/theme';

import BranchCard from '../components/BranchCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';

type BranchFinderScreenProps = BottomTabScreenProps<BottomTabParamList, 'BranchFinder'>;

export default function BranchFinderScreen({ }: BranchFinderScreenProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { branches, loading } = useAppSelector((state) => state.banks);
  const favorites = useAppSelector((state) => state.favorites.items);

  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const filteredBranches = useMemo(() => {
    let filtered = branches;

    if (selectedState) {
      filtered = filtered.filter((branch) => branch.state === selectedState);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (branch) =>
          branch.branchName.toLowerCase().includes(query) ||
          branch.address.toLowerCase().includes(query) ||
          branch.bankName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [branches, selectedState, searchQuery]);

  const isBranchFavorite = (branchId: string) => {
    return favorites.some(fav => fav.type === 'branch' && fav.id === branchId);
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

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const selectState = (state: string) => {
    setSelectedState(state);
    closeMenu();
  };

  const clearState = () => {
    setSelectedState('');
    closeMenu();
  };

  if (loading && branches.length === 0) {
    return <LoadingIndicator message="Loading branches..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.filterContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode="outlined"
              onPress={openMenu}
              icon="map-marker"
              style={styles.stateButton}
              contentStyle={styles.buttonContent}
            >
              {selectedState || 'Select State'}
            </Button>
          }
          contentStyle={styles.menuContent}
        >
          <Menu.Item
            onPress={clearState}
            title="All States"
            leadingIcon="close-circle"
          />
          {NIGERIAN_STATES.map((state) => (
            <Menu.Item
              key={state}
              onPress={() => selectState(state)}
              title={state}
            />
          ))}
        </Menu>

        {selectedState && (
          <Button
            mode="text"
            onPress={clearState}
            icon="close"
            compact
          >
            Clear
          </Button>
        )}
      </View>

      <Searchbar
        placeholder="Search branches..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        elevation={2}
      />

      <View style={styles.resultCount}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          {filteredBranches.length} branch{filteredBranches.length !== 1 ? 'es' : ''} found
        </Text>
      </View>

      {filteredBranches.length === 0 ? (
        <EmptyState
          icon="business-outline"
          message="No branches found"
          subtitle={
            selectedState
              ? `Try selecting a different state or clearing filters`
              : "Try selecting a state to view branches"
          }
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
              showBankName={true}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Lazy loading optimizations
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
          getItemLayout={(data, index) => ({
            length: 140,
            offset: 140 * index,
            index,
          })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  stateButton: {
    flex: 1,
    marginRight: 8,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
  menuContent: {
    maxHeight: 400,
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 2,
  },
  resultCount: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
});
