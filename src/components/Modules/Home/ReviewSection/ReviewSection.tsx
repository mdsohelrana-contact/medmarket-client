"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { getReviews } from "@/utils/actions/review";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewSection = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        if (data) {
          setReviews(data.data);
          setLoading(false);
        }
      } catch (error:any) {
        toast.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

 // Render loading skeleton
 if (loading) {
  return (
    <section className="mx-5">
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    </section>
  );
}
  return (
    <section className="mx-5">
      {reviews.length > 0 ? (
        <ReviewCard reviews={reviews} />
      ) : (
        <p className="text-center text-gray-500 text-lg font-description">
          No reviews available at the moment.
        </p>
      )}
    </section>
  );
};

export default ReviewSection;
