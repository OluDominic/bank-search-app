import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storageUtils } from '../utils/storage';

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'light',
};

export const loadTheme = createAsyncThunk(
  'theme/loadTheme',
  async () => {
    const theme = await storageUtils.getTheme();
    return theme;
  }
);

export const toggleTheme = createAsyncThunk(
  'theme/toggleTheme',
  async (_, { getState }) => {
    const state = getState() as { theme: ThemeState };
    const newMode = state.theme.mode === 'light' ? 'dark' : 'light';
    await storageUtils.saveTheme(newMode);
    return newMode;
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTheme.fulfilled, (state, action) => {
        state.mode = action.payload;
      })
      .addCase(toggleTheme.fulfilled, (state, action) => {
        state.mode = action.payload;
      });
  },
});

export default themeSlice.reducer;
