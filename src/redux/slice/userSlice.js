import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUser: (state, { payload }) => {
      state.userInfo.splice(payload, 1);
      localStorage.setItem("users", JSON.stringify(state.userInfo));
    },
    setUsers: (state, { payload }) => {
      state.userInfo = payload;
    },
    updateUser: (state, { payload }) => {
      const { name, email, phone, website, id } = payload;
      state.userInfo.map((user) => {
        if (user.id === id) {
          user.name = name;
          user.email = email;
          user.phone = phone;
          user.website = website;
        }
      });
      localStorage.setItem("users", JSON.stringify(state.userInfo));
    },
  },
});
export default userSlice.reducer;
export const { deleteUser, setUsers, updateUser, setHour } = userSlice.actions;
