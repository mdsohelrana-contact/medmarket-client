"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// only admin
export const getAllUsers = async (query?:number) => {
  try {

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/users?page=${query}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      next: {
        tags: ["USERS"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
};

// delete user
export const deleteUser = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
    });

    const data = await res.json();

    revalidateTag("USERS"); 

    return data;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
};

// get user by id
export const getUserById = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["USERS"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
};

// update user info
export const updateUser = async (userId: string, data: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });

    const updateUserInfo = await res.json();

    revalidateTag("USERS"); 

    return updateUserInfo;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
};
