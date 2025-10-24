import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, useTheme, Text } from 'react-native-paper';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadBanks } from '../store/banksSlice';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { RootStackParamList, BottomTabParamList, Bank } from '../types';

import BankCard from '../components/BankCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  
  const { banks, loading, error } = useAppSelector((state) => state.banks);
  const favorites = useAppSelector((state) => state.favorites.items);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  const filteredBanks = useMemo(() => {
    if (!searchQuery.trim()) {
      return banks;
    }

    const query = searchQuery.toLowerCase();
    return banks.filter(
      (bank) =>
        bank.name.toLowerCase().includes(query) ||
        bank.code.toLowerCase().includes(query)
    );
  }, [banks, searchQuery]);

  const isBankFavorite = (bankId: string) => {
    return favorites.some(fav => fav.type === 'bank' && fav.id === bankId);
  };

  const handleFavoriteToggle = (bank: Bank) => {
    if (isBankFavorite(bank.id)) {
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

  const handleRetry = () => {
    dispatch(loadBanks());
  };

  if (loading && banks.length === 0) {
    return <LoadingIndicator message="Loading Nigerian banks..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {!isOnline && (
        <View style={[styles.offlineBanner, { backgroundColor: theme.colors.errorContainer }]}>
          <Text style={{ color: theme.colors.onErrorContainer }}>
            You are offline
          </Text>
        </View>
      )}
      
      <Searchbar
        placeholder="Search banks by name or code..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        elevation={2}
      />

      {filteredBanks.length === 0 ? (
        <EmptyState
          icon="search-outline"
          message={searchQuery ? "No banks found" : "No banks available"}
          subtitle={searchQuery ? "Try a different search term" : undefined}
        />
      ) : (
        <FlatList
          data={filteredBanks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BankCard
              bank={item}
              onPress={() => navigation.navigate('BankDetails', { bank: item })}
              onFavoritePress={() => handleFavoriteToggle(item)}
              isFavorite={isBankFavorite(item.id)}
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
            length: 100,
            offset: 100 * index,
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
  offlineBanner: {
    padding: 12,
    alignItems: 'center',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  listContent: {
    paddingBottom: 16,
  },
});
