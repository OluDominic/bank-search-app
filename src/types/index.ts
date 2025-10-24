export interface Bank {
  id: string;
  name: string;
  code: string;
  sortCode?: string;
  logo?: string;
  slug?: string;
}

export interface Branch {
  id: string;
  branchName: string;
  branchCode: string;
  address: string;
  state: string;
  city?: string;
  sortCode?: string;
  bankCode: string;
  bankName?: string;
}

export interface BankWithBranches extends Bank {
  branches: Branch[];
}

export interface FavoriteItem {
  type: 'bank' | 'branch';
  id: string;
  data: Bank | Branch;
  timestamp: number;
}

export interface ThemeType {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export type RootStackParamList = {
  MainTabs: undefined;
  BankDetails: { bank: Bank };
  Splash: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  BranchFinder: undefined;
  Favorites: undefined;
  Settings: undefined;
};
