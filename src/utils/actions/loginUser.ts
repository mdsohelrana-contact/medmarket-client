"use server";

import { ILoginInput } from "@/types/authTypes";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// login user
export const loginUser = async (data: ILoginInput) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const userInfo = await res.json();

  if (userInfo.success) {
    (await cookies()).set("accessToken", userInfo?.data?.accessToken);
  }

  // if (userInfo?.data?.accessToken) {
  //   redirect("/");
  // }

  return userInfo;
};
