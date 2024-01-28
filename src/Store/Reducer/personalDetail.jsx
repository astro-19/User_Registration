import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: 0,
  sex: "",
  mobile: "",
  govtIdType: "",
  govtId: "",
  address: "",
  state: "",
  city: "",
  country: "",
  pincode: "",
};

const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    setPersonalDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearPersonalDetails: (state) => initialState,
  },
});

export const { setPersonalDetails, clearPersonalDetails } =
  personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;
