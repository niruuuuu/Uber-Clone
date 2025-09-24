import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice.js";
import captainSlice from "../slices/captainSlice.js"

const store = configureStore({
  reducer: {
    user: userSlice,
    captain: captainSlice
  },
})

export default store