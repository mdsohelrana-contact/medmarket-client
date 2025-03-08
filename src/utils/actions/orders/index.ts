
import { cookies } from "next/headers";

// get orders by userId
export const getOrdersByUserId = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        // Authorization: token!,
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
