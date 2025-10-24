# 📁 Project Structure

## Complete File Tree

```
NaijaBankFinder/
│
├── 📱 App.tsx                          # Root component with Redux & Theme providers
├── 📄 package.json                     # Dependencies and scripts
├── ⚙️ tsconfig.json                    # TypeScript configuration
├── ⚙️ babel.config.js                  # Babel configuration
├── ⚙️ metro.config.js                  # Metro bundler configuration
├── ⚙️ app.json                         # Expo configuration
├── 🎨 .prettierrc.js                   # Code formatting rules
├── 🔍 .eslintrc.js                     # Linting rules
├── 📝 .gitignore                       # Git ignore patterns
├── 📚 README.md                        # Main documentation
├── 🚀 SETUP.md                         # Quick setup guide
├── ⭐ FEATURES.md                      # Feature documentation
├── 📋 PROJECT_STRUCTURE.md             # This file
├── 📦 index.ts                         # Expo entry point
│
├── 📁 src/
│   │
│   ├── 📁 components/                  # Reusable UI components
│   │   ├── BankCard.tsx               # Bank list item component
│   │   ├── BranchCard.tsx             # Branch list item component
│   │   ├── LoadingIndicator.tsx       # Loading spinner with message
│   │   ├── ErrorMessage.tsx           # Error display with retry
│   │   └── EmptyState.tsx             # Empty state placeholder
│   │
│   ├── 📁 screens/                     # Screen components
│   │   ├── SplashScreen.tsx           # Initial loading screen
│   │   ├── HomeScreen.tsx             # Bank search screen
│   │   ├── BankDetailsScreen.tsx      # Bank details and branches
│   │   ├── BranchFinderScreen.tsx     # State-based branch finder
│   │   ├── FavoritesScreen.tsx        # Saved favorites
│   │   └── SettingsScreen.tsx         # App settings
│   │
│   ├── 📁 navigation/                  # Navigation configuration
│   │   └── AppNavigator.tsx           # Stack + Tab navigation setup
│   │
│   ├── 📁 store/                       # Redux store
│   │   ├── index.ts                   # Store configuration
│   │   ├── hooks.ts                   # Typed Redux hooks
│   │   ├── banksSlice.ts              # Banks state management
│   │   ├── favoritesSlice.ts          # Favorites state management
│   │   └── themeSlice.ts              # Theme state management
│   │
│   ├── 📁 types/                       # TypeScript definitions
│   │   └── index.ts                   # All type definitions
│   │
│   ├── 📁 utils/                       # Utility functions
│   │   └── storage.ts                 # AsyncStorage utilities
│   │
│   └── 📁 constants/                   # App constants
│       └── theme.ts                   # Theme definitions & states list
│
└── 📁 assets/                          # Static assets (images, fonts)
    ├── icon.png                       # App icon
    ├── splash-icon.png                # Splash screen icon
    ├── adaptive-icon.png              # Android adaptive icon
    └── favicon.png                    # Web favicon

```

## File Descriptions

### Root Files

#### `App.tsx`
- **Purpose**: Entry point of the application
- **Contents**: 
  - Redux Provider wrapper
  - Theme Provider setup
  - SafeAreaProvider for safe areas
  - App Navigator integration
- **Key Features**: Theme-aware, connects store to UI

#### `package.json`
- **Purpose**: Project configuration and dependencies
- **Key Dependencies**:
  - Expo SDK (~54.0.20)
  - React Navigation (v7)
  - Redux Toolkit (v2.2)
  - React Native Paper (v5.12)
  - naija-banks-branches-sortcode
  - AsyncStorage, NetInfo

#### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Settings**: Strict mode, JSX support, module resolution

#### `app.json`
- **Purpose**: Expo application configuration
- **Settings**: 
  - App name, slug, version
  - Platform-specific configs (iOS, Android)
  - Splash screen settings
  - Bundle identifiers

---

## Source Code Organization

### 📁 `src/components/`

Reusable, presentational components used across multiple screens.

**BankCard.tsx**
- Props: `bank`, `onPress`, `onFavoritePress`, `isFavorite`
- Features: Logo placeholder, bank name, code, favorite button
- Used in: HomeScreen, FavoritesScreen

**BranchCard.tsx**
- Props: `branch`, `onFavoritePress`, `isFavorite`, `showBankName`
- Features: Branch details, address, state chips, favorite toggle
- Used in: BankDetailsScreen, BranchFinderScreen, FavoritesScreen

**LoadingIndicator.tsx**
- Props: `message` (optional)
- Features: Spinner with customizable message
- Used in: All screens during data loading

**ErrorMessage.tsx**
- Props: `message`, `onRetry` (optional)
- Features: Error icon, message, retry button
- Used in: Error state handling across screens

**EmptyState.tsx**
- Props: `icon`, `message`, `subtitle` (optional)
- Features: Icon, message for empty lists
- Used in: When no results found

---

### 📁 `src/screens/`

Full-screen components representing app pages.

**SplashScreen.tsx**
- **Route**: Initial screen
- **Purpose**: Load app data, initialize store
- **Actions**: Loads banks, branches, favorites, theme
- **Navigation**: Auto-navigates to MainTabs after loading

**HomeScreen.tsx**
- **Route**: `/Home` (Bottom Tab)
- **Purpose**: Search and browse all banks
- **Features**: 
  - Searchbar for filtering
  - Real-time search
  - Favorite toggle
  - Navigate to bank details
  - Offline indicator

**BankDetailsScreen.tsx**
- **Route**: `/BankDetails/:bank` (Stack)
- **Purpose**: Show bank info and all branches
- **Features**:
  - Bank information card
  - List of all branches
  - Favorite bank (header button)
  - Favorite individual branches

**BranchFinderScreen.tsx**
- **Route**: `/BranchFinder` (Bottom Tab)
- **Purpose**: Find branches by state
- **Features**:
  - State dropdown (all 37 options)
  - Search within results
  - Result count
  - Clear filters

**FavoritesScreen.tsx**
- **Route**: `/Favorites` (Bottom Tab)
- **Purpose**: View saved favorites
- **Features**:
  - Segmented tabs (All/Banks/Branches)
  - Mixed list rendering
  - Remove from favorites
  - Navigate to bank details

**SettingsScreen.tsx**
- **Route**: `/Settings` (Bottom Tab)
- **Purpose**: App configuration
- **Features**:
  - Dark mode toggle
  - Statistics display
  - About section
  - External links

---

### 📁 `src/navigation/`

**AppNavigator.tsx**
- **Structure**: 
  ```
  Stack Navigator (Root)
  ├── Splash
  ├── MainTabs (Tab Navigator)
  │   ├── Home
  │   ├── BranchFinder
  │   ├── Favorites
  │   └── Settings
  └── BankDetails (Modal)
  ```
- **Features**: 
  - Theme-aware navigation
  - Custom tab bar icons
  - Stack header customization

---

### 📁 `src/store/`

Redux Toolkit state management.

**index.ts**
- Configures Redux store
- Combines all slices
- Exports typed hooks
- Middleware configuration

**hooks.ts**
- `useAppDispatch`: Typed dispatch hook
- `useAppSelector`: Typed selector hook

**banksSlice.ts**
- **State**: banks[], branches[], loading, error, searchQuery, selectedState
- **Actions**: loadBanks, loadAllBranches, setSearchQuery, setSelectedState
- **Thunks**: Async data loading from naija-banks package

**favoritesSlice.ts**
- **State**: items[], loading
- **Actions**: loadFavorites, addFavorite, removeFavorite
- **Thunks**: AsyncStorage operations

**themeSlice.ts**
- **State**: mode ('light' | 'dark')
- **Actions**: loadTheme, toggleTheme
- **Thunks**: AsyncStorage theme persistence

---

### 📁 `src/types/`

**index.ts**
- TypeScript interfaces and types:
  - `Bank`: Bank information structure
  - `Branch`: Branch information structure
  - `BankWithBranches`: Bank with branches array
  - `FavoriteItem`: Favorite data structure
  - `ThemeType`: Theme configuration
  - `RootStackParamList`: Stack navigation types
  - `BottomTabParamList`: Tab navigation types

---

### 📁 `src/utils/`

**storage.ts**
- AsyncStorage wrapper utilities:
  - `getFavorites()`: Load favorites
  - `saveFavorites()`: Save favorites
  - `addFavorite()`: Add single favorite
  - `removeFavorite()`: Remove single favorite
  - `getTheme()`: Load theme preference
  - `saveTheme()`: Save theme preference
- Error handling for all operations

---

### 📁 `src/constants/`

**theme.ts**
- `lightTheme`: Material Design 3 light theme
- `darkTheme`: Material Design 3 dark theme
- `NIGERIAN_STATES`: Array of all 36 states + FCT (sorted)
- Color palettes for both themes
- Primary color: Nigerian green

---

## Data Flow

### App Initialization
```
SplashScreen
  → dispatch(loadTheme())
  → dispatch(loadBanks())
  → dispatch(loadAllBranches())
  → dispatch(loadFavorites())
  → navigate to MainTabs
```

### Search Flow
```
User types in Searchbar
  → setSearchQuery(query)
  → useMemo filters banks/branches
  → FlatList re-renders with filtered data
```

### Favorite Flow
```
User taps heart icon
  → Check if already favorited
  → dispatch(addFavorite()) or dispatch(removeFavorite())
  → AsyncStorage updated
  → Redux state updated
  → UI updates automatically
```

### Theme Toggle Flow
```
User toggles switch in Settings
  → dispatch(toggleTheme())
  → Theme saved to AsyncStorage
  → Redux state updates
  → useTheme() hook provides new theme
  → Entire app re-renders with new colors
```

---

## Component Hierarchy

```
App (Provider)
└── ThemedApp (Theme Provider)
    └── SafeAreaProvider
        └── NavigationContainer
            └── Stack Navigator
                ├── SplashScreen
                ├── Bottom Tab Navigator
                │   ├── HomeScreen
                │   │   └── BankCard (multiple)
                │   ├── BranchFinderScreen
                │   │   └── BranchCard (multiple)
                │   ├── FavoritesScreen
                │   │   ├── BankCard (multiple)
                │   │   └── BranchCard (multiple)
                │   └── SettingsScreen
                └── BankDetailsScreen
                    └── BranchCard (multiple)
```

---

## State Management Architecture

```
Redux Store
├── banks (slice)
│   ├── State: banks[], branches[], loading, error
│   └── Used by: HomeScreen, BankDetailsScreen, BranchFinderScreen, SettingsScreen
│
├── favorites (slice)
│   ├── State: items[], loading
│   └── Used by: All screens (for favorite toggle), FavoritesScreen
│
└── theme (slice)
    ├── State: mode
    └── Used by: ThemedApp, SettingsScreen
```

---

## Key Architectural Decisions

### 1. **Redux Toolkit over Context API**
- Better dev tools
- Built-in async handling
- Easier testing
- Scalable architecture

### 2. **React Native Paper over Native Base**
- Material Design 3
- Better TypeScript support
- Lighter bundle size
- Better theming system

### 3. **FlatList over ScrollView**
- Performance with large lists
- Virtualization
- Memory efficiency

### 4. **AsyncStorage over SQLite**
- Simpler API
- Sufficient for app needs
- No native modules needed
- Cross-platform compatibility

### 5. **Stack + Tab Navigation**
- Industry standard pattern
- Intuitive user experience
- Easy deep linking support

---

## Performance Considerations

### Optimizations Applied
- `useMemo` for expensive filters
- `useCallback` for stable functions
- `React.memo` on card components
- FlatList with `keyExtractor`
- `removeClippedSubviews` on lists
- Redux selector memoization
- Async data loading on splash
- Lazy component loading

### Bundle Size
- Tree-shaking enabled
- Production build optimization
- ProGuard for Android release
- Minimal dependencies
- No unused imports

---

This structure provides a clean, maintainable, and scalable architecture for the Naija Bank Finder app! 🏗️
