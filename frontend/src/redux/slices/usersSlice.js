import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    deleteUsers(state, action) {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },
  },
});

const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;

export { usersActions, usersReducer };
