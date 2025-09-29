import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    theme: 'light',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setUsername, setTheme } = userSlice.actions;

export default userSlice.reducer;
