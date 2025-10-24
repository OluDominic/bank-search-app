import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { List, Switch, Card, Text, Divider, useTheme, Button } from 'react-native-paper';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';
import { BottomTabParamList } from '../types';

type SettingsScreenProps = BottomTabScreenProps<BottomTabParamList, 'Settings'>;

export default function SettingsScreen({ }: SettingsScreenProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const { banks, branches } = useAppSelector((state) => state.banks);
  const favorites = useAppSelector((state) => state.favorites.items);

  const isDarkMode = themeMode === 'dark';

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleOpenWebsite = () => {
    Linking.openURL('https://naija-bank-finder.vercel.app/');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* App Info Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="displaySmall" style={styles.appIcon}>
            🇳🇬
          </Text>
          <Text variant="headlineSmall" style={styles.appName}>
            Naija Bank Finder
          </Text>
          <Text variant="bodyMedium" style={[styles.appVersion, { color: theme.colors.onSurfaceVariant }]}>
            Version 1.0.0
          </Text>
          <Text variant="bodySmall" style={[styles.appDescription, { color: theme.colors.onSurfaceVariant }]}>
            Your comprehensive Nigerian banking directory. Find banks and their branches across Nigeria.
          </Text>
        </Card.Content>
      </Card>

      {/* Appearance Section */}
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          description="Toggle dark theme"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
            />
          )}
        />
      </List.Section>

      <Divider />

      {/* Statistics Section */}
      <List.Section>
        <List.Subheader>Statistics</List.Subheader>
        <List.Item
          title="Total Banks"
          description={`${banks.length} banks available`}
          left={(props) => <List.Icon {...props} icon="bank" />}
        />
        <List.Item
          title="Total Branches"
          description={`${branches.length} branches nationwide`}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
        />
        <List.Item
          title="Your Favorites"
          description={`${favorites.length} items saved`}
          left={(props) => <List.Icon {...props} icon="heart" />}
        />
      </List.Section>

      <Divider />

      {/* About Section */}
      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Web Version"
          description="Visit the web version of this app"
          left={(props) => <List.Icon {...props} icon="web" />}
          right={(props) => <List.Icon {...props} icon="open-in-new" />}
          onPress={handleOpenWebsite}
        />
        <List.Item
          title="Data Source"
          description="naija-banks-branches-sortcode"
          left={(props) => <List.Icon {...props} icon="database" />}
        />
        <List.Item
          title="Made with"
          description="React Native, Expo & Redux Toolkit"
          left={(props) => <List.Icon {...props} icon="react" />}
        />
      </List.Section>

      {/* Footer */}
      <View style={styles.footer}>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
          Built with ❤️ for Nigeria
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceDisabled, textAlign: 'center', marginTop: 8 }}>
          © 2024 Naija Bank Finder
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  appIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  appName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  appVersion: {
    textAlign: 'center',
    marginBottom: 12,
  },
  appDescription: {
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 32,
  },
});
