"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get orders by userId
export const getOrdersByUserId = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: "GET",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["ORDERS"],
      },
    });
    const data = await res.json();


    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get orders only admin
export const getAllOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/all-orders`, {
      method: "GET",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["ORDERS"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update order status only admin
export const updateOrderIntentStatus = async (
  status: any,
  orderId: string
): Promise<any> => {
  try {
     const res = await fetch(
       `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`,
       {
         method: "PUT",
         headers: {
          authorization: (await cookies()).get("accessToken")!.value,
           "Content-Type": "application/json",
         },
         body: JSON.stringify(status),
       }
     );
     revalidateTag("ORDERS");
 
     const data = await res.json();
 
     console.log(data,"data from server")
 
     return data;
   } catch (error: any) {
     return Error(error);
   }
};
