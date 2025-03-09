"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/medicines?${queryParams}`;

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
// export const updateProduct = async (
//   productData: FormData,
//   productId: string
// ): Promise<any> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
//       {
//         method: "PATCH",
//         body: productData,
//         headers: {
//           Authorization: (await cookies()).get("accessToken")!.value,
//         },
//       }
//     );
//     revalidateTag("PRODUCT");
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
