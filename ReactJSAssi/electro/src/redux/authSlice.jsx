import { createSlice } from '@reduxjs/toolkit';

const USER_KEY = 'user';

let userFromStorage = null;
try {
  const storedUser = localStorage.getItem(USER_KEY);
  userFromStorage = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  console.error('Failed to parse user from localStorage:', err);
  localStorage.removeItem(USER_KEY); // Optional: clean corrupted data
}

const initialState = {
  isAuthenticated: !!userFromStorage,
  user: userFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
