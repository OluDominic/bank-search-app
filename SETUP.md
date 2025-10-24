# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Install Dependencies

```bash
yarn install
```

This will install all required packages including:
- Expo SDK and development tools
- React Navigation libraries
- Redux Toolkit and React Redux
- React Native Paper (UI components)
- naija-banks-branches-sortcode (data source)
- AsyncStorage and NetInfo
- TypeScript types and definitions

### 2. Verify Installation

Check that all peer dependencies are properly installed:

```bash
npx expo doctor
```

### 3. Start Development Server

```bash
yarn start
```

Or use specific commands:
- `yarn android` - Run on Android emulator
- `yarn ios` - Run on iOS simulator (Mac only)
- `yarn web` - Run in web browser

### 4. Test on Device

**Option A: Using Expo Go**
1. Install Expo Go app from App Store (iOS) or Play Store (Android)
2. Run `yarn start` in project directory
3. Scan QR code with:
   - iOS: Camera app → Opens in Expo Go
   - Android: Expo Go app → Scan QR

**Option B: Using Emulator/Simulator**
1. Set up Android Emulator or iOS Simulator
2. Run `yarn android` or `yarn ios`

## 🔧 Configuration

### Network Configuration

If you're testing on a physical device and need to access the development server:

```bash
yarn start --tunnel
```

This creates a tunnel through Expo's servers.

### TypeScript Configuration

The `tsconfig.json` is already configured with:
- Strict mode enabled
- JSX set to react-native
- Module resolution for React Native

### Metro Configuration

If you encounter bundling issues, clear the cache:

```bash
yarn expo start --clear
```

## 📱 First Run

On first launch, the app will:
1. Show a splash screen with loading indicator
2. Load all Nigerian banks data
3. Load all branch data
4. Initialize Redux store
5. Check for saved preferences (theme, favorites)
6. Navigate to main app

This process typically takes 2-3 seconds.

## 🔍 Verify Everything Works

1. **Home Screen**: Search for "Access Bank" or "GTBank"
2. **Bank Details**: Tap any bank to view branches
3. **Branch Finder**: Select "Lagos" state
4. **Favorites**: Add/remove items using heart icon
5. **Settings**: Toggle dark mode

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Run `yarn install` again

### Issue: "Metro bundler not starting"
**Solution**: 
```bash
yarn expo start --clear
rm -rf node_modules yarn.lock
yarn install
yarn start
```

### Issue: "Network request failed"
**Solution**: Check your internet connection, the app loads data on first launch

### Issue: iOS build fails
**Solution**: If using Expo Go, no build needed. For development builds:
```bash
cd ios
pod install
cd ..
```

### Issue: Type errors in IDE
**Solution**: Restart TypeScript server in your IDE or run:
```bash
yarn tsc --noEmit
```

## 📦 Build for Production

### Development Build (EAS)
```bash
# Install EAS CLI
yarn global add eas-cli

# Login to Expo
eas login

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Local Build (Android)
```bash
# Generate APK
yarn expo run:android --variant release
```

## 🎯 Next Steps

1. Explore all screens and features
2. Try dark mode in Settings
3. Add some favorites
4. Test offline mode (turn off internet)
5. Search for banks in your state

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [React Navigation Docs](https://reactnavigation.org/)

## 💡 Tips

- Use `r` in terminal to reload the app
- Use `m` to toggle menu in Expo Go
- Shake device to open developer menu
- Enable Fast Refresh for instant updates

---

**Ready to go!** 🎉 If you encounter any issues, check the main README.md or the troubleshooting section above.
