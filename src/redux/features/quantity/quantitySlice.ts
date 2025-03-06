import { createSlice } from "@reduxjs/toolkit";

export const quantitySlice = createSlice({
  name: "quantity",
  initialState: 1,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setQuantity: (state, action) => action.payload,
  },
});

export const { setQuantity } = quantitySlice.actions;

export default quantitySlice.reducer;
