import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SegmentedButtons, useTheme } from 'react-native-paper';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFavorite } from '../store/favoritesSlice';
import { RootStackParamList, BottomTabParamList, Bank, Branch } from '../types';

import BankCard from '../components/BankCard';
import BranchCard from '../components/BranchCard';
import EmptyState from '../components/EmptyState';

type FavoritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Favorites'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface FavoritesScreenProps {
  navigation: FavoritesScreenNavigationProp;
}

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const [activeTab, setActiveTab] = useState<'all' | 'banks' | 'branches'>('all');

  const filteredFavorites = React.useMemo(() => {
    if (activeTab === 'banks') {
      return favorites.filter(fav => fav.type === 'bank');
    } else if (activeTab === 'branches') {
      return favorites.filter(fav => fav.type === 'branch');
    }
    return favorites;
  }, [favorites, activeTab]);

  const handleRemoveFavorite = (id: string, type: 'bank' | 'branch') => {
    dispatch(removeFavorite({ id, type }));
  };

  const handleBankPress = (bank: Bank) => {
    navigation.navigate('BankDetails', { bank });
  };

  const renderItem = ({ item }: any) => {
    if (item.type === 'bank') {
      const bank = item.data as Bank;
      return (
        <BankCard
          bank={bank}
          onPress={() => handleBankPress(bank)}
          onFavoritePress={() => handleRemoveFavorite(item.id, 'bank')}
          isFavorite={true}
        />
      );
    } else {
      const branch = item.data as Branch;
      return (
        <BranchCard
          branch={branch}
          onFavoritePress={() => handleRemoveFavorite(item.id, 'branch')}
          isFavorite={true}
          showBankName={true}
        />
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.tabContainer}>
        <SegmentedButtons
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          buttons={[
            {
              value: 'all',
              label: `All (${favorites.length})`,
              icon: 'heart',
            },
            {
              value: 'banks',
              label: `Banks (${favorites.filter(f => f.type === 'bank').length})`,
              icon: 'bank',
            },
            {
              value: 'branches',
              label: `Branches (${favorites.filter(f => f.type === 'branch').length})`,
              icon: 'map-marker',
            },
          ]}
        />
      </View>

      {filteredFavorites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          message="No favorites yet"
          subtitle="Tap the heart icon on banks or branches to save them here"
        />
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Lazy loading optimizations
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});
