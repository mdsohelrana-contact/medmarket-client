import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IAuthState = {
  token: string | null;
};

const initialState: IAuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth", // ✅ Correct naming
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string | null }>) => {
      state.token = action.payload.token;
    },
    logOutUser: (state) => {
      state.token = null; // ✅ Clear token on logout
    },
  },
});

export const { setUser, logOutUser } = authSlice.actions;

export const currentToken = (state: RootState) => state.user.token;

export default authSlice.reducer;
