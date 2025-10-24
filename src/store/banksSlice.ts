import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Bank, Branch } from '../types';

interface BanksState {
  banks: Bank[];
  branches: Branch[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedState: string;
}

const initialState: BanksState = {
  banks: [],
  branches: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedState: '',
};

// Async thunk to load banks
export const loadBanks = createAsyncThunk(
  'banks/loadBanks',
  async (_, { rejectWithValue }) => {
    try {
      // Import the naija-banks package
      const naijaBanks = require('naija-banks-branches-sortcode');
      const allBanksData = naijaBanks.all();
      
      // Transform to our Bank interface
      const banks: Bank[] = allBanksData.map((bankData: any, index: number) => ({
        id: bankData.code || String(index),
        name: bankData.bank,
        code: bankData.code,
        sortCode: bankData.code, // Using bank code as sort code
        logo: undefined, // Package doesn't provide logos
        slug: bankData.abb?.toLowerCase() || bankData.bank.toLowerCase().replace(/\s+/g, '-'),
      }));
      
      return banks;
    } catch (error) {
      console.error('Error loading banks:', error);
      return rejectWithValue('Failed to load banks');
    }
  }
);

// Async thunk to load all branches
export const loadAllBranches = createAsyncThunk(
  'banks/loadAllBranches',
  async (_, { rejectWithValue }) => {
    try {
      const naijaBanks = require('naija-banks-branches-sortcode');
      const allBanksData = naijaBanks.all();
      
      const branches: Branch[] = [];
      
      // Iterate through each bank
      allBanksData.forEach((bankData: any) => {
        const bankName = bankData.bank;
        const bankCode = bankData.code;
        const states = bankData.state || {};
        
        // Iterate through each state for this bank
        Object.keys(states).forEach((stateName) => {
          const stateBranches = states[stateName];
          
          // Add each branch
          if (Array.isArray(stateBranches)) {
            stateBranches.forEach((branch: any, index: number) => {
              branches.push({
                id: branch.branchcode || `${bankCode}-${stateName}-${index}`,
                branchName: branch.branch,
                branchCode: branch.branchcode,
                address: branch.branchaddress,
                state: stateName,
                city: '', // Package doesn't provide city separately
                sortCode: branch.branchcode,
                bankCode: bankCode,
                bankName: bankName,
              });
            });
          }
        });
      });
      
      return branches;
    } catch (error) {
      console.error('Error loading branches:', error);
      return rejectWithValue('Failed to load branches');
    }
  }
);

const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load banks
      .addCase(loadBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBanks.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = action.payload;
      })
      .addCase(loadBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Load branches
      .addCase(loadAllBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAllBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(loadAllBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSelectedState, clearError } = banksSlice.actions;
export default banksSlice.reducer;
