
import { TUser } from "@/redux/features/user/authSlice";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token?: string): TUser | null => {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode<TUser>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
