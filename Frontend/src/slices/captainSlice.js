import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: {
    firstname: null,
    lastname: null,
  },
  email: null,
  token: null,
  vehicle: {
    vehcileType: null,
    color: null,
    plate: null,
    capacity: null
  }
};

const captainSlice = createSlice({
  name: "captain",
  initialState,
  reducers: {
    assignCaptainData: (state, action) => {
      console.log(action.payload, "lllll");
      const { captain } = action.payload;
      if (captain) {
        console.log(captain);
        state.fullname.firstname = captain.fullname?.firstname ?? null;
        state.fullname.lastname = captain.fullname?.lastname ?? null;
        state.email = captain.email ?? null;
        state.vehicle.vehcileType = captain.vehicle?.vehcileType ?? null;
        state.vehicle.capacity = captain.vehicle?.capacity ?? null;
        state.vehicle.color = captain.vehicle?.color ?? null;
        state.vehicle.plate = captain.vehicle?.plate ?? null;
      } else {
        console.log(`Error in captainSlice`);
      }
    },
    changeLoginStatus: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    removeCaptainData: (state) => {
      state.fullname.firstname = null;
      state.fullname.lastname = null;
      state.email = null;
      state.token = null;
      state.vehicle.vehcileType = null;
      state.vehicle.capacity = null;
      state.vehicle.color = null;
      state.vehicle.plate = null;
    },
  },
});

export const { assignCaptainData, changeLoginStatus, removeCaptainData } = captainSlice.actions
export default captainSlice.reducer;