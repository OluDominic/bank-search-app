import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/store';
import { useAppSelector } from './src/store/hooks';
import { lightTheme, darkTheme } from './src/constants/theme';
import AppNavigator from './src/navigation/AppNavigator';

function ThemedApp() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <AppNavigator />
        <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}
