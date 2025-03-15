"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// add to cart
export const addToCart = async (data: any) => {
  try {
    console.log(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart`, {
      method: "POST",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    revalidateTag("CART");
    const cartData = await res.json();

    return cartData;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get cart items
export const getCartItems = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts`, {
      method: "GET",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["CARTS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update quantity cart item
export const updateQuantityCartItem = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart`, {
      method: "PUT",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("CARTS");
    const updatedCart = await res.json();
    return updatedCart;
  } catch (error: any) {
    return Error(error.message);
  }
};

// clear cart
export const clearCart = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart`, {
      method: "DELETE",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("CARTS");
    const clearCartData = res.json();

    return clearCartData;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Delete a cart item
export const deleteCartItem = async (medicineId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/carts/${medicineId}`,
      {
        method: "DELETE",
        headers: {
          authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("CARTS");

    const removeData = await res.json();
    return removeData;
  } catch (error: any) {
    return Error(error.message);
  }
};
