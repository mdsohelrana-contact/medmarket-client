"use server";

import { revalidateTag } from "next/cache";

// get all reviews

export const getReviews = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/all-reviews`,
      {
        method: "GET",
        next: {
          tags: ["REVIEWS"],
        },
      }
    );
    const reviews = await res.json();
    return reviews;
  } catch (error) {
    console.log("Error:", error);
  }
};

// create a review
export const createReview = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("REVIEWS");

    const review = await res.json();
    return review;
  } catch (error) {
    console.log("Error:", error);
  }
};
