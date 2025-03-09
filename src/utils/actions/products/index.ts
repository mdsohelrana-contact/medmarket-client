"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProducts = async (
  query?: { [key: string]: string | string[] | undefined },
  sort?: string
  // filter?: string,
  // limit?: number,
  // offset?: number,
  // search?: string,
) => {
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

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/medicines?page=${query?.page}&${queryParams}&sort=${query?.sort}`;

    // console.log(url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["MEDICINES"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
};

// get single product
export const getSingleProduct = async (medicineId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
      {
        next: {
          tags: ["MEDICINES"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const addMedicine = async (medicineData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(medicineData),
    });

    revalidateTag("MEDICINES");

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateProduct = async (
  productData: FormData,
  medicineId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
      {
        method: "PUT",
        body: JSON.stringify(productData),
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    const data = res.json();

    return data;
  } catch (error: any) {
    return Error(error);
  }
};

// remove medicine

export const removeMedicine = async (medicineId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MEDICINES");
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
