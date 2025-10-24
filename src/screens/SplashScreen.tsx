import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch } from '../store/hooks';
import { loadBanks, loadAllBranches } from '../store/banksSlice';
import { loadFavorites } from '../store/favoritesSlice';
import { loadTheme } from '../store/themeSlice';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

export default function SplashScreen({ navigation }: SplashScreenProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initialize() {
      try {
        // Load theme first
        await dispatch(loadTheme()).unwrap();
        
        // Load data in parallel
        await Promise.all([
          dispatch(loadBanks()).unwrap(),
          dispatch(loadAllBranches()).unwrap(),
          dispatch(loadFavorites()).unwrap(),
        ]);

        // Navigate to main app after a brief delay
        setTimeout(() => {
          navigation.replace('MainTabs');
        }, 1000);
      } catch (error) {
        console.error('Initialization error:', error);
        // Navigate anyway, error handling is done in individual screens
        setTimeout(() => {
          navigation.replace('MainTabs');
        }, 1000);
      }
    }

    initialize();
  }, [dispatch, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={[styles.title, { color: 'white' }]}>
        🇳🇬
      </Text>
      <Text variant="headlineMedium" style={[styles.appName, { color: 'white' }]}>
        Naija Bank Finder
      </Text>
      <Text variant="bodyLarge" style={[styles.subtitle, { color: 'white' }]}>
        Your Nigerian Banking Directory
      </Text>
      <ActivityIndicator 
        size="large" 
        color="white" 
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 72,
    marginBottom: 16,
  },
  appName: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 48,
    opacity: 0.9,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
});
