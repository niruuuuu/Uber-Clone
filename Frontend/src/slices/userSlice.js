import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: {
    firstname: null,
    lastname: null
  },
  email: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUserData: (state, action) => {
      console.log(action.payload, "lllll")
      const { user } = action.payload
      if (user) {
        console.log(user)
        state.fullname.firstname = user.fullname?.firstname ?? null
        state.fullname.lastname = user.fullname?.lastname ?? null
        state.email = user.email ?? null
        state.token = user.token ?? null
      } else {
        console.log(`Error in userSlice`);
      }
    },
    changeLoginStatus: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    removeUserData: (state) => {
      state.fullname.firstname = null
      state.fullname.lastname = null
      state.email = null
      state.token = null
    }
  }
})

export const { assignUserData, changeLoginStatus, removeUserData } = userSlice.actions
export default userSlice.reducer;