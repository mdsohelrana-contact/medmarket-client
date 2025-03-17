"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { getReviews } from "@/utils/actions/review";

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
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Render loading
  if (loading) {
    return <p>Loading reviews...</p>;
  }
  return (
    <section>
      {
        reviews.length > 0 ? (
          
            <ReviewCard  reviews={reviews} />
        
        ) : (
          <p className="text-center text-gray-500 text-lg">No reviews available at the moment.</p>
        ) 
      }
    </section>
  );
};

export default ReviewSection;
