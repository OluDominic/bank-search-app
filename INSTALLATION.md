# 📦 Installation Guide - Using Yarn

## Package Manager

This project uses **Yarn** as the package manager. All installation commands use yarn.

## Prerequisites

Before starting, ensure you have:

- **Node.js** v18 or higher
- **Yarn** package manager (install via `npm install -g yarn` if needed)
- **Expo CLI** (optional, installed automatically)
- iOS Simulator (Mac only) or Android Emulator

## Installation Steps

### 1. Navigate to Project

```bash
cd /home/alexander/CascadeProjects/NaijaBankFinder
```

### 2. Install All Dependencies

```bash
yarn install
```

This will install:
- Expo SDK (~54.0.20)
- React & React Native
- React Navigation v7 (Stack + Bottom Tabs)
- Redux Toolkit & React Redux
- React Native Paper v5
- naija-banks-branches-sortcode (data package)
- AsyncStorage & NetInfo
- All TypeScript types

### 3. Verify Installation

```bash
npx expo doctor
```

This checks for common issues with dependencies.

### 4. Start Development

```bash
yarn start
```

## Running the App

### On Physical Device (Expo Go)

1. Install Expo Go from App Store or Play Store
2. Run `yarn start`
3. Scan QR code with:
   - **iOS**: Camera app → Opens in Expo Go
   - **Android**: Expo Go app → Scan QR

### On Emulator/Simulator

```bash
# Android
yarn android

# iOS (Mac only)
yarn ios

# Web Browser
yarn web
```

## Common Yarn Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install all dependencies |
| `yarn start` | Start Expo dev server |
| `yarn android` | Run on Android |
| `yarn ios` | Run on iOS |
| `yarn web` | Run in browser |
| `yarn expo start --clear` | Clear cache and start |

## Package Manager Configuration

The project is configured to use Yarn:

**package.json:**
```json
{
  "packageManager": "yarn@1.22.0",
  ...
}
```

## Troubleshooting Installation

### Issue: Yarn not found

**Solution:**
```bash
npm install -g yarn
```

### Issue: Dependencies fail to install

**Solution:**
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Issue: Cache issues

**Solution:**
```bash
yarn cache clean
yarn install
```

### Issue: Peer dependency warnings

These are usually safe to ignore with Expo projects. The app will still work.

## Alternative: Using npm (Not Recommended)

While yarn is recommended, you can use npm if needed:

```bash
npm install
npm start
npm run android
npm run ios
```

However, mixing package managers can cause issues. Stick with yarn for consistency.

## Development Dependencies

All TypeScript types and dev tools are included:

- `@types/react`
- `@types/react-native-vector-icons`
- `typescript`
- ESLint & Prettier configs

## Production Build

For production builds using EAS:

```bash
# Install EAS CLI globally
yarn global add eas-cli

# Build
eas build --platform android
eas build --platform ios
```

## Dependency Updates

To update dependencies:

```bash
# Check outdated packages
yarn outdated

# Update specific package
yarn upgrade [package-name]

# Update all to latest
yarn upgrade-interactive --latest
```

## Clean Install

For a fresh installation:

```bash
# Remove everything
rm -rf node_modules yarn.lock

# Reinstall
yarn install

# Clear Expo cache
yarn expo start --clear
```

---

✅ **Ready!** After `yarn install`, run `yarn start` to launch the app.

All commands in the documentation use yarn as the package manager.
