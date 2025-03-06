"use server";

import { decodedToken } from "@/utils/decodedToken";

export const getUserData = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No token found");
  }

  const userInfo = decodedToken(token);

  if (!userInfo?.userId) {
    throw new Error("Invalid token");
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/users/${userInfo.userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userData = await res.json();
  return userData;
};
