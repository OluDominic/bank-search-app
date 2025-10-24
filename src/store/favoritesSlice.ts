import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteItem } from '../types';
import { storageUtils } from '../utils/storage';

interface FavoritesState {
  items: FavoriteItem[];
  loading: boolean;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
};

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async () => {
    const favorites = await storageUtils.getFavorites();
    return favorites;
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (item: FavoriteItem) => {
    await storageUtils.addFavorite(item);
    return item;
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ id, type }: { id: string; type: 'bank' | 'branch' }) => {
    await storageUtils.removeFavorite(id, type);
    return { id, type };
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const exists = state.items.some(
          item => item.id === action.payload.id && item.type === action.payload.type
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => !(item.id === action.payload.id && item.type === action.payload.type)
        );
      });
  },
});

export default favoritesSlice.reducer;
