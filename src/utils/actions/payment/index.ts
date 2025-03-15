"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// order now
export const createCheckout = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("CART");
    const cartData = await res.json();

    return cartData;
  } catch (error: any) {
    return Error(error.message);
  }
};

// check payment status now
export const checkPaymentStatus = async (sessionId: any) => {
  try {
    console.log(sessionId, "from index page ");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment-status`,
      {
        method: "POST",
        headers: {
          authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionId),
      }
    );

    const orderStatus = await res.json();

    return orderStatus;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get order data only payment status is paid
export const getOrderData = async (orderId: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order-data/${orderId}`,
      {
        method: "GET",
        headers: {
          authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    const orderData = await res.json();

    return orderData;
  } catch (error: any) {
    return Error(error.message);
  }
};

// create order

// export const createOrder = async (orderData: any) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/create-order`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: (await cookies()).get("accessToken")!.value,
//         },
//         body: JSON.stringify(orderData),
//       }
//     );

//     const order = await res.json();

//     return order;
//   } catch (error: any) {
//     return Error(error.message);
//   }
// };
