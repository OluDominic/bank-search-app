import { configureStore } from '@reduxjs/toolkit';
import banksReducer from './banksSlice';
import favoritesReducer from './favoritesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    banks: banksReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['favorites/addFavorite/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
