import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;