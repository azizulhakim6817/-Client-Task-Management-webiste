import { createSlice } from "@reduxjs/toolkit";

export const summerySlice = createSlice({
  name: "summary",
  initialState: {
    value: [],
  },
  reducers: {
    setSummary: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSummary } = summerySlice.actions;

export default summerySlice.reducer;
