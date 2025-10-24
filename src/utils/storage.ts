import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteItem } from '../types';

const FAVORITES_KEY = '@naija_bank_finder_favorites';
const THEME_KEY = '@naija_bank_finder_theme';

export const storageUtils = {
  // Favorites
  async getFavorites(): Promise<FavoriteItem[]> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  async saveFavorites(favorites: FavoriteItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  async addFavorite(item: FavoriteItem): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const exists = favorites.some(fav => fav.id === item.id && fav.type === item.type);
      
      if (!exists) {
        favorites.push(item);
        await this.saveFavorites(favorites);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  async removeFavorite(id: string, type: 'bank' | 'branch'): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter(fav => !(fav.id === id && fav.type === type));
      await this.saveFavorites(filtered);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // Theme
  async getTheme(): Promise<'light' | 'dark'> {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return (theme as 'light' | 'dark') || 'light';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'light';
    }
  },

  async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
};
