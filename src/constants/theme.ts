import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A1A1A',
    secondary: '#424242',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#000000',
    error: '#B00020',
    onSurface: '#000000',
    onBackground: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#E0E0E0',
    secondary: '#9E9E9E',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    error: '#CF6679',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
  },
};

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
].sort();
