# 🇳🇬 Naija Bank Finder

A comprehensive React Native mobile application for finding Nigerian banks and their branches across all 36 states. Built with Expo, TypeScript, Redux Toolkit, and React Native Paper.

## 📱 Features

### Core Features
- **🔍 Bank Search**: Real-time search for Nigerian banks by name or code
- **🏦 Bank Details**: View detailed information about banks including all their branches
- **📍 Branch Finder**: Search branches by state with comprehensive filtering
- **❤️ Favorites**: Save your favorite banks and branches locally
- **🌓 Dark Mode**: Seamless light/dark theme switching
- **📡 Offline Support**: Network status detection and error handling
- **⚡ Performance**: Optimized FlatList rendering for large datasets

### Technical Highlights
- **Type-Safe**: Full TypeScript implementation
- **State Management**: Redux Toolkit with async thunks
- **Navigation**: React Navigation with Stack + Bottom Tab navigators
- **Persistent Storage**: AsyncStorage for favorites and preferences
- **Modern UI**: React Native Paper components with Material Design 3
- **Data Source**: Uses `naija-banks-branches-sortcode` npm package

## 🏗️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React Native (Expo SDK 52+) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit |
| **Navigation** | React Navigation v7 |
| **UI Library** | React Native Paper v5 |
| **Storage** | AsyncStorage |
| **Network** | NetInfo, Axios |
| **Icons** | Expo Vector Icons |
| **Data Source** | naija-banks-branches-sortcode |

## 📂 Project Structure

```
NaijaBankFinder/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BankCard.tsx
│   │   ├── BranchCard.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── EmptyState.tsx
│   ├── screens/             # Screen components
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BankDetailsScreen.tsx
│   │   ├── BranchFinderScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── store/              # Redux store and slices
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   ├── banksSlice.ts
│   │   ├── favoritesSlice.ts
│   │   └── themeSlice.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── storage.ts
│   └── constants/          # Constants and theme
│       └── theme.ts
├── assets/                 # Images, fonts, etc.
├── App.tsx                # Root component
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Expo CLI (optional, will be installed with project)
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for testing on physical devices)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd NaijaBankFinder
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS (Mac only)
   yarn ios
   
   # Android
   yarn android
   
   # Web
   yarn web
   ```

### Quick Start with Expo Go

1. Install Expo Go on your iOS or Android device
2. Run `yarn start` in the project directory
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## 📱 App Screens

### 1. Home Screen
- Search banks by name or code
- Real-time filtering
- Add banks to favorites
- Navigate to bank details

### 2. Bank Details Screen
- View bank information (name, code, sort code)
- Browse all bank branches
- Add bank or branches to favorites
- Comprehensive branch information

### 3. Branch Finder Screen
- Filter branches by state (all 36 Nigerian states)
- Search branches by name or address
- View branch details with location
- Add branches to favorites

### 4. Favorites Screen
- View all favorites (banks and branches)
- Filter by type (All, Banks, Branches)
- Quick access to saved items
- Remove items from favorites

### 5. Settings Screen
- Toggle dark/light theme
- View app statistics (total banks, branches, favorites)
- About section with links
- App version information

## 🎨 Theming

The app supports both light and dark themes using React Native Paper's theming system:

- **Light Theme**: Green primary (#008751) with light backgrounds
- **Dark Theme**: Green primary (#00A86B) with dark backgrounds
- **Automatic**: Respects system theme preferences
- **Persistent**: Theme choice is saved locally

## 🔌 API & Data Source

This app uses the `naija-banks-branches-sortcode` npm package which provides:
- List of all Nigerian banks
- Bank codes and sort codes
- Comprehensive branch information
- State-based branch filtering

## 📦 Key Dependencies

```json
{
  "@react-navigation/native": "^7.0.0",
  "@react-navigation/bottom-tabs": "^7.0.0",
  "@react-navigation/native-stack": "^7.0.0",
  "@reduxjs/toolkit": "^2.2.0",
  "react-redux": "^9.1.0",
  "react-native-paper": "^5.12.0",
  "naija-banks-branches-sortcode": "^1.0.0",
  "@react-native-async-storage/async-storage": "2.1.0",
  "@react-native-community/netinfo": "12.0.0"
}
```

## 🛠️ Development

### Adding New Features

1. **Create types** in `src/types/index.ts`
2. **Create Redux slice** (if needed) in `src/store/`
3. **Create components** in `src/components/`
4. **Create screens** in `src/screens/`
5. **Update navigation** in `src/navigation/AppNavigator.tsx`

### Code Style

- TypeScript strict mode enabled
- Functional components with hooks
- Redux Toolkit for state management
- Async/await for asynchronous operations
- ESLint and Prettier recommended

## 🧪 Testing

To test on different platforms:

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Physical Device (via Expo Go)
npm start
# Then scan QR code
```

## 📱 Building for Production

### Android APK/AAB
```bash
yarn eas build --platform android
```

### iOS IPA
```bash
yarn eas build --platform ios
```

Note: Requires Expo EAS account. Visit [Expo EAS](https://expo.dev/eas) for setup.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   yarn expo start --clear
   ```

2. **Dependencies not installing**
   ```bash
   rm -rf node_modules yarn.lock
   yarn install
   ```

3. **iOS pods issues**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Type errors**
   - Ensure all dependencies are installed
   - Check TypeScript version compatibility

## 🌐 Related Links

- **Web Version**: [https://naija-bank-finder.vercel.app/](https://naija-bank-finder.vercel.app/)
- **NPM Package**: [naija-banks-branches-sortcode](https://www.npmjs.com/package/naija-banks-branches-sortcode)
- **Expo Docs**: [https://docs.expo.dev/](https://docs.expo.dev/)
- **React Native Paper**: [https://callstack.github.io/react-native-paper/](https://callstack.github.io/react-native-paper/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ for Nigeria

---

**Note**: This app provides banking directory information only. For actual banking services, please visit your bank's official channels.
