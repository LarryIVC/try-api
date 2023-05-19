import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { actions } = usersSlice;

export default usersSlice.reducer;
