"use server";

import { IRegisterUser } from "@/types/authTypes";
import { redirect } from "next/navigation";

// register user
export const registerUser = async (data: IRegisterUser) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const userInfo = await res.json();

  if (userInfo.success) {
    redirect("/login");
  }
  return userInfo;
};
