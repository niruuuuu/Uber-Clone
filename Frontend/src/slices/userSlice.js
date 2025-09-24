import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUserData: (state, action) => {
      if (action.payload) {
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.email = action.payload.email;
      } else {
        console.log(`Error in userSlice`);
      }
    },
    changeLoginStatus: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  }
})

export const { assignUserData, changeLoginStatus } = userSlice.actions
export default userSlice.reducer;