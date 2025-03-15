"use server";

import { cookies } from "next/headers";

// only admin
export const getAllUsers = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (query?.name) {
      queryParams.append("name", query?.name.toString());
    }
    if (query?.category) {
      queryParams.append("category", query?.category.toString());
    }
    if (query?.symptoms) {
      queryParams.append(
        "symptoms",
        query?.symptoms?.includes(query?.symptoms.toString()).toString()
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/users?page=${query?.page}&${queryParams}&sort=${query?.sort}`;

    // const token = (await cookies()).get("accessToken")?.value || "";

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

// get user by id

export const getUserById = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization:(await cookies()).get("accessToken")!.value,
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
